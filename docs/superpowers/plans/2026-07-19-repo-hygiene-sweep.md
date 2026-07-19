# Repo Hygiene Sweep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean the repo working tree to zero unexplained entries in `git status`: archive junk outside the repo, gitignore what regenerates, and commit real content (founder-bio edits + investor collateral) via two small PRs.

**Architecture:** Three independent moves. (1) Filesystem-only: move ~20 junk items to an archive folder outside the repo — no commits involved. (2) `chore/founder-bio-copy` branch off `main`: commit the two already-modified pitch-deck files, PR. (3) `chore/repo-hygiene` branch off `main`: relocate investor collateral into `deck/` and `docs/`, harden `.gitignore`, PR. Nothing is permanently deleted; the archive folder is the user's to empty.

**Tech Stack:** git, PowerShell/bash file moves. No code changes except committing pre-existing edits.

## Global Constraints

- **User decisions (2026-07-19, binding):** junk → archive at `C:\cpio_db\_archive\cpio_website-cleanup-2026-07-19\` (NOT deleted); founder-bio edits → committed via their own small PR; collateral → committed to repo, with the 18 regenerable `deck/slide_*.png` exports gitignored (kept on disk, not committed).
- **NEVER `git add -A` or `git add .`** — stage exact paths only, every commit.
- **Never permanently delete** — every removal in this plan is a move to the archive folder.
- Both branches are cut **from `main`** (not from `feature/desktop-fit-pages`, the current checkout). The founder-bio modifications survive checkout because neither open feature branch touches those files.
- PRs are **pushed and held for user review** — do not merge (matches PR #15/#16 handling). GitHub pushes use option B (push branch, create PR).
- Verified facts this plan relies on: `sa-key.json` is 0 bytes (empty — no secret) and was never committed (`git log --all -- sa-key.json` is empty); `public/mobile-hero-bg.jpeg` has zero references in the codebase (grep); `app-dist/` is a 24MB abandoned prototype (user-confirmed); the founder-bio diff is limited to `deck/CryptoPrism_Deck_V3.html` and `src/components/pitchdeck/slides/SlideFounder.tsx`.
- Verification gate for any branch touching `src/`: `npm run lint` AND `npm run build` (CI runs both; lint is NOT part of local build).
- Do not touch: `feature/mobile-home` (PR #15) and `feature/desktop-fit-pages` (PR #16) branches; anything under `.superpowers/` or `docs/superpowers/specs/`.

## File Structure

```
C:\cpio_db\_archive\cpio_website-cleanup-2026-07-19\   ← CREATED (outside repo): all junk lands here
.gitignore                                              ← MODIFIED (Task 3): sa-key guard, .migration/, deck/slide_*.png, *.msi
deck/cryptoprism-onepager{,-dark}.{html,png}            ← MOVED from repo root (Task 3)
docs/investor-outreach-prompts.md                       ← MOVED from repo root (Task 3)
deck/CryptoPrism_Deck_V3.html                           ← COMMITTED as-is (Task 2, already modified)
src/components/pitchdeck/slides/SlideFounder.tsx        ← COMMITTED as-is (Task 2, already modified)
```

---

### Task 1: Archive junk outside the repo

**Files:**
- Create: `C:\cpio_db\_archive\cpio_website-cleanup-2026-07-19\` (directory, outside the repo)
- Move (from repo root unless noted): `sa-key.json`, `go1.26.0.windows-amd64.msi`, `network.txt`, `app-dist\`, `stitch-screen.html`, `stitch-screen2.html`, `stitch-screen3.html`, `stitch-screen4.html`, `stitch-screen5.html`, `stitch-mobile-landing.jpg`, `mobile-fullspectrum-1.jpeg`, `mobile-fullspectrum-2.jpeg`, `mobile-fullspectrum-3.jpeg`, `mobile-fullspectrum-top.jpeg`, `mobile-fullspectrum-view.jpeg`, `mobile-stitch-check.jpeg`, `mobile-stitch-scroll1.jpeg`, `mobile-stitch-scroll2.jpeg`, `public\mobile-hero-bg.jpeg`, `docs\plans\2026-02-26-light-mode.md`

**Interfaces:**
- Consumes: nothing.
- Produces: a working tree whose `git status --porcelain` untracked list is reduced to exactly: `.migration/`, `deck/slide_*.png` (18 files), `cryptoprism-onepager*` (4 files), `investor-outreach-prompts.md`, plus the plan file `docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md`. Tasks 2–3 assume this state.

- [ ] **Step 1: Create the archive directory and move everything in one batch**

Run (Git Bash):

```bash
ARCH="/c/cpio_db/_archive/cpio_website-cleanup-2026-07-19"
mkdir -p "$ARCH"
cd /c/cpio_db/cpio_website
mv sa-key.json go1.26.0.windows-amd64.msi network.txt \
   stitch-screen.html stitch-screen2.html stitch-screen3.html stitch-screen4.html stitch-screen5.html \
   stitch-mobile-landing.jpg \
   mobile-fullspectrum-1.jpeg mobile-fullspectrum-2.jpeg mobile-fullspectrum-3.jpeg \
   mobile-fullspectrum-top.jpeg mobile-fullspectrum-view.jpeg \
   mobile-stitch-check.jpeg mobile-stitch-scroll1.jpeg mobile-stitch-scroll2.jpeg \
   app-dist "$ARCH/"
mv public/mobile-hero-bg.jpeg "$ARCH/"
mkdir -p "$ARCH/docs-plans"
mv docs/plans/2026-02-26-light-mode.md "$ARCH/docs-plans/"
rmdir docs/plans 2>/dev/null || true   # only removes it if now empty
```

Note: `docs/plans/2026-02-26-light-mode.md` is a plan for the OLD dark-theme site's light-mode toggle — superseded by the 2026-07 rebuilds (the site is light-themed by design now). Archived, not kept, so nobody executes it by mistake.

- [ ] **Step 2: Verify the archive received everything and the repo status shrank**

Run:

```bash
ls "/c/cpio_db/_archive/cpio_website-cleanup-2026-07-19" | wc -l   # expect 20 (19 moved items + docs-plans dir)
git -C /c/cpio_db/cpio_website status --porcelain
```

Expected `git status` output — ONLY these lines (order may differ):

```
 M deck/CryptoPrism_Deck_V3.html
 M src/components/pitchdeck/slides/SlideFounder.tsx
?? .migration/
?? cryptoprism-onepager-dark.html
?? cryptoprism-onepager-dark.png
?? cryptoprism-onepager.html
?? cryptoprism-onepager.png
?? deck/slide_1.png … deck/slide_18.png   (18 lines)
?? docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md
?? investor-outreach-prompts.md
```

If anything else remains, STOP and report — do not improvise disposal of an unlisted file.

No commit for this task — it's filesystem-only.

### Task 2: Founder-bio copy PR

**Files:**
- Modify (already modified — commit as-is, do NOT edit content): `deck/CryptoPrism_Deck_V3.html`, `src/components/pitchdeck/slides/SlideFounder.tsx`

**Interfaces:**
- Consumes: Task 1's clean status (not strictly required, but expected).
- Produces: branch `chore/founder-bio-copy` pushed, PR open against `main`, working tree free of tracked modifications (Task 3 needs that).

The edits restate the Gamerz Nation entry (Founder & CEO / Rs 1.4 Cr → Co-Founder 2017–19 / $100K Y1 turnover / India's first GeForce-certified zone) and add a "two-time founder" bullet. They are the user's own copy corrections — commit verbatim; if the diff at execution time differs from this description, STOP and report.

- [ ] **Step 1: Branch off main (modifications ride along)**

```bash
cd /c/cpio_db/cpio_website
git fetch origin main
git checkout -b chore/founder-bio-copy origin/main
git status --porcelain   # the two ' M' lines must still be present
```

- [ ] **Step 2: Lint + build (SlideFounder.tsx is in src/)**

```bash
npm run lint && npm run build
```

Expected: both pass. If lint fails inside `SlideFounder.tsx`, report the error — do not "fix" the user's copy.

- [ ] **Step 3: Commit exactly the two files**

```bash
git add deck/CryptoPrism_Deck_V3.html src/components/pitchdeck/slides/SlideFounder.tsx
git commit -m "chore(deck): update founder bio — Gamerz Nation co-founder, \$100K Y1, GeForce-certified zone

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: Push and open the PR (hold for review)**

```bash
git push -u origin chore/founder-bio-copy
gh pr create --base main --title "chore(deck): founder bio copy corrections" --body "Commits the user's pending founder-bio edits (deck HTML + SlideFounder slide): Gamerz Nation restated as Co-Founder 2017–19, \$100K Y1 turnover, India's first GeForce-certified gaming zone; adds the two-time-founder bullet. Copy-only; lint+build green. Held for review — do not merge without go-ahead."
```

Expected: PR URL printed. Do NOT merge.

### Task 3: Hygiene PR — collateral relocation + .gitignore hardening

**Files:**
- Modify: `.gitignore`
- Move+Create: `deck/cryptoprism-onepager.html`, `deck/cryptoprism-onepager.png`, `deck/cryptoprism-onepager-dark.html`, `deck/cryptoprism-onepager-dark.png`, `docs/investor-outreach-prompts.md` (moved from repo root)
- Left on disk, newly ignored (NOT committed): `.migration/`, `deck/slide_*.png` (18 files)

**Interfaces:**
- Consumes: Task 2 done (no tracked modifications left in the tree).
- Produces: branch `chore/repo-hygiene` pushed, PR open against `main`; after this task `git status --porcelain` on the branch shows ONLY `?? docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md` (this plan itself, committed in this same task — see Step 4 — so actually shows nothing).

- [ ] **Step 1: Branch off main, move the collateral**

```bash
cd /c/cpio_db/cpio_website
git checkout -b chore/repo-hygiene origin/main
mv cryptoprism-onepager.html cryptoprism-onepager.png \
   cryptoprism-onepager-dark.html cryptoprism-onepager-dark.png deck/
mv investor-outreach-prompts.md docs/
```

- [ ] **Step 2: Append the hygiene block to `.gitignore`**

Add these lines at the end of the existing `.gitignore` (keep everything already there):

```gitignore
# Secrets guard — service-account keys must never be committed
sa-key.json
*-sa-key.json

# Auto-generated migration state (self-ignoring dir, ignore the shell too)
.migration/

# Regenerable pitch-deck slide exports (rendered from deck/*.html)
deck/slide_*.png

# Stray installers
*.msi
```

- [ ] **Step 3: Verify the ignores took effect**

```bash
git status --porcelain
```

Expected: NO `.migration/` line, NO `deck/slide_*.png` lines. Only the moved collateral (`?? deck/cryptoprism-onepager*`, `?? docs/investor-outreach-prompts.md`), `M .gitignore`, and `?? docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md`.

- [ ] **Step 4: Commit (exact paths), including this plan**

```bash
git add .gitignore \
  deck/cryptoprism-onepager.html deck/cryptoprism-onepager.png \
  deck/cryptoprism-onepager-dark.html deck/cryptoprism-onepager-dark.png \
  docs/investor-outreach-prompts.md \
  docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md
git commit -m "chore: repo hygiene — relocate investor collateral, harden .gitignore

- one-pagers (html+png) -> deck/, outreach prompts -> docs/
- ignore: sa-key.json guard, .migration/, regenerable deck/slide_*.png, *.msi
- junk archived outside the repo (see plan doc), nothing deleted

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Sanity build, push, PR (hold for review)**

```bash
npm run lint && npm run build
git push -u origin chore/repo-hygiene
gh pr create --base main --title "chore: repo hygiene — collateral relocation + .gitignore hardening" --body "See docs/superpowers/plans/2026-07-19-repo-hygiene-sweep.md. Root junk archived to C:\\cpio_db\\_archive\\cpio_website-cleanup-2026-07-19 (not deleted). sa-key.json was empty (0 bytes) and never committed — the ignore entry is a guard, not a remediation. Held for review — do not merge without go-ahead."
```

Expected: lint+build pass (nothing in `src/` changed — regression guard only), PR URL printed. Do NOT merge.

- [ ] **Step 6: Final tree check**

```bash
git checkout feature/desktop-fit-pages
git status --porcelain
```

Expected: the moved collateral, this plan doc, `.migration/`, and the 18 `deck/slide_*.png` files ALL reappear as `??` — this branch's tree predates the chore commits and its `.gitignore` lacks the new entries. That is correct and expected until the hygiene PR merges to main; report it, do not re-move or re-ignore anything. The junk archived in Task 1 must NOT reappear (it left the disk) — if any of those 20 paths show up, something went wrong.

## Self-Review Notes

- Spec coverage: all 26 stray entries from the 2026-07-19 `git status` are dispatched — 20 archived (Task 1), 2 committed (Task 2), 5 relocated+committed (Task 3), `.migration/` + 18 slide PNGs ignored-in-place (Task 3), plan doc committed (Task 3).
- Step 6 caveat is real, not a placeholder: until PR #hygiene merges to main, switching back to the feature branch resurfaces the moved collateral as untracked (the moves are committed on the chore branch only). The executing agent must not "fix" this.
- No TDD cycle — this plan is file operations and verbatim commits; the verification gates are `git status` assertions and lint+build.
- Deliberately out of scope: merging PRs #15/#16, the a11y pass, revoking any GCP key (none exists — the file was empty).
