/**
 * Dynamic context search engine for the AFLEX site.
 *
 * Matching is intentionally forgiving and relation-aware:
 *   - Case-insensitive tokenization with stop-word filtering
 *   - Exact, prefix, contains, subsequence (missing letters), and edit-distance
 *   - Domain synonym / related-term expansion (e.g. "jobs" → vacancy)
 *   - Title > keywords > description weighting with multi-token boosts
 */

import { programDetails } from "@/lib/programs-data";
import { newsArticles } from "@/lib/news-data";
import { vacancies } from "@/lib/vacancies-data";
import { CAMPUS_FACILITIES } from "@/lib/campus-data";
import { academyEvents } from "@/lib/events-data";
import { libraryResources } from "@/lib/library-data";

// ─── Public types ────────────────────────────────────────────────────────────

export interface SearchEntry {
  type: string;
  title: string;
  description: string;
  href: string;
  weight: number;
  keywords?: string;
}

export interface SearchResult extends SearchEntry {
  /** 0–1 normalized relevance for UI match strength. */
  relevance: number;
}

// ─── Stop words ──────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "do", "does", "for",
  "from", "had", "has", "have", "her", "his", "if", "in", "is", "it", "its",
  "no", "not", "of", "on", "or", "our", "so", "that", "the", "their", "then",
  "these", "this", "those", "to", "was", "we", "were", "will", "with", "you",
  "your",
]);

/**
 * Related / synonym groups for AFLEX vocabulary.
 * Any token that appears in a group expands the query to the rest of the group.
 */
const RELATED_GROUPS: string[][] = [
  ["job", "jobs", "career", "careers", "vacancy", "vacancies", "hiring", "employment", "recruitment", "opening", "openings", "position", "positions", "hr"],
  ["women", "woman", "female", "gender", "wild", "ladies"],
  ["campus", "sululta", "facility", "facilities", "locator", "map", "visit", "venue", "hall", "accommodation", "lodging"],
  ["program", "programs", "course", "courses", "training", "cohort", "curriculum", "catalogue", "catalog"],
  ["leadership", "leader", "leaders", "statecraft", "executive", "governance", "management"],
  ["research", "policy", "advisory", "study", "studies", "brief", "briefs", "publication", "publications"],
  ["library", "books", "archive", "archives", "repository", "journal", "journals", "resources"],
  ["lms", "online", "elearning", "e-learning", "moodle", "portal", "digital", "learning"],
  ["news", "press", "media", "story", "stories", "article", "articles", "update", "updates"],
  ["event", "events", "summit", "workshop", "workshops", "seminar", "seminars", "conference"],
  ["contact", "email", "phone", "inquiry", "enquiry", "helpdesk", "reach", "support"],
  ["about", "history", "mandate", "mission", "vision", "values", "coming", "board", "governance", "leadership"],
  ["scholarship", "scholarships", "fellowship", "fellowships", "grant", "grants", "funding"],
  ["faq", "faqs", "question", "questions", "help", "howto", "admission", "admissions"],
  ["procurement", "tender", "tenders", "bid", "bids", "supplier", "suppliers"],
  ["psle", "public", "service", "servant", "servants", "civil"],
  ["gallery", "photo", "photos", "image", "images", "album", "albums", "media"],
  ["africa", "african", "pan", "panafrican", "continental", "ethiopia", "ethiopian"],
];

const RELATED_LOOKUP = (() => {
  const map = new Map<string, Set<string>>();
  for (const group of RELATED_GROUPS) {
    const set = new Set(group);
    for (const term of group) {
      const existing = map.get(term);
      if (existing) {
        for (const t of set) existing.add(t);
      } else {
        map.set(term, new Set(set));
      }
    }
  }
  return map;
})();

// ─── Tokenization helpers ────────────────────────────────────────────────────

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "");
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

/** Expand query tokens with related/synonym terms (originals first). */
function expandQueryTokens(tokens: string[]): { primary: string[]; related: string[] } {
  const primary = [...tokens];
  const relatedSet = new Set<string>();

  for (const token of tokens) {
    const related = RELATED_LOOKUP.get(token);
    if (related) {
      for (const term of related) {
        if (term !== token) relatedSet.add(term);
      }
    }

    // Also expand via prefix into synonym groups (e.g. "vacan" → vacancy family).
    if (token.length >= 4) {
      for (const [key, group] of RELATED_LOOKUP) {
        if (key.startsWith(token) || token.startsWith(key)) {
          for (const term of group) {
            if (term !== token) relatedSet.add(term);
          }
        }
      }
    }
  }

  // Avoid double-counting tokens already in the primary query.
  for (const t of primary) relatedSet.delete(t);
  return { primary, related: [...relatedSet] };
}

/**
 * Levenshtein edit distance with early-exit cap.
 * Covers missing letters, extra letters, substitutions, and adjacent swaps.
 */
function editDistance(a: string, b: string, max: number): number {
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return Infinity;

  let prev = new Array(lb + 1);
  let curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return Infinity;
    [prev, curr] = [curr, prev];
  }
  return prev[lb];
}

/**
 * True when every character of `needle` appears in order inside `haystack`
 * (letters may be missing between). Example: "ldshp" ⊆ "leadership".
 */
function isSubsequence(needle: string, haystack: string): boolean {
  if (needle.length > haystack.length) return false;
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (haystack[j] === needle[i]) i += 1;
  }
  return i === needle.length;
}

/** Fraction of consecutive character bigrams shared (cheap fuzzy signal). */
function bigramOverlap(a: string, b: string): number {
  if (a.length < 2 || b.length < 2) return 0;
  const bags = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i++) {
    const g = a.slice(i, i + 2);
    bags.set(g, (bags.get(g) || 0) + 1);
  }
  let hits = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const g = b.slice(i, i + 2);
    const count = bags.get(g) || 0;
    if (count > 0) {
      hits += 1;
      bags.set(g, count - 1);
    }
  }
  return (2 * hits) / (a.length + b.length - 2);
}

// ─── Indexed entry ───────────────────────────────────────────────────────────

interface IndexedEntry extends SearchEntry {
  titleTokens: string[];
  keywordTokens: string[];
  descTokens: string[];
  haystack: string;
}

const WEIGHT_TITLE = 10;
const WEIGHT_KEYWORDS = 6;
const WEIGHT_DESCRIPTION = 3;
const WEIGHT_RELATED = 0.55; // related/synonym matches score lower than direct query matches

/**
 * Score a single query token against a field's tokens.
 * Returns 0–1 fraction of the field weight.
 */
function scoreTokenInField(token: string, fieldTokens: string[]): number {
  let best = 0;

  for (const w of fieldTokens) {
    if (w === token) return 1;

    if (token.length >= 3 && w.startsWith(token)) {
      best = Math.max(best, 0.88);
      continue;
    }
    if (token.length >= 3 && token.startsWith(w) && w.length >= 3) {
      best = Math.max(best, 0.72);
      continue;
    }
    if (token.length >= 4 && w.includes(token)) {
      best = Math.max(best, 0.55);
      continue;
    }
    if (w.length >= 4 && token.includes(w)) {
      best = Math.max(best, 0.45);
      continue;
    }

    // Missing-letter / typed-shorthand match: "ldshp" → leadership
    if (token.length >= 4 && w.length >= token.length && isSubsequence(token, w)) {
      const density = token.length / w.length;
      if (density >= 0.45) best = Math.max(best, 0.42 * density);
    }

    // Typo / missing / extra letter via edit distance
    const maxEdits = token.length >= 7 ? 2 : token.length >= 4 ? 1 : 0;
    if (maxEdits > 0 && Math.abs(w.length - token.length) <= maxEdits) {
      const d = editDistance(token, w, maxEdits);
      if (d === 1) best = Math.max(best, 0.48);
      else if (d === 2) best = Math.max(best, 0.3);
    }

    // Bigram similarity for messier typos ("leadrship", "campuss")
    if (token.length >= 5 && w.length >= 5) {
      const overlap = bigramOverlap(token, w);
      if (overlap >= 0.55) best = Math.max(best, overlap * 0.5);
    }
  }

  return best;
}

/** Score against the full concatenated haystack for multi-word phrases. */
function scorePhraseInHaystack(query: string, haystack: string): number {
  const q = normalizeText(query).trim();
  if (q.length < 3) return 0;
  if (haystack.includes(q)) return 1;
  // Allow spaces/punctuation differences: collapse whitespace
  const compactQ = q.replace(/\s+/g, "");
  const compactH = haystack.replace(/\s+/g, "");
  if (compactQ.length >= 4 && compactH.includes(compactQ)) return 0.85;
  return 0;
}

function scoreEntry(
  entry: IndexedEntry,
  primaryTokens: string[],
  relatedTokens: string[],
  rawQuery: string,
): { score: number; matchedTokens: number } {
  let score = 0;
  let matchedTokens = 0;

  const phrase = scorePhraseInHaystack(rawQuery, entry.haystack);
  if (phrase > 0) {
    score += phrase * WEIGHT_TITLE * 1.2;
  }

  for (const qt of primaryTokens) {
    const t = scoreTokenInField(qt, entry.titleTokens) * WEIGHT_TITLE;
    const k = scoreTokenInField(qt, entry.keywordTokens) * WEIGHT_KEYWORDS;
    const d = scoreTokenInField(qt, entry.descTokens) * WEIGHT_DESCRIPTION;
    const tokenScore = Math.max(t, k, d) > 0 ? t + k + d : 0;
    if (tokenScore > 0) matchedTokens += 1;
    score += tokenScore;
  }

  // Related/synonym expansion — weaker contribution, still helps discovery.
  for (const rt of relatedTokens) {
    const t = scoreTokenInField(rt, entry.titleTokens) * WEIGHT_TITLE;
    const k = scoreTokenInField(rt, entry.keywordTokens) * WEIGHT_KEYWORDS;
    const d = scoreTokenInField(rt, entry.descTokens) * WEIGHT_DESCRIPTION;
    score += (t + k + d) * WEIGHT_RELATED;
  }

  if (primaryTokens.length > 1 && matchedTokens === primaryTokens.length) {
    score *= 1.55;
  } else if (primaryTokens.length > 1 && matchedTokens >= Math.ceil(primaryTokens.length * 0.6)) {
    score *= 1.2;
  }

  score *= entry.weight;
  return { score, matchedTokens };
}

// ─── Dynamic index construction ─────────────────────────────────────────────

function makeEntry(
  type: string,
  title: string,
  description: string,
  keywords: string | string[],
  href: string,
  weight = 1,
): SearchEntry {
  return {
    type,
    title,
    description,
    href,
    weight,
    keywords: typeof keywords === "string" ? keywords : keywords.join(" "),
  };
}

function buildSearchIndex(): IndexedEntry[] {
  const entries: SearchEntry[] = [];

  for (const p of programDetails) {
    entries.push(
      makeEntry(
        "Programs",
        p.title,
        p.copy,
        [
          p.meta,
          p.fullDescription,
          p.audience,
          p.format,
          ...(p.modules ?? []),
          ...(p.outcomes ?? []),
          ...(p.structure ?? []),
          ...(p.eligibility ?? []),
        ],
        `/programs#${p.id}`,
        1.1,
      ),
    );
  }

  for (const n of newsArticles) {
    entries.push(
      makeEntry(
        "News",
        n.title,
        n.excerpt,
        [n.category, n.author, n.authorRole, ...(n.keyTakeaways ?? []), ...n.content],
        `/news/${n.slug}`,
        1,
      ),
    );
  }

  for (const v of vacancies) {
    entries.push(
      makeEntry(
        "Vacancy",
        v.title,
        v.summary,
        [
          v.department,
          v.category,
          v.type,
          v.location,
          v.summary,
          v.overview,
          ...v.competencies,
          ...v.keyResponsibilities,
        ],
        `/vacancy/${v.id}`,
        1.05,
      ),
    );
  }

  for (const f of CAMPUS_FACILITIES) {
    entries.push(
      makeEntry(
        "Campus",
        f.name,
        f.description,
        [f.zone, f.category, f.shortName, ...f.features, ...f.specs.map((s) => `${s.label} ${s.value}`)],
        `/campus-locator`,
        0.9,
      ),
    );
  }

  for (const e of academyEvents) {
    entries.push(
      makeEntry(
        "Events",
        e.title,
        e.description,
        [e.type, e.category, e.venue, e.location, ...e.keyThemes, ...e.targetAudience, ...e.featuredSpeakers],
        `/news#events`,
        1,
      ),
    );
  }

  for (const r of libraryResources) {
    entries.push(
      makeEntry(
        "Resources",
        r.title,
        r.abstract,
        [r.category, r.author, ...r.keywords],
        `/library`,
        0.95,
      ),
    );
  }

  entries.push(
    makeEntry("About", "About AFLEX", "Our federal mandate, history, values, pillars, and leadership.", "about council ministers federal mandate history values board governance leadership pillars coming vision mission", "/about", 1),
    makeEntry("Services", "Online Learning & Student LMS", "Access student learning portals, asynchronous modules, and Project WILD LMS.", "online learning LMS moodle canvas student portal WILD login elearning", "/online-learning", 1),
    makeEntry("Services", "Library & Digital Repository", "Pan-African research library, digital archives, and policy briefs at Sululta.", "library repository books journals research policy brief jstor archive", "/library", 1),
    makeEntry("Services", "Frequently Asked Questions (FAQ)", "Comprehensive answers regarding admissions, campus life, LMS, and credentials.", "faq questions help admissions sululta accommodation certificates", "/faq", 0.9),
    makeEntry("Services", "Contact Us", "Program inquiries, partnerships, visits, and general questions.", "contact email address visit inquiry helpdesk phone support", "/contact", 1),
    makeEntry("Services", "Procurement", "Official notices and bid documents.", "tender supplier bid finance legal procurement", "/procurement", 0.9),
    makeEntry("Services", "Scholarships & Fellowships", "Opportunities that make leadership learning more accessible.", "scholarship fellowship application women leaders grant funding", "/scholarship", 0.95),
    makeEntry("Services", "Careers at AFLEX", "Open positions, fellowships, and appointments at the academy.", "vacancy jobs careers employment HR faculty appointments hiring", "/vacancy", 1.05),
    makeEntry("Resources", "Training Catalog", "Browse current and upcoming training offerings.", "catalog courses modality audience cohort training catalogue", "/catalog", 1),
    makeEntry("Resources", "Media Hub", "Campus, cohorts, events, and research resources.", "photos images albums downloads resources gallery media", "/media", 0.85),
    makeEntry("Research", "Research & Policy Advisory", "Research on Pan-Africanism, governance, nation building, and public leadership.", "research policy pan africanism governance advisory briefs", "/programs#research", 1.05),
    makeEntry("News", "News & Events", "The latest work, stories, and events from AFLEX Academy.", "news press events stories updates media", "/news", 1),
    makeEntry("Campus", "Find Your Way Around Campus", "A guide to the AFLEX Sululta campus.", "Sululta campus locator training halls accommodation dining wayfinding map visit", "/campus-locator", 0.95),
  );

  return entries.map((e) => {
    const keywordText = e.keywords || "";
    return {
      ...e,
      titleTokens: tokenize(e.title),
      keywordTokens: tokenize(keywordText),
      descTokens: tokenize(e.description),
      haystack: normalizeText(`${e.title} ${e.description} ${keywordText}`),
    };
  });
}

const SEARCH_INDEX = buildSearchIndex();

// ─── Public search API ───────────────────────────────────────────────────────

/**
 * Run a dynamic, relation-aware, typo-tolerant search.
 */
export function search(query: string, limit = 12): SearchResult[] {
  const raw = query.trim();
  if (!raw) return [];

  const primaryTokens = tokenize(raw);
  // Allow single-character queries only when the raw string is longer (e.g. "WILD")
  // — tokenize already drops stubs; if nothing left, try a soft fallback.
  const tokens = primaryTokens.length
    ? primaryTokens
    : normalizeText(raw).split(/[^a-z0-9]+/).filter((w) => w.length >= 1);

  if (tokens.length === 0) return [];

  const { primary, related } = expandQueryTokens(tokens);

  const scored = SEARCH_INDEX.map((entry) => {
    const { score, matchedTokens } = scoreEntry(entry, primary, related, raw);
    return { entry, score, matchedTokens };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  const maxScore = scored[0].score;
  const scale = maxScore > 0 ? 1 / maxScore : 0;

  return scored.slice(0, limit).map((r) => {
    const { entry, score } = r;
    const relevance = Math.round(score * scale * 100) / 100;
    const { titleTokens, keywordTokens, descTokens, haystack, ...rest } = entry;
    return { ...rest, relevance };
  });
}
