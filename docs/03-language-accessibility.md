# AFLEX Language & Accessibility Standard

Version 1.0 · Normative implementation guidance for `aflexacademy.gov.et`

## Purpose

AFLEX serves public officials, partners, applicants, journalists, and visitors in Ethiopia and across Africa. Every public template must work in English and Amharic, with the same information, actions, and level of respect in both languages. The site targets WCAG 2.1 AA as a minimum and should be tested against WCAG 2.2 AA where the tooling supports it.

## 1. Language System

### 1.1 Locale structure

The initial language set is English (`en`), Amharic (`am`), Afaan Oromo (`om`), Somali (`so`), Tigrinya (`ti`), Swahili (`sw`), Hausa (`ha`), and Yoruba (`yo`). Swahili, Hausa, and Yoruba are the three additional high-reach African languages included in the first multilingual framework. AFLEX editorial owners must approve all public translations before publication.

- Use explicit locale routes: `/en/...`, `/am/...`, `/om/...`, `/so/...`, `/ti/...`, `/sw/...`, `/ha/...`, and `/yo/...`. The root route may redirect to the user's selected locale, but must have a predictable fallback to English.
- Keep locale selection in the URL, not only in client state or a cookie. A shared link must preserve its language.
- Store translatable copy as structured content fields: `titleEn`/`titleAm`, `dekEn`/`dekAm`, `bodyEn`/`bodyAm`, and equivalent fields for labels, metadata, and calls to action.
- Do not publish an English-only page under a localized route. If translation is pending, show an honest unavailable state and provide the English equivalent link. The current implementation supplies translated Home/About core copy and an explicit reviewed-pending state for secondary route content.
- Keep dates, durations, program codes, and reference numbers as data. Localize their display format without changing their underlying value.

### 1.1.1 Preference precedence

Use this order when choosing the initial locale:

1. An explicit locale in the URL, such as `/am/about`, always wins.
2. A previously selected AFLEX locale in the `aflex-locale` cookie wins for an unlocalized URL.
3. The browser's ordered `navigator.languages` / `Accept-Language` values are matched by language code.
4. Any unsupported or missing preference falls back to English (`en`).

Do not silently use IP geolocation as a language decision. Location is imprecise, can be affected by VPNs and shared networks, and does not prove reading preference. A location-based suggestion may be added later only with clear consent and an easy manual override.

### 1.2 Typography and script

- English headings and body use Sora. Utility data uses IBM Plex Mono.
- Amharic headings and body use Noto Sans Ethiopic, matched to Sora's intended weight: 600 for headings, 400 for body, 500 for labels.
- Define the fallback stack as `"Noto Sans Ethiopic", "Sora", sans-serif` for Amharic content. Do not rely on Sora to render Ethiopic glyphs.
- Never force uppercase, letter spacing, or a fixed line height onto Amharic text. Ethiopic script does not share English uppercase behavior and may need more vertical room.
- Allow translated labels to wrap. Buttons, navigation, tabs, breadcrumbs, cards, and metadata must not clip or resize the surrounding layout.
- Do not encode meaning through English-only idioms, abbreviations, or unexplained program acronyms. Keep the official English acronym where required and provide its full Amharic context.

### 1.3 Translation quality

- Translate meaning, not individual words. Government titles, legal language, program names, and institutional names require AFLEX editorial review.
- Preserve the hierarchy and intent of the source page, but allow sentence structure and line length to change naturally.
- Every content release checks parity for headings, body, buttons, form errors, empty states, image captions, metadata, alt text, and SEO fields.
- Never use machine translation as the final approval step for official statements, application instructions, procurement, vacancy, or policy content.

## 2. Color and Contrast Rules

Use the approved pairings in [01-design-system.md](01-design-system.md). The following are implementation requirements:

- Normal text must meet a 4.5:1 contrast ratio; large text must meet 3:1. UI boundaries, focus indicators, and meaningful graphics must meet the applicable non-text contrast requirement.
- Black text is used on white and gold. White text is used on black and blue.
- Blue is used for focus, short supporting components, and selected section surfaces. It is not used as a hero overlay or behind hero text.
- Gold is an accent, not a general text color. On white or blue, use gold only for large display text, icons, borders, and underlines unless a measured contrast check proves otherwise.
- Captions and navigation over photography require a controlled backing layer or a tested image crop. Do not assume a dark photograph is always behind white text.
- Loading, broken-image, empty, disabled, hover, focus, selected, and error states must retain a readable foreground/background pair. No gray-on-white browser defaults.
- Color cannot be the only signal. Pair selected, error, required, active, and status states with text, an icon, a border, a shape, or a change in position.

## 3. Keyboard and Interaction

- Provide a skip-to-content link on every page.
- Every interactive target must be reachable in a logical DOM order and have a visible focus indicator. Do not remove outlines without replacing them with a stronger indicator.
- Mobile controls, language toggles, close buttons, pagination, filters, and gallery lightbox controls must expose their state through `aria-expanded`, `aria-current`, `aria-pressed`, or an equivalent semantic attribute.
- Minimum touch target is 44 by 44 CSS pixels, including icon-only buttons.
- Dialogs trap focus while open, close with Escape, identify themselves with an accessible name, and return focus to the trigger.
- Do not use hover as the only way to reveal information. Captions, card actions, and image context must be available by keyboard and touch.

## 4. Images, Video, and Motion

- Every informative image has specific alt text describing its subject and relevance. Decorative images use an empty alt attribute.
- Do not repeat a nearby visible caption in alt text. For complex diagrams, provide a nearby text description.
- Video has captions; meaningful audio has a text alternative. Never autoplay video with sound.
- Reserve image dimensions to prevent layout shift. Use responsive formats and lazy loading below the first viewport.
- Respect `prefers-reduced-motion`: disable rise, parallax, stroke drawing, lightbox transitions, and other non-essential animation. The content and state change must still be clear.
- Avoid flashing, rapid pattern changes, and motion that makes navigation or reading harder.

## 5. Forms and Content States

- Labels are visible and associated with inputs. Place instructions before the field and errors after the field.
- Error messages name the problem and the fix; they do not rely on a red color. On submit, move focus to the first invalid field or the confirmation heading.
- Preserve entered values after validation errors.
- Empty states explain what is absent and what the visitor can do next. Never leave a blank heading or an empty card grid.
- Confirmation panels are inline, readable by assistive technology, and include the reference number in IBM Plex Mono.

## 6. Acceptance Checklist

- Test English and Amharic at 320px, 768px, and desktop widths.
- Test at 200% browser zoom without horizontal scrolling for ordinary content.
- Test keyboard-only navigation, screen-reader names, focus order, Escape behavior, and reduced motion.
- Run automated accessibility checks, then manually verify contrast over real image crops and all content states.
- Review all new copy with AFLEX's multilingual editorial owners before publishing. The owner review must cover Amharic, Afaan Oromo, Somali, Tigrinya, Swahili, Hausa, and Yoruba, not only English.