# Enterprise Architecture section — DEFERRED (rebuild plan)

**Status:** Removed from the live homepage on 2026-07-20 at the user's request
("not needed yet, and the enterprise showcase looked dull"). This is a deferral,
not a cancellation — rebuild it when the enterprise story is a priority.

## Where the code is (archived, not deleted)
- Component: `src/components/site/prism-home/sections/EnterpriseArchitecture.tsx`
  — left in the tree but **orphaned** (no longer imported/rendered by
  `PrismHome.tsx`). It still lints/builds. To restore the old version, re-add the
  import + `<EnterpriseArchitecture />` between `<FeatureShowcase />` and
  `<InstitutionalTrust />` in `PrismHome.tsx`.
- Design source of truth: `CryptoPrism Hero.dc.html` (Claude Design project
  72004fbc) lines 748–817; local decoded copy in the session scratchpad.

## What the section was (so it can be rebuilt from intent, not just restored)
Headline **"Enterprise Infrastructure. Built for the Real World."** + sub
("CryptoPrism unifies fragmented data, AI engines, and enterprise workflows into
a secure, scalable intelligence infrastructure."). A browser-framed architecture
card showing a layered stack:
- **Who it's for** — Hedge Funds, Asset Managers, Fintech Platforms, Exchanges,
  Research Teams, Family Offices.
- **CryptoPrism Intelligence Layer** (dark) — 4 engines: Market Intelligence,
  On-Chain Intelligence, Sentiment Intelligence, Macro & Economic; plus a
  "Knowledge Graph + Entity Resolution + Cross-Source Correlation" bar.
- **Unified Data Foundation** — 6 raw-source tiles (Market/On-Chain/News &
  Social/Macro/Alternative/Partner data). *Note: this row was already cut once
  for being redundant with Screen 2's data inputs — reconsider whether it earns
  its place on rebuild.*
Four supporting feature cards (Secure by Design, Unified Data Layer, Built for
Integration, Enterprise Ready) and a closing CTA ("Explore Enterprise Solutions"
/ "Talk to Our Team").

## Why it didn't land (fix on rebuild)
- Read as **dull / generic** — the layered-box diagram is static and the copy is
  boilerplate enterprise-speak ("Secure by Design", "Enterprise Ready").
- Competes with Screen 2 (data inputs) and Institutional Trust (audience, "built
  for teams") — a lot of overlap.
- Rebuild ideas: lead with a concrete outcome/number, make the architecture
  interactive or animated (data flowing through the layers), cut the redundant
  data-foundation + who-it's-for rows, and write specific copy (real integration
  names, a real deployment story) instead of generic labels. Consider whether
  this belongs on the homepage at all vs. a dedicated `/institutional` page.

## Current homepage flow (after removal)
Hero → The Problem → Feature Showcase → Institutional Trust → Final CTA + FAQ.
