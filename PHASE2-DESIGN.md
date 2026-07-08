# Phase 2 — Design Direction & Audit (PROPOSAL — awaiting owner sign-off)

> **Status: proposal only. Zero code changes in this pass.** Branch `feat/phase-2-design` contains exactly this document + rendered mockups in `_preview/phase2/`. Implementation starts only after the decision checklist (§10) is answered.
>
> **Driving goal:** when a coach opens wazen.fit, it should *feel* like a coaching platform within 3 seconds the way everfit.io does — photography-led, cinematic, motion-rich — while keeping Wazen's calm/premium identity (teal/sage, editorial serif accents) rather than cloning Everfit's surface.

---

## 0 · How to review

Rendered mockups (open the PNGs, or open the `.html` files in a browser from inside the repo — they reference real repo assets by relative path):

| File | What it shows |
|---|---|
| `_preview/phase2/hero-option-a-desktop.png` / `-mobile.png` | **Hero Option A** — full photography-led hero; product composite relocated to a section below |
| `_preview/phase2/hero-option-b-desktop.png` / `-mobile.png` | **Hero Option B** — hybrid; photo band + composite retained as the hero's second beat |
| `_preview/phase2/video-section-desktop.png` | **Product video section** — 4 chapter cards with playback-synced progress bars |

Mockup caveats: hero photo is a **stand-in** (F-7, the shipped WhyWazen photo) until the H-series shots are sourced; persona slider and progress bars are static renders of animated mechanics; mobile renders are 474px wide (headless Chrome's minimum window — real breakpoint work happens in implementation); mockups are EN/light only — EN+AR × light+dark implications are specced per section below.

---

## 1 · Audit — why the page reads "restrained" today

Phase 1 fixed correctness (real captures, real photos, honest proof, working CTAs). What it did **not** change is the page's *temperature*. Compared against everfit.io:

1. **The first viewport is a light, neutral, product-first composite.** Correct, but it opens like documentation: badge → headline → sub → buttons → screenshot. Everfit opens with a *person* — full-bleed imagery with the pitch sitting on it. Our photography starts only at the Problem section (F-2), below the fold.
2. **People disappear for long stretches.** Features (5 tabs) → HowItWorks → is ~3 viewports of pure UI chrome. Everfit never lets people be absent for more than ~1 viewport.
3. **One-note motion.** Everything reveals with the same 0.5s `fadeUp`. There is no slow/cinematic register (Ken Burns, progress fills, synced playback) that signals "crafted."
4. **No product-in-motion.** Everfit's video-with-chapters shows the product *doing things*; our page is all stills.
5. **Tabs read as buttons, not as a story index.** The Features pills are functional; Everfit's progress-underline tabs feel like chapters of a narrative.
6. **The final CTA is dark but flat.** F-9 at 12% opacity reads as texture (by design, D15); Everfit's closer is a cinematic full-bleed moment.

**Everfit mechanics we adapt (mechanics, not skin):** photography-led hero with persona rotation · product video with 4 playback-synced chapter cards · progress-underline feature tabs · photography interleaved so people recur every ~viewport · dark cinematic final CTA. **Everfit surface we explicitly do NOT copy:** "AI POWERED" badges (Wazen has no AI features), 30-day-trial email-capture CTA (ours stays "Start free — up to 5 clients"), fabricated-feeling stat testimonials (we have none and fake none, per standing constraint), their blue/black branding.

---

## 2 · Deliverable 1 — HERO (two options, owner picks)

### Shared foundation (both options)

- **Photography treatment:** full-bleed photo, **teal duotone cast** (`mix-blend-mode: color` layer of `hsla(186,40%,20%,.30)`) + gradient scrim toward `hsl(186 21% 8–14%)` so any sourced photo sits in brand and text stays AAA-contrast. This is what keeps it "Wazen calm" instead of "stock gym."
- **Persona slider (Everfit mechanic, Wazen skin):** three personas — Fitness coaches / Nutrition coaches / Health practitioners (mirrors the Segments band, D3). Uppercase labels with a 2px rail; the active label's rail **fills sage over ~6s**, then advances to the next persona and crossfades the photo. Labels are clickable. Only the photo + active label change — **headline/copy stay constant** (unlike Everfit, which swaps the headline; keeping copy static avoids i18n churn and layout shift).
- **Editorial serif accent:** the underlined phrase of the H1 ("one calm, organized place") set in an italic editorial serif (mockups use **Fraunces**; final face is decision #2) in pale sage — this replaces Phase 1's wavy underline as the hero's signature. **Arabic has no italic serif:** on `/ar` the same phrase gets an Arabic display treatment instead (options in decision #2) — never a fake-slanted Tajawal.
- **CTA on dark:** primary button flips from deep-teal-on-light to **sage bg + darkest-teal text** (mockups) or white bg (decision #3). Label unchanged: "Start free — up to 5 clients". Secondary stays ghost.
- **Nav over photo:** transparent nav with white wordmark + glassy "Start free" pill; gains a solid `bg` + shadow after ~80px scroll. Requires an on-dark logo colorway (see §8).
- **i18n/RTL:** all positioning via logical properties; persona rail fills from `inline-start`; slides keyed by **index, never by translated label** (PROJECT.md learning #1); AR uses the same photos (no embedded text).
- **Reduced motion:** no auto-rotation — persona 1's photo shows statically, labels become plain manual tabs, no Ken Burns.
- **Mobile:** persona labels wrap (they must never widen the layout viewport — same failure class as PROJECT.md learning #5), CTAs stack full-width, photo crop shifts to keep the subject's head (`object-position` per shot, as done for F-7 in C.2b).

### Option A — full photography-led hero (`hero-option-a-*.png`)

The hero is pure cinema: photo + persona slider + left-aligned copy block, no product UI. The dashboard+phone composite **relocates to a new "product proof" section immediately below** (eyebrow "The coach dashboard" / H2 "Your whole practice, one screen" — the only net-new copy Phase 2 Option A needs), where it keeps its annotation chips, lightbox, glow, and parallax.

- **Photography required:** 3 shots (H-1/H-2/H-3, briefs in §6) — one per persona. Can launch with 1 shot + slider disabled (decision #4).
- **Motion:** active photo runs a slow Ken Burns (`scale 1.06 → 1` over the 6s dwell, transform-only); persona change = 0.6s opacity crossfade between absolutely-stacked slides; copy block staggers in once on load and never re-animates.
- **EN/AR:** copy block is start-aligned (left in EN, right in AR — pure logical-properties flip). Scrim is symmetric so both directions work over the same photo.
- **LCP:** the hero photo becomes the LCP element. Budget: ≤ 180 KB at 1920w WebP, `preload` on the *first* slide only, slides 2–3 lazy. This is *lighter* than today's hero (the 2560×1600 dashboard PNG moves below the fold and lazy-loads).
- **Trade-offs:** ✚ strongest possible 3-second category signal; cleanest layout; best LCP. ✖ product proof drops below the fold (mitigated: composite is the very next thing, and the persona slider itself names the audience); 3 new photos to source before it sings (heaviest sourcing burden); the relocated-composite section adds ~1 section of page length.

### Option B — hybrid (`hero-option-b-*.png`)

One hero, two beats: the same photo band + persona slider + centered copy, with the **existing composite retained inside the hero**, cresting up into the photo (browser frame starts on the photo, finishes on the light background below — the seam between cinema and product).

- **Photography required:** same 3 shots (can also launch with 1).
- **Motion:** as Option A, plus the composite's existing entrance (rotateX settle + parallax) unchanged.
- **EN/AR:** centered copy — even less directional work than A.
- **LCP:** photo *and* dashboard capture are both in/near the first viewport → both need eager treatment. Heaviest variant (~photo 180 KB + dashboard ~90–130 KB at mobile/desktop srcsets). Needs careful `sizes`/`preload` tuning (we know this exact failure mode from D16).
- **Trade-offs:** ✚ keeps Phase 1's product-proof investment in the first impression — emotional *and* literal answer in one scroll; no new section needed. ✖ tall hero (~1.6 viewports before the trust bar); two focal systems compete (photo vs screenshot); heavier LCP; the photo functions mostly as backdrop, so the cinematic effect is diluted.

### Recommendation

**Option A.** The Phase 2 goal is *feel* — Option A commits to it, and the product proof lands one scroll later at full width (bigger than it renders inside Option B's hero). Option B is the safe compromise but keeps the page's temperature closer to Phase 1. Everfit itself is an Option-A pattern: imagery first, product below.

---

## 3 · Deliverable 2 — PRODUCT VIDEO SECTION (`video-section-desktop.png`)

**Position:** immediately after the hero block (Everfit's placement). Concretely — Option A: Hero → **Video** → Product-proof composite → TrustBar → … Option B: Hero (incl. composite) → **Video** → TrustBar → … The video answers "show me it working" at the exact moment the hero raised it. (Alternative placement, decision #6: after Features, as a recap.)

**Layout:** dark teal band (`primary-dark`, same family as ClientApp/CTA so dark sections rhythm across the page). Eyebrow "See it in action" / H2 "Two minutes inside Wazen" / one-line lead. 16:9 stage, `radius-card`, deep shadow; sage circular play button; duration chip. Below: **4 chapter cards** in a grid (2×2 on mobile):

| # | Chapter | maps to |
|---|---|---|
| 01 | Clients & check-ins | Features tabs 1–2 |
| 02 | Plans that clients follow | tab 4 |
| 03 | Progress you can see | tab 3 |
| 04 | Messaging, in one place | tab 5 |

Each card: number, title, start timestamp, 3px progress rail. **The rails fill in sync with playback** — the mini feature index mechanic.

**Implementation spec (for Pass 2.1):**
- Plain `<video>` (self-hosted MP4/WebM on Vercel, poster attr, `preload="none"`, never autoplay with sound; captions track EN+AR).
- One `timeupdate` listener → derive per-chapter progress from a `CHAPTERS = [{start: 0}, {start: 34}, …]` const (timestamps are structural data, titles live in `lib/i18n.ts`; index-coupled like every other section).
- Progress fill = `transform: scaleX(p)` with `transform-origin: inline-start` (RTL-correct, transform-only). Completed chapters hold a dimmed full rail; current card gets elevated bg + sage border.
- Chapter click/Enter = `video.currentTime = start; video.play()`. Cards are `<button>`s in a labelled group; active card `aria-current="true"`.
- **Reduced motion:** no scroll-triggered anything; video only plays on explicit tap (already the default); rail updates are playback state, not decoration — they stay, but with `transition: none`.
- **EN/AR:** section fully mirrors under RTL (logical properties only); Latin digits for timestamps in both locales (matches the app's convention, D12); one video asset shared if the recording's UI language is minimal/neutral, or per-locale capture later — the component reads the src from a locale map like `lib/screenshots.ts` either way.
- **Placeholder strategy until the real video exists (it's a post-launch backlog item today):** ship the full section with the poster (real capture composite or C-1 photo), real chapter titles, dummy timestamps, and play → gentle "tour coming soon" toast **only if** owner wants the section visible pre-video; otherwise the component ships behind a flag, section hidden until the asset lands (decision #5). Recommendation: **hidden until real** — a dead play button undermines the premium read.

---

## 4 · Deliverable 3 — Section-by-section direction

Proposed page flow (Option A shown; Option B = delete row 2b, composite stays in row 1):

| # | Section | Change | Treatment |
|---|---|---|---|
| 1 | Nav | **restyle** | Transparent over hero photo (white logo colorway, glass CTA pill); solid `bg` + `shadow-sm` after scroll. Existing language/theme toggles unchanged. |
| 2 | Hero | **rebuild** | Option A or B per decision #1 (§2). |
| 2b | Product proof *(Option A only)* | **new (hero-required)** | The relocated composite: browser frame + phone + chips + lightbox + parallax, full `max-w` width, light bg. |
| 3 | Video | **new** | §3. Dark band. Hidden behind flag until the asset exists (per decision #5). |
| 4 | TrustBar | **keep, restyle** | Same honest claims; visually attach it to the section above as a quiet strip (smaller, single row, hairline separators) so it reads as a footnote to the proof, not a section. |
| 5 | Problem | **keep** | Copy/cards unchanged. F-2 photo gets the shared duotone treatment + `photoReveal` motion (§7) so hero and interleave photos read as one family. Mobile (where F-2 is hidden today) gets a slim F-2 band above the cards instead of no people. |
| 6 | Features | **restyle (tabs)** | Everfit mechanic: pills → **progress-underline tabs**. Active: ink text + sage rail that fills; inactive: ghosted 60%. Auto-advance ~8s *only while the section is in view and until first interaction* (decision #7); rail fill doubles as the auto-advance timer. Keyboard/ARIA semantics stay exactly as built. Panel content, captures, PiP phones unchanged. Mobile keeps horizontal scroll with the same underline (pills die everywhere, one vocabulary). |
| 7 | Photo divider ① | **new visual treatment** (not a content section) | Between Features and HowItWorks: full-bleed 33vh photo band (D-1 brief, §6), duotone + one-line overlay quote from existing copy (e.g. the features caption). Restores people after ~3 UI viewports. Pure `<figure>`, no new copy. |
| 8 | HowItWorks | **keep** | Add `drawLine` connector animation between steps (§7). Nothing else. |
| 9 | Segments | **keep, polish** | Photos get duotone-on-hover-lift (scale 1.03) + card raise; already the persona echo of the hero slider — labels should match the hero persona labels verbatim. |
| 10 | ClientApp | **keep, restyle** | Already dark — upgrade to cinematic: D-2 photo (§6) as low-opacity backdrop *behind* the three phones (like CTA's F-9 but composed), phones get a slow stagger-float idle loop (±4px translateY, disabled under reduced motion). PWA chip unchanged (D8). |
| 11 | Pricing | **keep** | Untouched except shared section-header rhythm. The calm light-mist moment between two dark/photo passages is the palate cleanser. |
| 12 | WhyWazen | **keep** | F-7 stays here **unless** promoted to hero H-1 (decision #9), in which case the W-1 replacement shot (§6) takes this slot. Founder quote keeps the "NS" avatar until F-11 exists. |
| 13 | FAQ | **keep** | Untouched. |
| 14 | CTA | **restyle (cinematic)** | Everfit closer, Wazen skin: C-1 photo (§6) full-bleed at ~35–45% under a heavy teal scrim (up from F-9's 12% texture — the photo becomes *legible* as a moment, not wallpaper), same copy/card/composite, plus `scaleIn` on the backdrop. If C-1 isn't sourced, F-9 stays at 12% (graceful fallback). |
| 15 | Footer | **keep** | Untouched (Binaa Labs line per D2). |

**Interleaving check (people every ~viewport):** photo hero → *(video: product)* → proof composite → problem F-2 → *(features: product ×5 tabs)* → **divider ①** → how-it-works → segments F-3/5/6 → client-app D-2 backdrop → pricing (1 light viewport) → whywazen photo → faq → CTA C-1. Longest people-free run: Pricing + FAQ — acceptable calm-zone before the cinematic close.

---

## 5 · Deliverable 5 — Motion choreography

Additions to `components/motion.ts` (names indicative). **Rules preserved: transform/opacity only · `MotionConfig reducedMotion="user"` stays global · no motion element keyed by a translated string (learning #1) · `once`-revealed parents never get remounting children.**

| Pattern | Spec | Reduced-motion fallback |
|---|---|---|
| `kenBurns` | hero photo `scale 1.06 → 1` over persona dwell (6s), linear | static frame |
| `crossfade` | persona slide swap, opacity 0→1 0.6s, slides absolutely stacked, keyed by index | instant swap on manual click |
| `railFill` | persona/tab/chapter rails: `scaleX 0→1`, `transform-origin: inline-start` | rail shows full/empty state, no transition |
| `photoReveal` | interleave photos: `scale 1.08→1` + opacity, 0.9s (slower sibling of existing `scaleIn` — photography reads slower than UI) | opacity only (Framer handles via MotionConfig) |
| `drawLine` | HowItWorks connectors: `scaleX/scaleY` from start (not SVG dash — keeps transform-only rule) | static line |
| `phoneFloat` | ClientApp idle: `translateY ±4px`, 6s ease-in-out infinite alternate, staggered 0.8s per phone | off |
| `parallaxDrift` | existing hero parallax vocabulary reused on proof composite + CTA backdrop (±40px via `useScroll`) | off (Framer disables) |
| existing `fadeUp` / `staggerContainer` / `scaleIn` | unchanged — remain the default register for copy/cards | as today |

Choreography principle: **copy moves fast (0.5s), product frames move medium (0.6–0.9s), photography moves slow (0.9s+/6s)** — three registers instead of one, which is the actual "motion-rich" upgrade; nothing bounces, nothing loops except `phoneFloat` and rail timers.

---

## 6 · Deliverable 4 — Photo brief list v2

Supersedes the D15 set's future (D15 stock stays live until each slot's v2 arrives). Global rules unchanged: **no women anywhere in frame (D7)** — every brief below is male-subject and must be re-verified visually including backgrounds · no third-party logos · muted/desaturated grading (the duotone layer does the rest) · Gulf-plausible subjects/settings · Unsplash/Pexels license or own shoot.

| ID | Slot | Brief | Crop/aspect | Light+dark | D7 note |
|---|---|---|---|---|---|
| **H-1** | Hero — Fitness persona | Gulf man mid-training or coach cueing client; modern upscale gym; dark moody depth; subject in the **end-half** of frame so copy sits on the calm side (works mirrored for RTL) | 16:9 master, survives 3:4 mobile crop, head in upper third | shot goes under teal duotone — must read on dark; same asset both themes | male only incl. background rack area |
| **H-2** | Hero — Nutrition persona | Meal-prep flat-lay with male hands, or male coach + client over a plan at a table; warm not clinical | as H-1 | as H-1 | watch background staff/patrons |
| **H-3** | Hero — Health practitioner persona | Male practitioner consulting male client, warm clinic; the medication/supplement differentiator made visible (D15's F-6 mood, hero-grade) | as H-1 | as H-1 | as H-2 |
| **D-1** | Photo divider ① (Features→HowItWorks) | Single strong subject resting between sets, phone in hand (the F-4 idea, promoted): "the check-in happens where life happens" | wide 3:1–2.5:1 band, mid crop safe | duotone band | male only |
| **D-2** | ClientApp backdrop | Man at home/kitchen post-workout with phone, morning light (the F-8 idea, promoted); used at low opacity behind phones | 16:9, subject off-center | sits on `primary-dark` both themes | male only |
| **C-1** | CTA cinematic backdrop | Dusk gym or corniche-at-dawn wide shot (F-10 candidate in `_photo-originals/` is a starting point), near-empty, atmospheric — a *closing shot*, not a subject | 21:9-ish wide | must survive 35–45% opacity under heavy teal scrim | if any person: male, distant |
| **W-1** | WhyWazen (only if F-7 promoted to hero) | Same brief as F-7: dignified Gulf gym scene, vertical-crop survivable | 4:5, 3:2 mobile | as today's F-7 | male only |
| — | **Survivors:** F-2 (Problem), F-3/F-5/F-6 (Segments), F-9 (CTA fallback) | keep as-is; F-5 edge + F-6 poster concerns (D15) still queued for the v2 swap | | | |
| — | **F-11** founder portrait | unchanged, still pending (owner) | | | |

Sourcing order matched to passes: H-1 unblocks the hero (slider can ship on one photo) → C-1 + D-1 unblock the cinematic middle/close → H-2/H-3 complete the slider → D-2, W-1, F-11 polish.

---

## 7 · Deliverable 6 — Logo integration workstream

**Current state:** the final mark exists **only as a JPEG on a white background, not yet in the repo**; `components/ui/Logo.tsx` still renders the interim "W" tile (its in-file TODO covers favicon/app-icon too).

**Blockers (designer asks, in priority order):**
1. **SVG (or transparent hi-res PNG) master** — JPEG-on-white cannot go on the Phase 2 hero/nav (photo/dark backgrounds) at all.
2. **On-dark colorway** — Phase 2's transparent nav makes this a day-one need, not a nice-to-have.
3. **Square/simplified app-icon variant** for favicon + PWA icons.

**Swap map (one workstream, single pass when assets land):**

| Surface | File | Note |
|---|---|---|
| Nav + footer mark | `components/ui/Logo.tsx` | designed as the one-file swap point (PROJECT.md §2); now needs a `variant="onDark"` prop for the transparent nav |
| Favicon / app icons | `app/favicon.ico`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts` | generated routes re-drawn from the SVG |
| OG/social cards | `lib/og.tsx` | shared builder — one edit covers EN+AR og/twitter images (respect learnings #2/#3: no hardcoded OG paths) |
| JSON-LD | `lib/seo.ts` Organization `logo` | point at a stable PNG export |
| Launch checklist | PROJECT.md | "Final logo SVG swap" item closes with this workstream |

Sequencing: **not blocking Phase 2 passes 2.1–2.2** (interim W tile gets the onDark variant trivially); the swap lands whenever assets arrive, ideally inside Pass 2.3.

---

## 8 · Deliverable 7 — Implementation plan

Each pass: own commit(s) on `feat/phase-2-design`, PROJECT.md updated in the same commit (status + new D-rows), EN+AR × light+dark × desktop+mobile screenshots to `_preview/`, Vercel preview review before the next pass. Phase 2 merges to `feat/landing-revamp` only when all passes are approved.

### Pass 2.1 — structure: hero, video, flow
**Scope:** chosen hero option (photo layer + duotone + persona slider *mechanic* with stand-in photo(s), serif accent, dark-hero CTA styling) · nav transparent/scrolled states + Logo onDark variant (interim mark) · Option A: product-proof section · video section component (per decision #5: flagged-off or placeholder-visible) · TrustBar restyle · section reorder per §4 table.
**Acceptance:** build clean · no regression of any Phase 1 content/constraint (grep: no "AI", no app-store wording, CTA labels unchanged) · hero LCP ≤ Phase 1 baseline on 4G mobile emulation (Option A) or within agreed budget (Option B) · i18n remount test: toggle EN↔AR on every new motion element · Lighthouse SEO stays 100 both locales.

### Pass 2.2 — motion & section polish
**Scope:** motion vocabulary additions (§5) wired through hero/tabs/video/photos · Features progress-underline tabs (+ optional auto-advance per decision #7) · photo divider ① (with F-4-era stand-in or D-1 if sourced) · ClientApp cinematic restyle + phoneFloat · CTA cinematic upgrade (F-9 fallback mode until C-1) · HowItWorks drawLine.
**Acceptance:** `prefers-reduced-motion` walkthrough shows zero autonomous motion · no motion keyed by translated strings (code review against learning #1) · 60fps scroll on mid-tier mobile (DevTools 4× CPU throttle) · tab keyboard/ARIA behavior identical to Phase 1.

### Pass 2.3 — photo integration & finish
**Scope:** v2 photos (§6) processed like C.2b (sharp → WebP, per-slot crops, `_photo-originals/` for masters) into hero slider, divider, ClientApp, CTA · full persona slider goes live (3 shots) · logo swap workstream (§7) if assets have landed · real video asset wiring if it exists.
**Acceptance:** every photo visually re-verified for D7 (including backgrounds) before commit · srcset/`sizes` audit on all new images (learning #5 / D16 class) · full 32-shot verification matrix (EN/AR × light/dark × desktop/mobile) · WhatsApp OG re-check if any hero/OG surface changed.

---

## 9 · Hard-constraint compliance check

| Constraint | Status in this proposal |
|---|---|
| **D7 — no women in any photography** | Every brief in §6 is male-subject with an explicit background-check note; mockup stand-in is F-7 (already D7-cleared). |
| **No AI feature claims** | No "AI" anywhere in proposed copy, badges, or chapter names; Everfit's AI badging explicitly excluded (§1). |
| **No email-capture hero CTA** | Both hero options keep "Start free — up to 5 clients" + ghost secondary; only button *styling* changes (decision #3). |
| **No fabricated testimonials/social proof** | TrustBar keeps honest claims verbatim; no stat cards, no badges, video shows the product only. |
| **PWA framing (D8)** | ClientApp restyle keeps the "Installs like an app" chip; no app-store visuals anywhere. |
| **Binaa Labs (D2)** | Footer/FAQ placement untouched. |
| **Pricing (D6)** | Pricing section untouched. |
| **EN + AR (RTL), light + dark** | Every new mechanic specced with logical properties / `inline-start` fills / index keys; duotone photos are theme-agnostic; serif accent has an explicit AR strategy (decision #2). |
| **Existing content retained by default** | All copy, captures, pricing preserved; net-new sections limited to the video section + Option A's relocated-composite section (both explicitly allowed). |

---

## 10 · Decision checklist (owner — all answers required before Pass 2.1)

1. **Hero direction:** Option A (photography-led, recommended) or Option B (hybrid)?
2. **Serif accent:** adopt the editorial italic serif for the H1 accent (mockups: Fraunces)? And for AR: (a) Tajawal 800 in sage (safe), (b) add an Arabic display face (e.g. Amiri) for the accent phrase, or (c) skip the accent styling on AR?
3. **Primary CTA on dark hero:** sage pill with dark text (mockups) or white pill with teal text?
4. **Persona slider at launch:** wait for all 3 H-shots, or launch the hero with one photo (slider mechanic hidden) and enable rotation when H-2/H-3 land?
5. **Video section shipping mode:** hidden behind a flag until a real video exists (recommended), or visible with poster + "coming soon"? And: is the 45–60s walkthrough (post-launch backlog) being commissioned now so 2.x can wire the real asset?
6. **Video position:** right after hero (recommended, Everfit pattern) or after Features as a recap?
7. **Features tab auto-advance:** yes (rail doubles as timer, stops on first interaction) or manual-only?
8. **CTA backdrop:** commission C-1 for the 35–45% cinematic treatment, or keep F-9-at-12% permanently?
9. **F-7:** promote to hero stand-in/H-1 until real hero shots land (then W-1 backfills WhyWazen), or keep F-7 in WhyWazen and hero waits for H-1?
10. **Photo sourcing for v2:** stock again (fast, D15-style temporary) or own shoot (slower, closes the D15 "Gulf-authentic" goal)?
11. **Logo assets:** confirm the designer is delivering SVG + on-dark + app-icon variants (§7 blockers) and rough timing, so the swap can be slotted into 2.3.
12. **Nav treatment on non-hero pages/anchors** (terms/privacy keep the current solid nav?) — default: solid everywhere except over the hero photo.

---

*Prepared on `feat/phase-2-design` · sources: PROJECT.md (all decisions/learnings current through D16), everfit.io live review, current component tree audit. On sign-off: answers get recorded as D-rows in PROJECT.md's decisions log in the Pass 2.1 commit.*
