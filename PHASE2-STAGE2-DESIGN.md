# Phase 2 · Stage 2 — Remaining-Section Redesigns (PROPOSAL — awaiting owner sign-off)

> **Status: proposal only. Zero site code changes in this pass.** This commit contains exactly this document + rendered mockups in `_preview/stage2/`. Implementation starts only after the decision checklist (§9) is answered; answers land as D-rows in PROJECT.md in the first implementation commit — PROJECT.md is deliberately untouched here.
>
> **Driving goal (unchanged):** photography-led, cinematic, motion-rich, Wazen-calm — now measured against the **live** Pass-2.1 standard (hero Option A, video section, product proof, trust strip, nav). Those five are DONE and are the quality bar; nothing here re-opens them.
>
> **Owner diagnosis this stage answers** (why keep/polish wasn't enough): ① one skeleton repeated everywhere — icon + title + text + screenshot-in-identical-card, in uniform grids; ② screenshots framed identically page-wide (flat box in a card); ③ backgrounds are bland flat fills. Benchmark = everfit.io section **craft** — composition mechanics only, never their content or skin.

---

## 0 · How to review

Open the PNGs, or open the `.html` files in a browser from inside the repo (they reference real repo assets by relative path):

| File | What it shows |
|---|---|
| `_preview/stage2/problem-desktop.png` / `-mobile.png` | **Problem** — chaos→calm split (mobile stack is a decision surface) |
| `_preview/stage2/features-tabs-desktop.png` | **Features** — D21 rail tabs + redesigned composed scene |
| `_preview/stage2/divider-desktop.png` | **Photo divider ①** — D-1 band between Features and HowItWorks |
| `_preview/stage2/howitworks-desktop.png` / `-mobile.png` | **HowItWorks** — zigzag timeline (mobile collapse is a decision surface) |
| `_preview/stage2/segments-desktop.png` / `-mobile.png` | **Segments** — persona mosaic (mobile stacking is a decision surface) |
| `_preview/stage2/clientapp-desktop.png` | **ClientApp** — cinematic dark band + white-label phone |
| `_preview/stage2/whywazen-desktop.png` | **WhyWazen** — editorial collage |
| `_preview/stage2/cta-desktop.png` / `-mobile.png` | **CTA** — pre-seeded OG-card composition (desktop + mobile) |

Mockup caveats (same class as Stage 1): EN/light renders only — EN+AR × light+dark implications are specced per section in §2; mobile renders are 474px wide (headless Chrome's minimum); all motion is described, not animated; capture *fragments* are eyeball-cropped via CSS `background-position` — the build crops the same regions properly (aspect-locked, `next/image`); the D-1/D-2 photo slots and the white-label phone render as branded placeholders per the PhotoPlaceholder convention (req: redesigns must not be shaped around stand-in captures).

---

## 1 · Audit — every section measured against the live hero standard

The hero block now opens the page at full temperature: photography, persona rails, chapter rails, a real composite with lightbox. Then the page falls off a cliff — from the Problem section to the Footer, every section still runs the Phase-1 pattern language. The three complaints, located precisely:

1. **One skeleton everywhere.** Problem = 2 cards in a grid · Features = tabs + screenshot card · HowItWorks = 3 cards in a grid · Segments = 3 cards in a grid · ClientApp = 3 phones in a row · Pricing = 3 cards in a grid · WhyWazen = 3 pillars + 2 cards + quote card · CTA = 2-column card. Six sections share the same "N things in a symmetric grid" skeleton.
2. **One screenshot presentation everywhere.** Every capture sits flat, full-frame, in a rounded box inside a card. The OG card and the product-proof section already prove the alternative (overlap, bleed, fragments) — no in-page section uses it.
3. **Flat backgrounds.** The dark sections (Problem, CTA) have depth (watermark, F-9); everything between them alternates `bg` ↔ mist with no beats.

### Verdicts

| # | Section | Verdict | One-line argument |
|---|---|---|---|
| 4 | Problem | **redesign** | The twin comparison cards are the same-skeleton offender #1, and the argument ("scattered vs one system") is *spatial* — chaos→calm is a composition, not two lists. |
| 5 | Features | **redesign** (tabs settled, D21) | Rail tabs are decided; but the panel is the page's biggest flat-screenshot surface ×5 — it must become a composed scene or the restyle is cosmetic. |
| 5b | Photo divider ① | **new** (carried from Stage 1 §4) | Features→HowItWorks is still ~3 viewports without people. |
| 7 | HowItWorks | **redesign** | Three identical cards with ghost numbers — the process is a *sequence*, and a timeline is the honest shape of a sequence. |
| 8 | Segments | **redesign** | Three identical photo-top cards; these are the hero's personas — they should echo the hero's photo-with-copy-on-it language, not a card grid. |
| 9 | ClientApp | **redesign** | Mist band + straight phone row is the flattest moment of the page's second half; it's also the natural home of the white-label story (new input, §4). |
| 10 | Pricing | **keep** | D6 fixes content; structurally it's the calm light palate-cleanser between two dark beats — sameness is a feature here. |
| 11 | WhyWazen | **redesign** | Four stacked symmetric blocks; the content (conviction + proof + founder) is editorial by nature and earns an editorial spread. |
| 12 | FAQ | **keep** | A text accordion is the correct shape for FAQ; any theatrics would fight the calm identity. |
| 13 | CTA | **redesign** (pre-seeded) | Owner-set direction: OG-card composition over the current backdrop; also kills the `MiniDashboard` skeleton-next-to-real-capture (D14 class). |
| 14 | Footer | **keep** | Quiet close; Binaa Labs line per D2. |

---

## 2 · Section-by-section redesign specs

Every spec below states: composition · capture/photo tags (req: every slot ends tagged **"keeps current"**, **"keeps current (fragment)"**, or **"new capture/photo"**) · motion on the three registers · EN/AR + light/dark · re-capture notes.

### 2.1 Problem — chaos → calm split (`problem-*.png`)

**Composition.** The twin cards die. One canvas, two halves: the start half is a *chaos field* — the four `oldWay` items rendered as scattered, slightly-rotated sticky-note cards (graphic treatment of existing copy; **not invented UI**) over F-2 at low opacity under the duotone; a dashed→solid sage connector converges them into the end half — the *calm zone*: **one real capture fragment** (the attention-queue region of the coach dashboard) in a sage-ringed frame, with the four `wazenWay` items as compact check rows beneath. The `oldWayHeading`/`wazenWayHeading` strings become the two zone labels. All copy verbatim from `t.problem`.

**Background depth.** F-2 duotone anchoring the chaos half (photo participates in the argument instead of decorating it) + radial sage glow behind the calm half + `GhostWordmark` stays. Three depth layers, all existing assets.

**Captures/photos.** Attention-queue fragment = **keeps current (fragment** — queue region of `coachDashboard`**)**. F-2 = keeps current photo (v2 swap still queued per D15). Mobile now *gains* people (F-2 was desktop-only; here the top of the band shows it behind the header).

**Motion.** Notes drift in at the copy register (0.5s `fadeUp` + their static rotations — transform-only, staggered 0.06); connector = `drawLine` (product register); queue fragment = `fadeUp` 0.7s; F-2 = `photoReveal`. Notes keyed by index (learning #1 — this section is the original crime scene). Reduced motion: everything opacity-only via `MotionConfig`, connector static.

**EN/AR · light/dark.** Pure logical-properties mirror — chaos start-side, calm end-side in both directions; connector arrow flips with `rtl:` rotation; notes' rotations are direction-neutral. Dark band identical in both themes (like today).

**Re-capture note.** The fragment crops the queue region (center-left of `Dashboard_Tab`); final re-capture should keep ≥2 fully-populated queue rows with clean names — already guaranteed by the D11 seed data.

### 2.2 Features — D21 rail tabs + composed scene (`features-tabs-desktop.png`)

**Tabs (settled input, D21 — mock shows it, not re-argued).** Pills → progress-underline tabs: text-only labels (the pill icons die with the pills — one less competing element; flag for sign-off), active = ink text + 3px sage rail; **the rail fill is the auto-advance timer** (mock shows tab 2 mid-dwell at ~55%); inactive = 38% ink + hairline rail. Auto-advance only while in view, stops on first interaction; keyboard/ARIA semantics exactly as built. Mobile keeps the same underline vocabulary in a scroll row. Open question for the checklist: dwell **6s** (hero-rail precedent, one page-wide rhythm) vs Stage-1's sketched ~8s.

**Panel (the redesign).** The flat screenshot-in-card + corner PiP dies. Per-tab composed scene: teal-mist gradient wash panel (rounded, offset toward the end side) · oversized ghost chapter number (01–05) behind · browser-framed story capture overlapping the wash's start edge · the client phone **breaking out of the wash's bottom edge** · two floating fragment chips cropped from **real** captures. Fragments rotate per tab to whatever tells that tab's story (content is free) — the mock shows the check-ins tab with the Analytics *76% Avg Adherence* tile and the client *Weight 82.7 kg* tile. Headline/body/caption strings unchanged from `t.features.tabs[i]`.

**Captures.** Panel captures ×5 = **keeps current** (per-tab story crops unchanged) · breakout phones ×5 = **keeps current** · fragment chips = **keeps current (fragment** — Analytics stat tiles, client progress tiles, roster compliance rows; exact crop list in §5**)**.

**Motion.** Tab rail = `railFill` (timer) · panel swap keeps the existing 0.3s crossfade-slide · fragments enter at the product register (0.6–0.7s `fadeUp`, staggered after the browser) · ghost number is static. Reduced motion: no auto-advance (D21), rails show set-state only, fragments opacity-only.

**EN/AR · light/dark.** Rails `origin-left rtl:origin-right` (`railFill` as built in the hero); wash offset and breakout flip logically; ghost numbers stay Latin digits (matches the app's digit convention, D12). Light section in both themes; wash uses `primary-light`/`sage-light` tokens which already have dark values.

**Re-capture note.** Fragment crops constrain nothing new — they're regions the full captures must contain anyway (stat tiles, queue rows). No change to the re-capture list beyond "keep those regions populated" (already true).

### 2.3 Photo divider ① — D-1 band (`divider-desktop.png`)

As Stage 1 proposed, now mocked: pure `<figure>`, ~33vh full-bleed band between Features and HowItWorks, D-1 photo (man resting between sets, phone in hand — brief already in PHASE2-PHOTO-SOURCING.md, **activated**, not new) under the shared duotone + scrim, one overlay line reused from existing copy (`t.features.tabs[1].caption`) with the sage rail accent. No new strings, no content section semantics. Motion: `photoReveal` only. RTL: text block mirrors; photo composition must keep its subject on one third (already in the D-1 brief). Renders as a branded placeholder until D-1 is sourced — **new photo: D-1** is the only asset this row needs.

### 2.4 HowItWorks — zigzag timeline (`howitworks-*.png`)

**Composition.** Cards die entirely. A vertical sage spine (the `drawLine` moment of the page) with numbered nodes; steps alternate sides; **each step's visual is presented as its own kind of object** — the anti-uniformity move inside the section:
- **01 Add your clients** → the invite capture *is* a modal, so it floats as one: frameless modal fragment, slight −2° tilt. **Keeps current (fragment** — modal region of `coachInvite`**)**.
- **02 Assign plans & check-ins** → the plan as the client receives it: tilted phone (+3.5°). **Keeps current** (`clientMobilePlans`). *Note:* the mock's deeper crop exposes the app's own "Powered by Binaa Labs" footer inside the capture — in the build, either keep the current 9/19 frame crop (hides it, as today) or scroll it out at re-capture; flagged in §5.
- **03 Track progress** → frameless wide chart strip (−1.5°): the Analytics adherence-trend region. **Keeps current (fragment** — chart region of `coachAnalytics`**)**.

All copy verbatim from `t.how`. No containers, no ghost numbers (they move to Features), no icon bubbles.

**Motion.** Spine = `drawLine` top→bottom as the section scrolls into view (scaleY, `origin-top`); nodes pop at the copy register; visuals settle at the product register (0.7s, opacity + small translate — rotations are static CSS, not animated). Reduced motion: spine static, everything opacity-only.

**EN/AR · light/dark.** Zigzag mirrors logically (odd/even sides flip under RTL automatically via the grid's logical columns); spine is center-axis so direction-neutral; Latin digits in nodes. Light in both themes; visual shadows use tokens.

**Mobile (decision surface — see the render).** Spine moves to the start edge; each step = node + title beside it, visual below; same object treatments at reduced scale.

### 2.5 Segments — persona mosaic (`segments-*.png`)

**Composition.** The three photo-top cards die. An asymmetric mosaic of duotone photo panels with the copy **on** the photo over a bottom scrim — deliberately the *mini-hero echo*: these are the same three personas as the hero slider (labels verbatim-match by construction — both read `t.segments.cards[i].title`), so they get the hero's visual language (photo + scrim + sage rail + label), scaled down. Fitness = large panel (its photo is strongest); nutrition + health stack beside it. Copy verbatim.

**Captures/photos.** F-3 / F-5 / F-6 = **keeps current** (D15 v2 concerns — F-5 edge hand, F-6 background poster — remain queued for the photo-v2 swap, unchanged by this redesign).

**Motion.** Panels `photoReveal`-stagger in (photography register, 0.9s, stagger 0.12); hover = slow scale 1.03 of the *image inside the fixed frame* (transform-only, no layout) + shadow lift. Reduced motion: opacity-only, no hover scale.

**EN/AR · light/dark.** Mosaic template mirrors via logical grid placement; copy blocks use logical padding; scrims are horizontal-symmetric per-panel (bottom-anchored, direction-neutral). Panels are self-dark (photo + scrim) — identical in both themes; only the section's `bg` swaps.

**Mobile (decision surface).** Panels stack full-width (fitness 300px, others 240px) — see render.

### 2.6 ClientApp — cinematic dark band + the white-label story (`clientapp-desktop.png`)

**Composition.** The teal-mist band becomes the page's **mid-point dark beat** (`primary-dark` → `primary-darker` gradient): D-2 photo (man at home post-workout, phone in hand — brief already in the sourcing plan, **activated**) as a low-opacity duotone backdrop behind three phones; outer phones angle ±4°, center raised. **The third phone becomes the white-label story**: a client-app capture carrying a fictional demo coach's own branding — a real, shipping product capability (in-app logo, name, theme). Until that capture exists it renders as a **NEW CAPTURE** placeholder (see render). Its caption carries the white-label claim (wording on the checklist, §4). Existing copy (`t.clientApp`) unchanged; `phones[]` captions adjust: the third caption becomes the approved claim string (new i18n key), the "Progress" phone story moves into the first two slots' rotation if the owner prefers keeping all three current captions + a 4th phone is explicitly **not** proposed (row stays 3-wide).

**Captures/photos.** Phone 1 (`clientMobileCheckin`) + phone 2 (`clientMobileHome`) = **keeps current** · phone 3 = **new capture: client Home with demo-coach branding applied in-app (fictional coach — never named as real, no quote)** · backdrop = **new photo: D-2** (activated brief). PWA chip verbatim (D8).

**Motion.** Phones enter staggered at the product register, then idle on **`phoneFloat`** (±4px translateY, 6s ease-in-out infinite alternate, 0.8s stagger — the page's only loop besides rail timers); backdrop `photoReveal` once. Reduced motion: float off, entrances opacity-only.

**EN/AR · light/dark.** Row order flips logically; angles are direction-neutral (±4 both sides); captions logical-aligned. Dark band identical both themes (same as Problem/CTA precedent).

### 2.7 Pricing — keep

Untouched (D6). The section's symmetric-card sameness is the deliberate calm between the ClientApp dark beat and the WhyWazen editorial spread. One nit ships with whatever pass touches this area: the shared section-header rhythm (eyebrow/h2/lead spacing) — no visual redesign.

### 2.8 WhyWazen — editorial collage (`whywazen-desktop.png`)

**Composition.** Four stacked symmetric blocks become one two-column editorial spread. Start column = the narrative: header + **numbered pillars** (01/02/03 in Fraunces italic sage — the hero's serif accent recurring exactly once more on the page; **AR = Tajawal 800 in sage, no italic, per D18**) + the bilingual badge. End column = layered collage: F-7 duotone panel behind · coach-profile browser frame overlapping it · founder pull-quote card (sage `border-inline-start`, Fraunces-italic quote, "NS" avatar until F-11) overlapping the frame's bottom corner. The profile caption sits as a small annotation at the collage's bottom-start. All copy verbatim from `t.why`.

**Captures/photos.** Profile frame = **keeps current** (`coachProfile`; the quote card overlaps its stat row — full capture stays one lightbox-click away, as built) · F-7 = **keeps current** — and this section is where the *F-7 double-exposure* is visible today (same photo is the hero stand-in until Pass 2.3); resolved when the AI hero personas land (D22), no action here.

**Motion.** Pillars stagger at the copy register; collage layers enter back-to-front (photo `photoReveal` → frame 0.7s → quote 0.5s, sequenced delays) — the one place layering is *choreographed*. Reduced motion: all opacity-only, no sequence delays.

**EN/AR · light/dark.** Grid + collage insets fully logical (`inset-inline-*`); quote border flips; Fraunces never renders on AR (live language state conditional, as the hero already does per D18). Light both themes.

### 2.9 CTA — pre-seeded OG-card composition (`cta-*.png`)

**Composition (owner pre-seed, mocked, not re-argued).** Backdrop unchanged: `primary-dark` + F-9 at 12% + `GhostWordmark`. The white card + `MiniDashboard` decorative skeleton die (closing the last D14-class surface). Start side: badge → h2 → body → the four `t.cta.trust` checkmark rows (2×2) → **sage CTA pill** (`Start free — up to 5 clients` / `ابدأ مجانًا — حتى 5 عملاء`, D19 dark-surface styling) → `Already using Wazen? Log in` line. End side: real `coachDashboard` in a BrowserFrame + real `clientMobileCheckin` phone overlapping its start-bottom corner, the whole composite **bleeding off the end edge** (clipped by the section's `overflow-hidden`). `cardTitle`/`cardSub` strings are retired by this composition (dictionary keys removed in the implementation pass — their content is covered by the trust rows).

**Captures.** Dashboard = **keeps current** (top crop — the same crop the OG card ships) · phone = **keeps current**. **Re-capture note:** the composition reads the dashboard as a *top* crop, so the final re-capture keeps the stat tiles + attention queue in the upper region clean (already true of the current capture).

**Motion.** Copy column at the copy register; composite enters at the product register (0.7s fadeUp + settle); backdrop static (texture, not subject — D15 intent preserved). Reduced motion: opacity-only.

**EN/AR · light/dark.** Mock is EN/LTR; under RTL the whole grid mirrors — copy right, composite bleeding off the *left* (= end) edge via `margin-inline-end`; ghost wordmark is already Arabic. Dark both themes. **Mobile (see render):** copy stack → full-width CTA → centered login line → composite below at reduced scale, still bleeding off the end edge.

### 2.10 FAQ · Footer — keep

FAQ: text accordion untouched. Footer: untouched (D2).

---

## 3 · Motion choreography — additions on the three registers

Rules preserved: transform/opacity only · `MotionConfig reducedMotion="user"` global · nothing keyed by translated strings (learning #1) · no remounting children under `once` parents. Registers: **copy 0.5s · product 0.6–0.9s · photography 0.9s+**.

| Pattern | Used by | Spec | Reduced-motion |
|---|---|---|---|
| `photoReveal` (approved, unbuilt) | Segments panels · divider · ClientApp backdrop · Problem F-2 | scale 1.08→1 + opacity, 0.9s | opacity only (global) |
| `drawLine` (approved, unbuilt) | HowItWorks spine · Problem connector | scaleX/scaleY from `inline-start`/top, 0.8s | static line |
| `phoneFloat` (approved, unbuilt) | ClientApp phones | translateY ±4px, 6s ease-in-out infinite alternate, stagger 0.8s | off |
| `railFill` (existing) | Features tab timer | scaleX 0→1 over dwell, `origin-left rtl:origin-right`; exactly-one-rail rule as re-specced for the hero | set-state rails, no auto-advance |
| `fadeUp`/`staggerContainer`/`scaleIn` (existing) | everything else | unchanged — default register for copy/cards/frames | as today |
| *(sequenced entrance — not a new variant)* | WhyWazen collage | existing variants with stepped `delay`s, back-to-front | opacity only, no delays |

`parallaxDrift` stays in the vocabulary but is **not** assigned in this stage (the CTA backdrop stays static texture per the pre-seed; adding parallax there is a possible 2.3 flourish, not proposed now). Nothing new bounces; the only loops remain `phoneFloat` + rail timers.

---

## 4 · White-label claim (new input — wording for owner approval)

**Truth boundary (owner-stated):** coaches can apply their own branding (logo, name, theme) inside the app **today**; custom URLs and branded emails come later. Composites may show in-app branding as real via a **fictional demo coach**; nothing may imply custom domains, branded emails, or a standalone branded app (no app-store scene — D8 also forbids it). Never caption the fictional coach as a real customer (no-fabricated-proof rule). The Pricing page needs **no change**: Premium already lists "Basic branding customization" and its "Full white-label branding — coming soon" note remains accurate for the *full* (URL/email) tier (D6 untouched).

Where it lives: the ClientApp third phone + its caption (§2.6). Draft wordings (EN + AR), one to approve or edit:

- **Option A (used in the mock):** EN "**Your brand, front and center** — clients see your logo, name, and colors in their app." · AR "**علامتك في الواجهة** — يرى عملاؤك شعارك واسمك وألوانك داخل تطبيقهم."
- **Option B (tighter, capability-first):** EN "**The app carries your branding** — your logo, your name, your theme." · AR "**التطبيق يحمل هويتك** — شعارك واسمك وألوانك."

Approval of a wording **supersedes** the PROJECT.md guardrail "white-label is 'coming soon' — never shown as available" with the partial-now/full-later state, recorded as a D-row in the implementation commit.

---

## 5 · Asset flags + the re-capture list (req 8/9 ledger)

**Photo slots** — no new briefs invented; two existing briefs *activated*: **D-1** (divider) and **D-2** (ClientApp backdrop), both already specced in PHASE2-PHOTO-SOURCING.md (stock-first routes exist there). Survivors keep current: F-2 (Problem, recomposed role), F-3/F-5/F-6 (Segments mosaic; D15 v2 concerns still queued), F-7 (WhyWazen; hero double-exposure resolves in 2.3), F-9 (CTA backdrop, per pre-seed). F-11 founder portrait unchanged/pending.

**Every screenshot slot in this proposal, tagged:**

| Slot | Tag |
|---|---|
| CTA dashboard (browser, top crop) | keeps current — re-capture keeps stat tiles + attention queue clean in the upper region |
| CTA phone (`clientMobileCheckin`) | keeps current |
| Features panel captures ×5 | keeps current |
| Features breakout phones ×5 | keeps current |
| Features fragment chips | keeps current (fragment) — crops: Analytics stat tiles (`coachAnalytics`), client metric tiles (`clientProgress`), roster compliance rows (`coachClients`); re-capture must keep these regions populated (already guaranteed by D11 seed) |
| Problem calm fragment | keeps current (fragment) — attention-queue region of `coachDashboard`, ≥2 clean rows |
| HowItWorks 01 invite modal | keeps current (fragment) — modal region of `coachInvite` |
| HowItWorks 02 plan phone | keeps current — **note:** a deeper-than-9/19 crop exposes the in-app "Powered by Binaa Labs" footer in `clientMobilePlans`; build keeps the current 9/19 frame crop, or the re-capture scrolls the footer out (owner call, checklist #12) |
| HowItWorks 03 chart strip | keeps current (fragment) — adherence-trend region of `coachAnalytics` |
| WhyWazen profile frame | keeps current (`coachProfile`) |
| ClientApp phones 1–2 (`clientMobileCheckin`, `clientMobileHome`) | keeps current |
| ClientApp phone 3 | **new capture:** client Home with a demo coach's branding applied in-app (fictional coach; captured after the branding capability is styled with demo assets) |

---

## 6 · Anti-uniformity guard (so the fix doesn't become the new uniform)

| Device/mechanic | Appears in | Nowhere else |
|---|---|---|
| Floating fragment chips | Features only | Problem's single fragment is the composition's destination, not a chip family |
| Ghost chapter numbers | Features only | HowItWorks numbers are spine nodes, not backdrops |
| Scattered/rotated cards | Problem only | HowItWorks tilts are ±2–4° on *visuals*, not copy cards |
| Copy-on-photo panels | Segments only (mini-hero echo) | divider's overlay is one line, not a copy block |
| Angled devices | ClientApp + HowItWorks (one phone each context) | Features/CTA devices stay square |
| Off-edge bleed | CTA only | Features breakout crosses a *wash* edge, not the viewport |
| Watermark | Problem + CTA (as today) | — |
| Photography backdrops | Problem (F-2) · ClientApp (D-2) · divider (D-1) | each at a different opacity/role: argument / backdrop / subject |
| Editorial serif accents | WhyWazen only (echoing the hero) | — |

Adjacency check (final flow): Problem (chaos split, dark) → Features (rail tabs + scene, light) → divider (photo band) → HowItWorks (timeline, light) → Segments (photo mosaic, light) → ClientApp (cinematic dark) → Pricing (kept cards, light) → WhyWazen (editorial collage, light) → FAQ (accordion) → CTA (bleed composite, dark) → Footer. No two adjacent sections share a skeleton, a screenshot presentation, or a background treatment. People-interleave: F-2 → (product ×5) → D-1 → (timeline) → F-3/5/6 → D-2 → (pricing/why/faq: profile + F-7) → CTA. Longest people-free run remains Pricing→FAQ (calm zone before the close), as accepted in Stage 1.

---

## 7 · Hard-constraint compliance

| Constraint | Status in this proposal |
|---|---|
| **D7 — no women in any imagery** | No new imagery added as pixels: D-1/D-2/white-label render as placeholders; their briefs are male-only including backgrounds (sourcing-plan vetting checklist applies). Survivor photos are the shipped, owner-accepted set. |
| **No AI badges / AI feature claims** | None anywhere — copy is verbatim existing strings + the two white-label drafts (§4), which claim only shipping capability. |
| **No email-capture CTA · CTA microcopy unchanged** | CTA labels, login prompt/link, badge, h2, body, trust rows verbatim from `lib/i18n.ts` (§2.9). `cardTitle`/`cardSub` retire with the card *composition* — no wording changes anywhere. |
| **PWA framing (D8) — no app-store anything** | "Installs like an app — no App Store needed" chip verbatim; the white-label story is explicitly in-app branding, no store listing scene (§4). |
| **No fabricated stats/testimonials/social proof** | All numbers in fragments come from real captures of D11 seed data; the demo coach is never named as a customer, quoted, or given a testimonial slot. |
| **Binaa Labs (D2)** | Footer/FAQ placements untouched; the one incidental appearance (app's own footer inside `clientMobilePlans`) is flagged with a crop/re-capture resolution (§5). |
| **Pricing (D6)** | Section kept; §4 confirms no pricing-copy change. |
| **EN + AR (RTL) · light + dark** | Specced per section (§2): logical properties everywhere, `origin-left rtl:origin-right` rails, index keys, Latin digits, D18 serif rule on AR, dark bands theme-invariant. |
| **Wazen palette / calm identity** | Every mock is built on the `globals.css` token mirror; nothing bounces; the only loops are phoneFloat + rail timers. |

---

## 8 · Where this lands in the pass plan

On sign-off these specs become the section-by-section implementation prompts: the motion/tab work maps onto **Pass 2.2** (tabs + scenes + timelines + collage + CTA recomposition + dark ClientApp — all buildable against current assets/placeholders), and the asset-dependent pieces map onto **Pass 2.3** (D-1/D-2 photos, white-label capture, hero persona photos, real video). Acceptance gates from Stage 1 §8 carry over unchanged (reduced-motion walkthrough, remount test, 60fps scroll, Lighthouse SEO 100 both locales, 32-shot matrix).

---

## 9 · Owner decision checklist (all answers required before implementation)

Each item: the question, then **the recommendation + why**.

1. **Problem chaos→calm split** (`problem-desktop.png`) — approve the composition? **Recommend yes** — it's the strongest possible use of the section's existing copy: the argument becomes spatial, the photo gets a job, and the twin-card skeleton dies where it's most visible.
2. **Problem mobile stack** (`problem-mobile.png`) — approve chaos-above/calm-below with the down-connector? **Recommend yes** — mobile finally gets people in this section, and the converge-downward reading matches scroll direction.
3. **Features composed scene** (`features-tabs-desktop.png`) — approve the wash + ghost number + fragments + breakout phone panel (rail tabs themselves are settled, D21)? **Recommend yes** — the ×5 flat screenshot surface is the page's biggest craft gap; fragments are real-capture crops so nothing is invented. Includes: **pill icons die with the pills** (text-only tab labels).
4. **Features dwell** — unify the tab auto-advance at **6s** (hero-rail precedent; one rhythm page-wide) or Stage-1's sketched 8s? **Recommend 6s.**
5. **Photo divider ①** (`divider-desktop.png`) — ship the D-1 band (activates the D-1 brief; F-4-era stand-in acceptable until sourced)? **Recommend yes** — cheapest fix for the longest people-free run.
6. **HowItWorks zigzag** (`howitworks-desktop.png` + `-mobile.png`) — approve the timeline + three distinct visual objects, desktop and mobile collapse? **Recommend yes** — a sequence shaped like a sequence, and the section stops competing with Segments' grid.
7. **Segments persona mosaic** (`segments-desktop.png` + `-mobile.png`) — approve copy-on-photo panels (mini-hero echo) + the asymmetric split + mobile stacking? **Recommend yes** — it makes the hero↔segments persona rhyme visible instead of coincidental.
8. **ClientApp cinematic dark band** (`clientapp-desktop.png`) — approve going dark + D-2 backdrop (activates the brief) + angled floating phones? **Recommend yes** — the page's second half needs its dark beat, and phones read dramatically better on dark.
9. **White-label story on the third phone** — approve showcasing in-app branding as real, and pick the claim wording: **Option A / Option B / edit** (§4). **Recommend Option A** — benefit-first, and its scope ("in their app") self-limits the claim to the truth boundary. Answer becomes the D-row superseding the stale "coming soon" guardrail.
10. **WhyWazen editorial collage** (`whywazen-desktop.png`) — approve the numbered-pillar narrative + layered proof collage (quote card intentionally overlaps the profile frame's stat row; full capture stays one lightbox-click away)? **Recommend yes** — highest-craft treatment for the page's conviction moment, and the serif accent gets its one echo.
11. **CTA recomposition** (`cta-desktop.png` + `-mobile.png`) — pre-seeded direction: confirm the mock executes it (composite bleed amount, phone position, 2×2 trust rows, mobile order), and confirm retiring the now-unused `cardTitle`/`cardSub` strings. **Recommend approve as mocked.**
12. **HowItWorks plan-phone footer** — the deeper crop exposes the in-app "Powered by Binaa Labs" footer (§5): keep the current 9/19 frame crop (hides it, zero work) or scroll it out at re-capture? **Recommend keep 9/19 crop** — zero work, D2-clean.
13. **Re-capture list** (§5) — confirm the ledger (all "keeps current"/fragment notes + the one new white-label capture) so the final-pass re-capture session has a fixed shopping list. **Recommend confirm.**
14. **Keep tier** — confirm Pricing, FAQ, Footer stay untouched. **Recommend confirm** — Pricing is the palate cleanser (D6), FAQ's accordion is the right shape, Footer is a quiet close.

---

*Prepared on `feat/phase-2-design` · sources: PROJECT.md (decisions/learnings through D25), PHASE2-DESIGN.md (Stage 1), PHASE2-PHOTO-SOURCING.md, live component tree audit, everfit.io mechanics review. On sign-off: answers recorded as D-rows in PROJECT.md in the first implementation commit.*
