# CryptoPrism Website — project rules

## MOBILE IS FROZEN — do not disturb the mobile build

The mobile homepage (≤640px) is finished and approved by the user (2026-07-19). Hard rules:

- **Never modify anything under `src/components/site/prism-home/mobile/`** — components, data, canvas, sections — unless the user explicitly asks for a mobile change.
- `PrismHome.tsx` must keep the `useIsMobile(640)` → `<PrismMobileHome />` switch, and all desktop-only mechanisms (`prism-snap` class on `<html>`, the `fitPages` runtime, reveal effects) must stay gated to the desktop branch.
- `src/styles/prism-home.css` rules prefixed `.prism-mobile-*` (and the `.prism-mobile-home` reduced-motion kill rule) stay as-is.
- Any PR that touches shared files (`PrismHome.tsx`, `prism-home.css`, `index.html`) requires a mobile regression check at 390×844: mobile tree renders, no `prism-snap` class, no fitPages inline styles, hero/ledger/carousel behave unchanged.

Current work: desktop v5 design sync (Claude Design project 72004fbc, `CryptoPrism Hero.dc.html`), one screen at a time — the user passes each screen before the next begins.

## Conventions
- Never `git add -A` / `git add .` — stage exact paths.
- CI runs `npm run lint` (eslint) which local `npm run build` does not — always run both before pushing. Pushes to `main` auto-deploy to cryptoprism.io (AWS S3+CloudFront).
- GitHub flow: push branch, open PR (option B); PRs are held for the user's review unless they say merge.
- Design transcription: `sc-if`/`sc-for` are template artifacts; literal `—`-style escapes decode to em dashes; static markup in a design reference is transcription, not dummy data.
