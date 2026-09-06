# AFLEX Frontend Code Practice

Version 1.0 · Implementation rules for the Next.js App Router frontend

## 1. Architecture

- Keep routes in `src/app` and shared visual behavior in `src/components`. A page owns composition; a component owns reusable interaction or presentation.
- Prefer server components. Add `"use client"` only when a component needs browser state, event handlers, effects, or a browser API.
- Keep content data separate from JSX when a repeated item has a stable shape. Use typed arrays or content models rather than duplicated markup.
- Keep the public page boundary small. Do not make the entire page client-rendered to support one menu, search overlay, carousel, or filter.
- Use route metadata for every public page. Titles, descriptions, canonical URLs, Open Graph data, and locale alternates should come from the route's content model.
- Do not introduce a new dependency for a primitive already supported by the platform or an existing local pattern.

## 2. TypeScript and React

- Use explicit types for component props, content records, event payloads, and API responses. Avoid `any` and type assertions that hide missing data.
- Prefer stable keys from content IDs or slugs. Never use array indexes for reorderable content.
- Keep components small enough to scan. Extract a component when a block has its own semantics, responsive behavior, or repeated use.
- Keep content and labels out of event handlers. Actions should call named functions with clear intent.
- Use semantic HTML first: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, headings in order, and real buttons for actions.
- Links navigate; buttons change state or submit. Do not use clickable `div`s or buttons that contain navigation URLs.
- Avoid unnecessary memoization. Add `useMemo` or `useCallback` only when profiling or an established local pattern shows a real benefit.

## 3. Styling and Tokens

- Use design tokens from `globals.css`; do not introduce one-off colors, shadows, radii, or font families in page code.
- Keep the four-color system: black, white, blue, and gold. A new color requires design-system approval and a documented contrast purpose.
- Use CSS classes for visual states. Avoid inline style objects for layout or colors unless a value is genuinely data-driven.
- Preserve stable dimensions for cards, media, buttons, icons, and grid items so loading text and translated copy do not cause layout shift.
- Use `clamp`, grid tracks, aspect ratios, and container constraints for responsive sizing. Do not scale type directly from viewport width with `vw` alone.
- Use the same interaction language: cards lift 2px and shift border color, text links move their arrow, outlined buttons invert within their approved surface relationship.
- Keep CSS readable and grouped by system: reset/tokens, shared shell, components, page sections, responsive rules, reduced-motion rules.

## 4. Content and Data Integrity

- Never invent statistics, capacities, dates, names, legal language, addresses, application criteria, or partner logos. Mark missing source content as pending or omit the component.
- Keep Programs canonical in the Programs route. Home and About may summarize but must not silently duplicate long-form program content.
- Keep controlled taxonomies in one source: gallery albums, news categories, program modalities, audiences, and vacancy departments.
- Display dates and durations from structured fields. Do not parse or sort human-readable strings in the UI.
- Treat external CMS data as untrusted: validate at the boundary, handle missing images and fields, and provide an explicit empty state.

## 5. Performance and Media

- Use `next/image` for local or configured remote images, with explicit dimensions, meaningful alt text, and priority only for the first meaningful hero image.
- Do not load a large image to display a thumbnail. Define responsive sizes and use WebP or AVIF where the source pipeline supports it.
- Lazy-load below-the-fold media and avoid autoplay. Reserve media space before the request completes.
- Keep the first viewport free of non-essential JavaScript and third-party embeds. Load maps, video players, and analytics only when needed.
- Test slow-network behavior: no blank hero, unreadable navigation, layout jump, or broken image fallback.

## 6. Testing and Review

- Before review, run `npm run lint` and `npm run build`.
- Test changed routes at mobile, tablet, and desktop widths; test keyboard navigation and reduced motion for interactive changes.
- For bilingual changes, test a long Amharic label and a long English label in every changed control.
- For gallery changes, test masonry order, keyboard lightbox operation, captions, failed images, and one-column mobile behavior.
- Review diffs for unrelated formatting, generated files, secrets, dead links, missing alt text, and fabricated content.
- Document known content gaps in the relevant page spec instead of disguising them with placeholder facts.

## 7. Definition of Done

A page is ready when its content source is identified, its language slots exist, its loading and empty states are designed, its keyboard and mobile behavior work, its colors match the approved pairings, its media has alt text and reserved dimensions, its metadata is present, and lint/build plus focused manual checks pass.