# Wazen Landing Page — Audit Report & Implementation Plan (v4)

> This document is the single source of truth for the landing page revamp.
> Status: **Pass A ✅ done · Pass A.1 ✅ done · Pass B 🔄 in progress (owner assets, captures tomorrow) · Pass C.1 🔄 running now (structure + placeholders) · Pass C.2 ⏳ tomorrow (pure asset swap).** All work on `feat/landing-revamp`.

---

## Context

wazen.fit markets Wazen, a SaaS coaching platform (coach dashboard + PWA client app: clients, plans, check-ins, progress, messaging) for coaches in UAE/GCC/MENA. Audit motive: the page read as "custom software agency" rather than coaching-app product; the 3-second no-reading test failed.

Method: full source audit (11 sections, EN+AR i18n, SEO/JSON-LD, all 20 screenshots visually inspected), DNS checks on CTA targets, benchmarking vs Everfit / Trainerize / PTDistinction.

---

## Decisions locked (owner review)

| # | Decision |
|---|----------|
| D1 | App URL unknown until launch → placeholder + loud `// TODO: confirm before launch` in `lib/links.ts`; P0-1 moves to launch checklist, not fix-now |
| D2 | Binaa Labs consolidation approved: footer + FAQ Q6 only |
| D3 | New sections approved: segments band + client-app showcase |
| D4 | Messaging = 5th Features tab (not a split-section) |
| D5 | P2-7 closed — 15/45/90-day retention in FAQ is correct; spec doc is stale |
| D6 | Pricing: manual USD/AED toggle, no geo-IP. Default AED on /ar, USD on /en. AED prices: $49→AED 180, $99→AED 365, $490→AED 1,800, $990→AED 3,635 |
| D7 | **Hard rule: no women in any photography.** §7 regenerated male-only; F-7 concept replaced |
| D8 | Client app is a PWA (native later): phone frames stay (honest visual); no app-store badges → "Installs like an app — no App Store needed" chip; reword all "mobile app" copy EN+AR |
| D9 | Phone captures: Chrome DevTools emulation 390×844 @ DPR 3, same demo-data session, EN + AR sets (added to §8) |
| D10 | AED add-on bundle prices: $12→AED 45, $20→AED 75, $18→AED 65 (owner-rounded from peg math 44/73/66); per-currency `addOn` strings in the dictionary |

---

## What the audit found

The page is not visual-less — 12 of 20 real screenshots already render (hero, 4 feature tabs + PiP secondaries, 3 how-it-works steps) and the copy is already product-SaaS (free-forever tier, tiered pricing, zero agency language, SoftwareApplication schema). The "agency feel" comes from:

1. **Zero human beings on the page** — no photography, no faces, no fitness context; every visual is admin UI or decoration.
2. **Zero social proof** — and the TrustBar spends the proof slot on self-claims including "Powered by Binaa Labs."
3. **Invisible category signal** — desktop-web screenshots shrunk to illegibility; the client app never shown as a phone experience.
4. **QA test data in shipped screenshots** — terminated.client@example.com, 0% compliance, "USED BY 0", localhost:5173 badge, "Unable to load profile." — visible via lightbox zoom.
5. **Dead conversion URLs** — app.wazen.com / app.wazen.fit both fail DNS (now a launch-checklist item per D1).

---

## P0 — Positioning-critical

### P0-1 · Conversion URLs dead → LAUNCH CHECKLIST (per D1)
`lib/links.ts` points every CTA at unresolvable app.wazen.com.
**Now (Pass A):** keep `lib/links.ts` as single source of truth; placeholder URL + `// TODO: confirm before launch — this domain does not resolve yet` comment.
**At launch:** swap real URL; verify signup/login return 200; update BrowserFrame address-bar text (P2-2) to match real domain.

### P0-2 · Fails the 3-second test — hero shows no coaching, no app
Hero's desktop browser frame sits at/below the fold and renders a 1905px capture at 1120px (unreadable).
**Fix:** hero composite — desktop browser frame (re-captured dashboard) + overlapping phone frame (28% width, client Today screen) + 2–3 floating annotation chips (HTML/CSS, translatable: "✓ Check-in reviewed", "Weight ↓ 0.7 kg"); tighten hero vertical rhythm so the frame top is visible on 13" laptops. Pass A builds layout + PhoneFrame with branded skeleton UI; Pass C swaps in real captures.

### P0-3 · QA test data in shipped screenshots
Fixture emails (terminated.client@, paused.client@…), 0% compliance top row, "USED BY 0" templates, tour banners, adherence chart collapsing to 0%, localhost:5173 badge (messaging), "Unable to load profile." (profile). Lightbox zoom invites inspection of all of it.
**Fix:** full re-capture per §8 (Pass B — owner's manual session).

### P0-4 · Zero social proof; proof slot spent on self-claims
No testimonials/logos/counts/ratings anywhere; competitors all lead with proof directly after hero.
**Fix ladder (no fabricated testimonials):**
1. Pass A: TrustBar → proof band: "Built with founding coaches in [cities]" + bilingual badge + free-tier claim; Binaa Labs out (D2).
2. Pass C: restore spec'd coach-profile proof point (Client-Coach-Profile-View.png re-capture: "13 active clients · 89% compliance · 8y experience") in WhyWazen.
3. Post-pilot: real coach quotes + photos + one metric each (slots reserved in design now).
4. Post-launch: review-platform badges.

### P0-5 · Client app never shown as an app
Copy sells a client app; all visuals are desktop frames.
**Fix:** PhoneFrame component (Pass A, skeleton content) used in: hero composite, Features client-side PiPs, coach↔client sync panel, new client-app showcase. Pass C swaps skeletons for DevTools captures (D9). Per D8 the phone framing is honest — it's a PWA on a phone.

### P0-6 · Binaa Labs over-presence (APPROVED as recommended, D2)
Five placements + JSON-LD Organization name.
**Fix (Pass A):** keep footer copyright + FAQ Q6 only; FAQ Q6 rephrase "software studio" → "UAE-based product company"; remove from nav wordmark subtitle and TrustBar. Legal pages untouched.

---

## P1 — Important

| # | Finding | Fix (pass) |
|---|---------|-----------|
| P1-1 | Messaging claimed everywhere, shown nowhere; existing captures unusable (localhost badge, empty thread) | 5th Features tab "Messaging" (D4): tab shell + skeleton visual in Pass A; re-captured seeded conversation in Pass C |
| P1-2 | Nutrition + medication/supplement differentiators invisible (competitors have no medication plans) | Surface in segments band copy + feature tab captures; needs clean re-captures (current medication view = ended-plan empty state) (B/C) |
| P1-3 | /ar shows English screenshots — undercuts "Arabic-first" FAQ claim | AR capture set (B); locale-aware screenshot map `{ en, ar }` (C) |
| P1-4 | Full-page captures shrunk to illegibility; PiP at 38% worse; mobile = postage stamps | Re-capture at ~1280–1440px viewport + per-tab story crops (B); phone frames on mobile (A skeleton/C real) |
| P1-5 | Step-1 invite screenshot is a dimmed modal patched by CSS `brightness(1.15)` | Clean modal re-capture, tight crop (B); remove filter (C) |
| P1-6 | Count-up animations on trivia ("5", "6+") mimic scale metrics — reads as fake proof | Pass A: remove counters, reframe as plain copy; coach-profile proof point takes the visual slot (C); keep useCountUp for future real metrics |
| P1-7 | Founder quote = initials avatar | Real portrait (F-11, owner provides) placed in Pass C |
| P1-8 | No motion/video product demo | Pass A: animated annotation chips; later: 45–60s walkthrough video as secondary CTA (post-launch item) |
| P1-9 | OG/social image text-only (WhatsApp previews!) + English alt on /ar | Pass C: OG composite (headline + browser frame + phone frame), AR variant |
| P1-10 | Light screenshots glare in dark mode | Pass A: CSS softening (`dark:opacity-90`, stronger border, reduced shadow); dark captures only if app ships dark theme |
| P1-11 | USD-only pricing | Per D6 (Pass A): manual USD/AED toggle in Pricing; default AED on /ar, USD on /en; AED 180 / 365 / 1,800 / 3,635; yearly-savings strings recomputed per currency ("Save $98" → "Save AED 360") |
| P1-12 (NEW, D8) | Copy overclaims a native "mobile app"; JSON-LD says `operatingSystem: "Web, iOS, Android"` | Pass A copy audit EN+AR: every "mobile app"/"تطبيق" instance → "client app — works on any phone, nothing to download." Known spots: FAQ Q2 ("their own dedicated app" — soften), CTA card "Client mobile app included" → "Client app included — works on any phone", `lib/seo.ts` operatingSystem → "Web (PWA) — works on iOS & Android"; grep both locales for stragglers. Section 9 chip: "Installs like an app — no App Store needed" |

---

## P2 — Polish

| # | Finding | Fix (pass) |
|---|---------|-----------|
| P2-1 | 8 unused PNGs publicly served, incl. localhost-badge + error captures | Prune after re-capture (C) |
| P2-2 | BrowserFrame address bar `wazen.fit/dashboard` vs real app domain | Launch checklist (with P0-1) |
| P2-3 | No logo mark in page chrome; favicon "W" vs app sparkle glyph mismatch | Pass A: build a single `Logo` component (one file, one source of truth) used in nav + footer, with the current "W" from `app/icon.tsx` as interim content. Final logo (icon + wordmark, multiple colorways) is in production — when the SVG arrives, the swap is one component edit. Leave the favicon/app-icon swap as a noted TODO inside the same component file |
| P2-4 | Uniform fadeUp rhythm | Pass A/C: photos get slow scale/parallax; frames keep fadeUp |
| P2-5 | Footer contact admin@binaalabs.com | Pass A: support@wazen.fit alias (set up forwarding) |
| P2-6 | Pricing value-strip repeats Problem message as plain tags | Pass A: icon chips or trim |
| P2-7 | Retention windows mismatch vs spec | **CLOSED (D5)** — FAQ's 15/45/90 is correct; no change |
| P2-8 | /ar missing keywords meta; OG alt English-only | Pass A |
| P2-9 | Ghost "وازن" wordmark near-invisible in dark mode | Pass A: 4% → 5–6% opacity in dark |

---

## Competitor patterns adopted (recap)

**Everfit:** annotated hero product UI (→P0-2); proof band after hero (→P0-4); feature groups each with product visual (upgrade crops, P1-4); testimonial = headshot + metric (post-pilot slots); persona segmentation (→segments band); phone-screen rows (→client-app showcase, PWA-framed per D8).
**Trainerize:** friction microcopy under every CTA → standardize "Free for 5 clients · No credit card" (Pass A).
**PTDistinction:** hero desktop+phone pairing (→P0-2 composite).
**Skip:** mega-nav, 17-section length, email-capture-first hero, app-store badge wall (moot per D8).

---

## §6 · Revised page structure

Type key: **[a]** product visual (device frame) · **[b]** photography (§7) · **[c]** graphic/skeleton.

| # | Section | Visuals | Pass |
|---|---------|---------|------|
| 1 | Nav | logo mark [c]; drop "Powered by Binaa Labs" | A |
| 2 | Hero | browser frame: coach dashboard [a] + overlapping phone frame: client Today [a] + annotation chips [c] | A (skeleton) → C (real) |
| 3 | Proof band | text proof + bilingual badge; pilot coach headshots later [b] | A |
| 4 | Problem | side photo: overwhelmed male coach, dark-treated [b: F-2] | C |
| 5 | Features — 5 tabs (+ Messaging, D4) | per tab: story-crop primary [a]; client-side secondaries in phone frames [a]; annotation chip [c] | A (tab shell + skeletons) → C |
| 6 | Coach ↔ Client sync | desktop frame + phone frame + animated sync arrow [a+c] | A (skeleton) → C |
| 7 | How it works | clean invite-modal crop [a]; client plans phone frame [a]; analytics crop [a] | C |
| 8 | **NEW · Segments band** | 3 photo cards: fitness [b: F-3], nutrition [b: F-5], health practitioner [b: F-6] + icons [c] | C |
| 9 | **NEW · Client-app showcase** | 3–4 phone frames (Today/Plans/Check-in/Progress) [a]; "Installs like an app — no App Store needed" chip [c] (D8); optional backdrop [b: F-4] | A (skeletons + chip) → C |
| 10 | Pricing | USD/AED toggle (D6); tool icon chips [c] | A |
| 11 | Why Wazen | coach-profile proof screenshot [a]; founder portrait [b: F-11]; regional photo [b: F-7 or F-10] | C |
| 12 | FAQ | — (copy edits only: P0-6, P1-12) | A |
| 13 | CTA | phone + dashboard-corner mini composite [a]; optional dark workspace backdrop [b: F-9] | A (skeleton) → C |
| 14 | Footer | logo mark [c]; single "Wazen by Binaa Labs" line; support@wazen.fit | A |

---

## §7 · Image sourcing list — male-only (BRIEFS VALID · CANDIDATE LINKS VOID)

> **Status update:** owner reviewed and rejected most stock candidates below. The **briefs remain the spec** for each slot; the candidate URLs are void — do not source from them. Owner will source alternatives after seeing the Pass C.1 placeholder layout (every placeholder is labeled with its F-number for mapping).
> **Required set:** F-2, F-3, F-5, F-6, one of F-7/F-10, F-9 · **Optional:** F-4, F-8 · **Owner-provided:** F-11 (portrait) · **Spare, not placed:** F-1.

**Global rules (apply to every pick):** no women visible anywhere in frame, including background — verify visually before download (candidates matched by description; some descriptions don't mention background people). Unsplash/Pexels licenses: free commercial use, no attribution. Avoid visible third-party logos. Tone: muted/desaturated so teal `#3D8C84` / sage `#7BA898` chips and UI sit on top; no neon gym lighting.

### F-1 · Male coach reviewing client data (hero-adjacent / spare)
**Brief:** male coach in athletic wear, laptop/tablet at gym desk; calm "admin handled" mood; side or three-quarter view, negative space for a chip; bright light-mode suitability.
- https://www.pexels.com/photo/smiling-man-working-with-laptop-in-gym-5646007/
- https://www.pexels.com/photo/an-athlete-wearing-an-athletic-performance-analyzer-mask-and-looking-at-the-data-with-a-trainer-20523354/ (verify both subjects male)
- https://www.pexels.com/photo/man-wearing-activewear-using-a-tablet-at-the-gym-6922140/

### F-2 · "The old way" — overwhelmed male coach (Problem section)
**Brief:** man buried in admin — phone + laptop + papers, head in hand; moody/dark; must sit on dark teal `hsl(186,21%,14%)` (shoot dark or desaturate + multiply). Alt composition (zero gender risk): hands-only close-up of a phone flooded with chat notifications.
- https://www.pexels.com/photo/man-wearing-a-plaid-top-talking-on-the-phone-7581021/
- https://unsplash.com/photos/WZd-XDNgC64 (man at MacBook scratching head)
- https://unsplash.com/photos/7JdL8HsOa2g (man at table, head in hands)
- https://unsplash.com/photos/FrkO2lzo1Cw (low-light man in gray sweater — moodiest)

### F-3 · Male coach + male client training (Segments card 1)
**Brief:** two men, one clearly instructing/assisting (spot, pads, form cue); authentic modern gym; horizontal, subjects on a third; bright neutral light. Boxing/MMA options double as regionally popular training styles.
- https://www.pexels.com/photo/a-man-working-out-with-his-trainer-6295824/ (explicit trainer-client, boxing)
- https://www.pexels.com/photo/two-men-exercising-together-6339611/ (resistance bands)
- https://www.pexels.com/photo/men-running-on-treadmill-13211514/ (modern gym, both male)
- https://unsplash.com/photos/iaqrEg8qqg4 (man punching with trainer)
- https://unsplash.com/photos/FH6JcaCrYJ0 (two men sparring, boxing gym)

### F-4 · Man logging on phone in gym (client-app showcase support)
**Brief:** male gym-goer seated between sets, phone in hand, focused — "submitting a check-in"; room around the phone for a pointing chip; bright.
- https://www.pexels.com/photo/man-in-red-tank-top-and-black-shorts-sitting-on-running-track-while-texting-3763876/
- https://www.pexels.com/photo/man-in-black-tank-top-and-blue-shorts-using-a-phone-4720533/
- https://www.pexels.com/photo/fit-man-with-headphones-using-his-smartphone-4162588/

### F-5 · Male nutrition-coach consult (Segments card 2)
**Brief:** two men at a table in advisory conversation — tablet/notebook between them, warm non-corporate setting; coffee/food presence welcome. (True male-male "nutritionist" stock is scarce; these consult scenes read correctly with the section's copy. Alt composition: flat-lay meal-prep + written plan + male hands only.)
- https://www.pexels.com/photo/male-colleagues-discussing-project-in-cafe-7083918/
- https://www.pexels.com/photo/two-men-looking-at-an-ipad-in-a-restaurant-6284865/
- https://www.pexels.com/photo/two-men-pointing-at-ipad-screen-5833781/

### F-6 · Male health practitioner + male client (Segments card 3)
**Brief:** male practitioner consulting a male client, warm clinic/office (chart review, conversation — not hospital-sterile). Supports the medication/supplement differentiator.
- https://www.pexels.com/photo/a-man-at-the-doctor-15319020/ ("male consulting with a dietitian" — closest match)
- https://www.pexels.com/photo/male-doctor-talking-to-a-patient-6129441/
- https://www.pexels.com/photo/male-doctor-talking-to-a-patient-6129444/ (health-records discussion)

### F-7 · Regional shot, REPLACED concept (D7): Gulf men's gym scene (Why Wazen)
**Brief:** male coach + client or strong single male subject in a modern, upscale Gulf-plausible gym; dignified, aspirational; vertical-crop survivable. Honest note: stock identifiably shot in Gulf gyms is thin — verify look/context visually; owner's own capture in a Dubai gym would beat all of these. If none convince, promote F-10 to the primary regional signal.
- https://unsplash.com/photos/wMcDTlmiim0 (man holding barbell)
- https://unsplash.com/photos/yqI0r1AMSsQ (muscular man, dumbbells)
- https://unsplash.com/photos/4ITj2Py6hjk (man lifting weights)
- Plus any F-3 candidate whose gym reads modern/premium

### F-8 · Man's home check-in moment (optional — FAQ-adjacent / client-app section)
**Brief:** man at kitchen counter or post-workout at home, morning light, phone in hand, healthy food nearby — "Sunday weekly check-in" routine.
- https://www.pexels.com/photo/man-using-mobile-phone-in-a-modern-kitchen-setting-36767119/
- https://www.pexels.com/photo/a-man-using-a-smartphone-while-sitting-6336785/ (table, coffee, breakfast)
- https://www.pexels.com/photo/man-sitting-on-a-yoga-mat-using-a-smartphone-8032728/ (post-workout at home variant)

### F-9 · Calm dark workspace, no people (CTA backdrop) — unchanged
**Brief:** minimal tidy desk + laptop, dusk/moody; used at 10–15% opacity under dark CTA.
- https://unsplash.com/photos/Im7lZjxeLhg
- https://unsplash.com/photos/TWMI7B4KeLY
- https://unsplash.com/photos/OVbeSXRk_9E

### F-10 · Gulf outdoor male runner (promotable to primary regional shot per D7)
**Brief:** male runner on Gulf-city corniche/promenade, dawn light, palms/skyline. Honest gap: thin stock coverage; owner's own phone shot of a Dubai/Amman morning run likely beats stock.
- https://unsplash.com/photos/9aQ6NvlImWA (man running, palm-lined street — best)
- https://unsplash.com/photos/gEzeai8Rq_g (man walking, palms — weaker, walking)

### F-11 · Founder portrait (owner provides — no stock)
**Brief:** Naser Shadid; casual dark/teal top; soft natural side light; plain warm background or blurred gym; chest-up; croppable to ~200px circle; shoot light + slightly moody variants for both modes.

---

## §8 · Re-capture checklist (Pass B — owner's manual session)

- **Demo data:** 9–12 clients, realistic regional male+female client names are fine in UI lists (data, not photography); real-looking emails (karim.a@gmail.com — never `*.client@example.com`); compliance spread 55–100%, no 0% in visible rows; templates "Used by 3/5"; seeded 6–8-message coach↔client conversation (plan feedback, not lorem); healthy adherence trend (no collapse to zero); active nutrition/medication plans (no ended-plan empty states).
- **Chrome hygiene:** tour banners dismissed, no localhost/debug overlays, production-looking URL, professional account name.
- **Desktop captures:** ~1280–1440px viewport; per-feature story crops, not full pages.
- **Phone captures (D9):** Chrome DevTools device emulation 390×844 @ DPR 3 — authentic for a PWA. Set: client Today, Plans, Check-in submit, Progress chart, Messages. Same demo session as desktop.
- **Locales:** duplicate desktop + phone key sets in Arabic UI for /ar (P1-3).
- **File naming:** predictable mobile names, e.g. `Client-Dashboard-Mobile.png` / `Client-Dashboard-Mobile-AR.png` — convention stated at the start of Pass C.
- **Cleanup input for Pass C:** list of superseded PNGs to prune (P2-1).

---

## Implementation plan & status

### Pass A — code-only foundation ✅ DONE (committed `14c6c2c`)
All 12 items shipped: links.ts launch TODO, Binaa Labs consolidation (footer + FAQ Q6 only), hero tightening + composite (PhoneFrame skeletons + annotation chips), proof band, 5th Messaging tab shell, USD/AED toggle with locale defaults, CTA microcopy, dark-mode softening, PWA copy corrections EN+AR, WhyWazen pillars (counters removed), Logo component, P2 sweep. Verified EN+AR × light+dark × 1440/375; `priority`→`preload` migration for Next 16.

### Pass A.1 — defect fixes ✅ DONE
Seven review defects fixed. **Documented learning (do not regress):** motion elements inside a `whileInView`/`once` parent must never be keyed by translated strings — on language switch they remount into an already-revealed parent, mount at `hidden`, and stay invisible. This single root cause produced both the "maroon bar" (the Problem section's error-tinted Old Way card rendering empty) and the invisible WhyWazen pillars. Fix: stable index/structural keys, with in-code comments at both sites (`Problem.tsx`, `WhyWazen.tsx`). Also: content-anchored hero chips (physical coords while captures are LTR), densified messaging skeleton, flowing-dots sync connector (reduced-motion fallback), un-chat-like "today" skeleton, value-strip icon chips (P2-6), AED add-on prices (D10).

### Pass B — owner assets 🔄 IN PROGRESS
- Demo-data seeding + full re-capture session per §8 (desktop + phone, EN + AR): **tomorrow**
- Photo sourcing: **re-sourcing after C.1 placeholder preview** (original candidates rejected — see §7 note); required set F-2, F-3, F-5, F-6, one of F-7/F-10, F-9
- Founder portrait (F-11): **pending**

### Pass C.1 — structural build with placeholders 🔄 NOW (no new assets)
1. Locale-aware screenshot map `lib/screenshots.ts` — all screenshot references go through `{ en, ar }` entries (ar falls back to en until AR captures exist). C.2 becomes filename/map edits only.
2. NEW Section 8 · Segments band "For every kind of coach" (position per §6): fitness / nutrition / health-practitioner cards, icons + EN+AR copy (health card names nutrition, supplement & medication plans), photo placeholder per card.
3. Reusable `PhotoPlaceholder` component — branded panel, F-number label, true final aspect ratio. Placed: F-2 (Problem side, desktop only), F-3/F-5/F-6 (segments), F-7-or-F-10 (WhyWazen), F-9 (CTA backdrop at the real 10–15% opacity). F-4/F-8 slots skipped (optional).
4. WhyWazen: coach-profile proof point slot using current `Client-Coach-Profile-View.png` for layout (re-captured in B).
5. OG image composite EN+AR (P1-9): headline + browser frame + phone frame on brand background; AR route with Arabic headline + localized alt.
6. No PNG pruning; phone skeletons untouched.

### Pass C.2 — pure asset swap ⏳ TOMORROW
Clean captures replace current PNGs (map edits in `lib/screenshots.ts`, incl. AR paths) · phone captures replace skeletons · approved photos replace `PhotoPlaceholder` blocks (match by F-number) · founder portrait replaces initials avatar · clean invite-modal crop + remove brightness filter · then prune superseded PNGs (P2-1).

---

## Launch checklist (separate from passes)

- [ ] Real app URL into `lib/links.ts` (P0-1)
- [ ] BrowserFrame address-bar text matches real domain (P2-2)
- [ ] Click-test every CTA returns 200
- [ ] Re-verify OG preview via WhatsApp
- [ ] Final logo SVG swapped into `Logo` component + favicon/app-icon updated (P2-3 TODO)

---

## Verification (per pass)

**Pass A:** `npm run dev` → EN+AR × light+dark × 375/768/1440px. Checks: hero frame top above fold on 13"; PhoneFrame skeletons render everywhere placed; currency toggle flips all 3 tiers + savings strings, defaults AED on /ar & USD on /en; grep EN+AR i18n for "mobile app"/"App Store"/"تطبيق الجوال" → only the new PWA wording remains; "Powered by Binaa Labs" only in footer; 5th tab navigates with RTL slide direction correct.

**Pass C.1:** build clean; segments band renders 3 cards with F-labeled placeholders, correct RTL; every placeholder labeled with its F-number; OG composite renders EN+AR; screenshots of each new/changed section reviewed before commit.

**Pass C.2:** no QA data visible at lightbox zoom on any screenshot; /ar serves AR captures; placed photos contain no women (manual visual check, D7); OG preview shows real captures; no 404s for pruned PNGs (grep references).

---

## Open items (owner)

- [x] ~~Vet §7 photo candidates~~ — vetted and mostly rejected; briefs stand, links void (see §7 note)
- [ ] Source replacement photos against §7 briefs after C.1 placeholder preview (required: F-2, F-3, F-5, F-6, F-7/F-10 pick, F-9)
- [ ] Decide F-7 vs F-10 as primary regional shot — before C.2
- [ ] Re-capture session per §8 (desktop + phone, EN + AR) — tomorrow
- [ ] Founder portrait shoot (F-11)
- [ ] Final Wazen logo SVG delivery (light + dark colorways minimum; monochrome footer variant ideal)
