/**
 * Dynamic context search engine for the AFLEX site.
 *
 * Unlike the previous hand-written static index, this module builds the search
 * index *dynamically* from the real content sources (programs, news, vacancies,
 * campus facilities, events, library resources) so it always reflects what the
 * site actually contains. A small set of static page entries (About, FAQ,
 * Contact, …) is kept for pages that have no backing data file.
 *
 * Matching is context-aware rather than a single substring test:
 *   - The query is tokenized and each token is scored independently.
 *   - Title matches outweigh keyword matches, which outweigh description matches.
 *   - Prefix, contains, and edit-distance (typo) fallbacks let partial or
 *     misspelled terms still surface relevant results.
 *   - Results that match *every* query token get a relevance boost, so
 *     "women leadership" ranks the Project WILD entry above a generic hit.
 */

import { programDetails } from "@/lib/programs-data";
import { newsArticles } from "@/lib/news-data";
import { vacancies } from "@/lib/vacancies-data";
import { CAMPUS_FACILITIES } from "@/lib/campus-data";
import { academyEvents } from "@/lib/events-data";
import { libraryResources } from "@/lib/library-data";

// ─── Public types ────────────────────────────────────────────────────────────

export interface SearchEntry {
  /** Category label shown as the result type badge (e.g. "Programs", "News"). */
  type: string;
  /** Headline of the result. */
  title: string;
  /** Short context line shown beneath the title. */
  description: string;
  /** Internal href (locale-agnostic); the UI prepends the active locale when needed. */
  href: string;
  /** Base priority multiplier. Pages that are primary destinations rank a touch higher. */
  weight: number;
  /** Normalized keyword string for scoring. */
  keywords?: string;
}

export interface SearchResult extends SearchEntry {
  /** 0–1 normalized relevance so the UI can show a "match strength" indicator. */
  relevance: number;
}

// ─── Stop words (filtered out of queries so they don't skew scoring) ─────────

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "do", "does", "for",
  "from", "had", "has", "have", "her", "his", "if", "in", "is", "it", "its",
  "no", "not", "of", "on", "or", "our", "so", "that", "the", "their", "then",
  "these", "this", "those", "to", "was", "we", "were", "will", "with", "you",
  "your",
]);

// ─── Tokenization helpers ────────────────────────────────────────────────────

/** Split free text into lowercase word tokens, dropping stop words and stubs. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

/**
 * Levenshtein edit distance with an early-exit cap. Returns `Infinity` as soon
 * as the running cost exceeds `max`, which keeps typo detection cheap for short
 * query tokens while still allowing a 1–2 char tolerance window.
 */
function editDistance(a: string, b: string, max: number): number {
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > max) return Infinity;

  // Rolling two-row DP.
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
    // Bail early once every alignment is already worse than the cap.
    if (rowMin > max) return Infinity;
    [prev, curr] = [curr, prev];
  }
  return prev[lb];
}

// ─── Indexed entry (pre-tokenized for fast per-token scoring) ────────────────

interface IndexedEntry extends SearchEntry {
  titleTokens: string[];
  keywordTokens: string[];
  descTokens: string[];
}

// Relative weight of a match found in each field.
const WEIGHT_TITLE = 10;
const WEIGHT_KEYWORDS = 6;
const WEIGHT_DESCRIPTION = 3;

/**
 * Score a single query token against a field's tokens.
 * Returns a 0–1 fraction of the field weight; 0 means no match.
 */
function scoreTokenInField(token: string, fieldTokens: string[]): number {
  // 1. Exact word match — full strength.
  for (const w of fieldTokens) {
    if (w === token) return 1;
  }
  // 2. Prefix match (e.g. "lead" → "leadership") — strong, but not perfect.
  if (token.length >= 3) {
    for (const w of fieldTokens) {
      if (w.startsWith(token)) return 0.85;
    }
  }
  // 3. Contains match (e.g. "govern" → "governance") — decent context signal.
  if (token.length >= 4) {
    for (const w of fieldTokens) {
      if (w.includes(token)) return 0.5;
    }
  }
  // 4. Typo tolerance via edit distance. One edit for short words, two for
  //    longer ones, so "leadrship" and "statecraf" still resolve.
  const maxEdits = token.length >= 6 ? 2 : 1;
  let best = Infinity;
  for (const w of fieldTokens) {
    if (Math.abs(w.length - token.length) > maxEdits) continue;
    const d = editDistance(token, w, maxEdits);
    if (d < best) best = d;
    if (d === 1) break; // can't do better than a single edit
  }
  if (best <= maxEdits) {
    return best === 1 ? 0.4 : 0.25;
  }
  return 0;
}

/** Compute the raw relevance score for an entry against the query tokens. */
function scoreEntry(
  entry: IndexedEntry,
  queryTokens: string[],
): { score: number; matchedTokens: number } {
  let score = 0;
  let matchedTokens = 0;

  for (const qt of queryTokens) {
    const t = scoreTokenInField(qt, entry.titleTokens) * WEIGHT_TITLE;
    const k = scoreTokenInField(qt, entry.keywordTokens) * WEIGHT_KEYWORDS;
    const d = scoreTokenInField(qt, entry.descTokens) * WEIGHT_DESCRIPTION;
    const tokenScore = t + k + d;
    if (tokenScore > 0) matchedTokens += 1;
    score += tokenScore;
  }

  // Relevance boost when *every* query token matched (AND-style precision).
  if (queryTokens.length > 1 && matchedTokens === queryTokens.length) {
    score *= 1.5;
  }

  // Apply the entry's base priority weight.
  score *= entry.weight;

  return { score, matchedTokens };
}

// ─── Dynamic index construction ─────────────────────────────────────────────

/** Build a single SearchEntry from raw fields, normalizing keywords to an array. */
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

/**
 * Assemble the full search index from every content source at module load.
 * Because this runs once and reads the same data files the pages render from,
 * the index can never drift out of sync with the live site content.
 */
function buildSearchIndex(): IndexedEntry[] {
  const entries: SearchEntry[] = [];

  // ── Programs ──────────────────────────────────────────────────────────────
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

  // ── News articles ─────────────────────────────────────────────────────────
  for (const n of newsArticles) {
    entries.push(
      makeEntry(
        "News",
        n.title,
        n.excerpt,
        [
          n.category,
          n.author,
          n.authorRole,
          ...(n.keyTakeaways ?? []),
          ...n.content,
        ],
        `/news/${n.slug}`,
        1,
      ),
    );
  }

  // ── Vacancies ─────────────────────────────────────────────────────────────
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

  // ── Campus facilities ────────────────────────────────────────────────────
  for (const f of CAMPUS_FACILITIES) {
    entries.push(
      makeEntry(
        "Campus",
        f.name,
        f.description,
        [
          f.zone,
          f.category,
          f.shortName,
          ...f.features,
          ...f.specs.map((s) => `${s.label} ${s.value}`),
        ],
        `/campus-locator`,
        0.9,
      ),
    );
  }

  // ── Events ────────────────────────────────────────────────────────────────
  for (const e of academyEvents) {
    entries.push(
      makeEntry(
        "Events",
        e.title,
        e.description,
        [
          e.type,
          e.category,
          e.venue,
          e.location,
          ...e.keyThemes,
          ...e.targetAudience,
          ...e.featuredSpeakers,
        ],
        `/news#events`,
        1,
      ),
    );
  }

  // ── Library resources ─────────────────────────────────────────────────────
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

  // ── Static page entries (no backing data file) ────────────────────────────
  const staticPages: SearchEntry[] = [
    makeEntry("About", "About AFLEX", "Our federal mandate, history, values, pillars, and leadership.", "about council ministers federal mandate history values board governance leadership pillars", "/about", 1),
    makeEntry("Services", "Online Learning & Student LMS", "Access student learning portals, asynchronous modules, and Project WILD LMS.", "online learning LMS moodle canvas student portal WILD login", "/online-learning", 1),
    makeEntry("Services", "Library & Digital Repository", "Pan-African research library, digital archives, and policy briefs at Sululta.", "library repository books journals research policy brief jstor", "/library", 1),
    makeEntry("Services", "Frequently Asked Questions (FAQ)", "Comprehensive answers regarding admissions, campus life, LMS, and credentials.", "faq questions help admissions sululta accommodation certificates", "/faq", 0.9),
    makeEntry("Services", "Contact Us", "Program inquiries, partnerships, visits, and general questions.", "contact email address visit inquiry helpdesk", "/contact", 1),
    makeEntry("Services", "Procurement", "Official notices and bid documents.", "tender supplier bid finance legal procurement", "/procurement", 0.9),
    makeEntry("Services", "Scholarships & Fellowships", "Opportunities that make leadership learning more accessible.", "scholarship fellowship application women leaders grant", "/scholarship", 0.95),
    makeEntry("Resources", "Training Catalog", "Browse current and upcoming training offerings.", "catalog courses modality audience cohort training", "/catalog", 1),
    makeEntry("Resources", "Gallery & Resources", "Campus, cohorts, events, and research resources.", "photos images albums downloads resources gallery", "/gallery", 0.85),
  ];
  entries.push(...staticPages);

  // Pre-tokenize each field once so the per-keystroke search stays cheap.
  return entries.map((e) => ({
    ...e,
    titleTokens: tokenize(e.title),
    keywordTokens: tokenize(e.keywords || ""),
    descTokens: tokenize(e.description),
  }));
}

// The index is built once at module load — cheap, since all sources are static.
const SEARCH_INDEX = buildSearchIndex();

// ─── Public search API ───────────────────────────────────────────────────────

/**
 * Run a context-aware search against the dynamically built index.
 *
 * @param query  Raw user input.
 * @param limit  Optional cap on the number of returned results.
 * @returns Ranked results (best match first), each carrying a 0–1 relevance.
 */
export function search(query: string, limit = 12): SearchResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = SEARCH_INDEX.map((entry) => {
    const { score, matchedTokens } = scoreEntry(entry, queryTokens);
    return { entry, score, matchedTokens };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  // Normalize the top score to relevance = 1 for the UI strength indicator.
  const maxScore = scored[0].score;
  const scale = maxScore > 0 ? 1 / maxScore : 0;

  return scored.slice(0, limit).map((r) => {
    const { entry, score } = r;
    const relevance = Math.round(score * scale * 100) / 100;
    const { titleTokens, keywordTokens, descTokens, ...rest } = entry;
    return { ...rest, relevance };
  });
}
