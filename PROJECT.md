# Wazen Landing Page — Project Document

> Single source of truth for this repo. A developer joining cold should get the full picture from this file: what Wazen is, what this repo is, every decision made and why, what's shipped, and what remains.
> Current state: **Pass A ✅ · Pass A.1 ✅ · Pass B ✅ (captures + photo set v1 delivered) · Pass C.1 ✅ · Pass C.2 ✅ (a: real captures · b: real photos, EN+AR, desktop+mobile).** All on `feat/landing-revamp`. Remaining: launch checklist + post-launch backlog; founder portrait (F-11) and optional F-4/F-8 still unsourced.

---

## 1 · Product context

**Wazen (وازن)** is a B2B2C coaching platform for the Gulf/MENA market: a **coach dashboard** (web) plus a **client app** where practitioners manage clients, workout/nutrition/supplement/medication plans, structured check-ins, progress tracking, and messaging.

- **Who it's for:** fitness coaches, nutrition coaches, and health/wellness practitioners. Clients never sign up publicly — they **join by coach invite only**. The platform is sold to the practitioner; the client app is included in the practitioner's plan at no cost to clients.
- **Regional identity:** built Arabic-first — full RTL in both the product and this landing page, not a bolted-on translation. Primary markets: UAE, GCC, wider MENA.
- **The client app is a PWA.** It works on any phone via the browser or saved to the home screen — nothing to download from an app store. Native apps are planned later; until then, marketing copy must never claim a native "mobile app" (see D8).
- **Business model:** SaaS subscription. Free forever for the first 5 active clients (no trial timer, no credit card), then Professional ($49/mo) and Premium ($99/mo) tiers with client-capacity add-ons.
- **Parent company:** **Binaa Labs** is the display name; **Binaa Lab** is the legal name and appears **only** in the Terms/Privacy legal pages. On the landing page, Binaa Labs appears in exactly two places (footer copyright + FAQ Q6) — see D2.

**This repo is the marketing landing page (wazen.fit) only** — not the app. The app lives at **app.wazen.fit** (signup/login URLs in `lib/links.ts`; live click-test pending on the launch checklist).

---

## 2 · Tech & conventions

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 (CSS-first config via `@theme` in `app/globals.css`) · Framer Motion. No UI component libraries (no Shadcn/Radix/Headless) — every primitive is hand-built in `components/ui/`.

**Read `node_modules/next/dist/docs/` before writing code** (AGENTS.md rule) — this Next.js version has breaking changes vs. training data. Known example: `priority` on `next/image` is deprecated in favor of `preload`.

Single-source-of-truth files — change these, not call sites:

| File | Owns |
|---|---|
| `lib/i18n.ts` | Every user-facing string, EN + AR. `type Dictionary = typeof en` forces the AR object to match shape at compile time. Structural arrays (icons, hrefs, screenshots) in components are index-coupled to dictionary arrays — keep orders aligned. |
| `lib/links.ts` | App signup/login URLs — set to `https://app.wazen.fit/signup` + `/login` (D1). Live click-test still on the launch checklist. |
| `lib/screenshots.ts` | Locale-aware screenshot map: every entry is `{ en: {src,width,height}, ar: {…} }` with true per-locale dimensions (EN desktop 2560×1600, AR desktop 3840×2400, mobile 1170×2532 per D9). Captures live in the delivered tree `public/Wazen-Screenshots/{Coach\|Client} Dashboard/{Desktop\|Mobile}/{en\|ar}/<Name>.png` (D13) — all path knowledge stays in this file. |
| `components/ui/Logo.tsx` | The brand mark in nav + footer. Interim "W" tile; the final logo SVG (in production) lands as a one-file swap. Favicon/app-icon swap is a TODO noted in-file. |
| `lib/og.tsx` | Shared OG/social card builder consumed by the EN and AR `opengraph-image.tsx` routes. |

**i18n / RTL:** two route groups — `app/(en)/` serves `/` and `app/(ar)/ar/` serves `/ar`; `RootShell` sets `lang`/`dir` server-side and a pre-paint init script prevents RTL/theme flash. Components use logical properties (`ms-`/`me-`/`start-`/`end-`) throughout; the BrowserFrame address bar is deliberately forced LTR. Runtime language toggle re-points `<html>` attributes without navigation.

**Theme:** hand-rolled (NOT next-themes): class-based `html.dark`, persisted in `localStorage` (`wazen-theme`), applied pre-paint by the init script, toggled in `Nav.tsx` via `useSyncExternalStore`. Dark mode overrides only neutral tokens in `globals.css`; brand hues stay.

**Code guardrails** (carried from the original build spec — still binding):
- No hardcoded hex colors — design tokens in `globals.css` only.
- `next/image` for all raster images; explicit dimensions; hero uses `preload`.
- Animate only `transform`/`opacity`; shared motion vocabulary lives in `components/motion.ts` (`fadeUp`, `staggerContainer`, `scaleIn` for photos); page wrapped in `<MotionConfig reducedMotion="user">`.
- One component per section in `components/sections/`; reusable primitives in `components/ui/`.
- White-label branding is "coming soon" — never shown as available.

**Deployment:** Vercel. Branch pushes get preview deployments; `main` is production **wazen.fit**. Work happens on `feat/landing-revamp`; never commit to `main` directly.

---

## 3 · Key learnings — do not regress

1. **The i18n remount bug (bit us twice).** Motion elements inside a `whileInView`/`once` parent must **never be keyed by translated strings**. On language switch the key changes → the element remounts → it mounts at the `hidden` variant inside a parent whose reveal already resolved → it stays invisible forever. This one root cause produced both an "unexplained maroon bar" (the Problem section's error-tinted card rendering empty) and invisible WhyWazen pillars. Use stable index/structural keys; in-code comments exist at both sites (`Problem.tsx`, `WhyWazen.tsx`). Full-section remounts (e.g. FAQ's `key={lang}`) are safe — it's child-level remounts that break.
2. **Satori (OG images) scrambles wrapped Arabic.** Word order *within* a line is correct, but line-wrapping reorders words across lines. Arabic copy in `lib/og.tsx` ships as **pre-broken lines** that never soft-wrap. Also: Satori rejects `undefined` style values (omit keys instead) and needs an Arabic font loaded explicitly (Tajawal TTF fetched at build with a soft fallback).
3. **Segment-level OG image files get hashed URLs** (e.g. `/ar/opengraph-image-1kyplq`). Never hardcode OG image paths in metadata — rely on the file convention to inject `og:image`/`twitter:image` (see `app/(ar)/ar/opengraph-image.tsx` + `twitter-image.tsx`).
4. **`globals.css` is edited by full rewrite, not string replacement** — targeted replaces have historically failed on this file. Prefer writing the whole file when touching tokens.
5. **CSS `aspect-ratio` transfers `min-height` into a min-WIDTH.** `min-h-[280px]` + `max-lg:aspect-[3/2]` gave the WhyWazen photo slot a transferred 420px min-width on phones: the mobile layout viewport expanded to 420px, and Chrome's `srcset` selection inflated so **every** image on the page fetched its largest variant (`w=3840`) — which is also why huge AR captures rendered blank in slow conditions. Scope `min-h-*` to breakpoints where no `aspect-ratio` rule applies (fix: `lg:min-h-[280px]`, C.2b).

---

## 4 · Decisions log & standing constraints

| # | Decision | Rationale |
|---|---|---|
| D1 | App URLs live in `lib/links.ts` (single source of truth). **Set (July 2026): `https://app.wazen.fit/signup` + `/login`** — placeholder era over; remaining launch step is the live click-test | The originally assumed domain didn't resolve, so CTAs shipped against a placeholder until the real subdomain was confirmed. |
| D2 | Binaa Labs on the landing page: **footer copyright + FAQ Q6 only** | Studio credit repeated across the chrome read as "agency site" — the strongest wrong signal the audit found. Legal pages keep Binaa Lab (legal name). |
| D3 | Two new sections: segments band + client-app showcase | Answer "who is this for" and "clients get a real app" visually — Everfit-pattern persona segmentation + phone-screen row. |
| D4 | Messaging = 5th Features tab | Messaging was claimed everywhere and shown nowhere; a tab keeps the section architecture instead of adding a new section. |
| D5 | Data-retention windows are **15/45/90 days** (Starter/Pro/Premium) | The FAQ was right; the old build-spec's 90/180/365 was stale. |
| D6 | Pricing: manual **USD/AED toggle**, no geo-IP; AED defaults on `/ar`, USD on `/en`; AED 180 / 365 / 1,800 / 3,635 | Gulf-first audience expects AED; manual toggle avoids geo-IP complexity and wrong guesses. Fixed launch prices, not live peg conversion. |
| D7 | **No women in any photography — hard rule** | Regional market requirement. Applies to every sourced photo including background subjects; verify visually before use. Client *names* in screenshot demo data are unaffected (data, not photography). |
| D8 | Client app is a **PWA** — no app-store badges; copy says "works on any phone, nothing to download"; JSON-LD `operatingSystem: "Web (PWA)…"` | Native apps come later; the page must not overclaim. The "Installs like an app — no App Store needed" chip is the honest framing. |
| D9 | Phone captures via Chrome DevTools emulation, **390×844 @ DPR 3**, EN + AR | Authentic for a PWA — DevTools capture *is* the real client experience. |
| D10 | AED add-on bundle prices: $12→AED 45, $20→AED 75, $18→AED 65 | Owner-rounded from peg math (44/73/66) to cleaner price points. |
| D11 | Pass B demo data via backend seed script (`SEED_DEMO=true`, wazen-backend); featured client Omar Saleh (عمر صالح); EN/AR datasets via `SEED_LOCALE=ar`, one at a time — captures per locale require re-seeding | Repeatable verified data (compliance 55–100%, 8-msg featured thread, QA scans); AR variant makes AR screenshots fully Arabic. |
| D12 | Wazen app i18n hardening (~175 strings keyed, RTL bidi fixes, AR plural sets, locale formatters, Latin digits) as Pass B prerequisite. Branches: wazen-frontend `feat/i18n-hardening`, wazen-backend `feat/demo-seed-ar`. See wazen-frontend `docs/I18N-HARDENING-CHANGELOG.md` | AR captures would have leaked English UI otherwise. |
| D13 | Screenshot naming: keep the delivered tree `public/Wazen-Screenshots/{Coach\|Client} Dashboard/{Desktop\|Mobile}/{en\|ar}/<Name>.png`; all path knowledge in `lib/screenshots.ts` | Re-captures drop in without rename churn. |
| D14 | Messaging tab uses the real Coach Messages capture (supersedes the D4 skeleton note) | Capture now exists; fake next to real reads wrong. |
| D15 | Photo set v1 (F-2/3/5/6/7/9, Unsplash/Pexels free license) shipped as **TEMPORARY** — flagged for later refinement/own shoot. F-7 chosen over F-10 as the regional signal. F-5's partial second hand (nail polish at frame edge) is a D7 concern **accepted by owner** for v1; the crop trims most of it. F-6 carries a small background poster + laptop sticker — noted for the v2 swap. F-9 pre-darkened/desaturated in the export so the 12% CTA backdrop reads as texture, not subject. | Real photography now beats placeholders for launch; stock is good enough for v1 and gets replaced by Gulf-authentic shots post-launch. |

**Standing constraints:**
- **No fabricated testimonials or social proof.** Pre-launch startup: the proof band uses honest claims ("Built with founding coaches…"), the coach-profile screenshot is the product-proof visual, and testimonial slots stay empty until real pilot coaches exist. Review-platform badges are a post-launch item.
- **No women in photography** (D7) — repeated because it governs all future sourcing.
- Pricing is USD/AED via the manual toggle only (D6); FAQ prose quotes USD.
- Binaa Labs naming rules per D2; "software studio" phrasing is banned (use "product company").

---

## 5 · The revamp — why and what

**The audit's finding (July 2026):** the page failed the 3-second test — it read as a custom-software agency site, not a coaching SaaS. Not because visuals were missing (12 real screenshots already rendered) or the copy was service-y (it was already product-SaaS), but because of five gaps:

1. **Zero human beings** — no photography, no faces, no fitness context anywhere.
2. **Zero social proof** — and the trust bar spent the proof slot on self-claims including "Powered by Binaa Labs."
3. **Invisible category signal** — desktop admin screenshots shrunk to illegibility; the client app never shown as a phone.
4. **QA test data in shipped screenshots** — `terminated.client@example.com`, 0% compliance, "USED BY 0", a `localhost:5173` badge — all zoomable via lightbox.
5. **Dead conversion URLs** — every CTA pointed at a domain that doesn't resolve (→ D1; resolved July 2026: `app.wazen.fit`).

Benchmarks: Everfit (hero product UI + proof band + persona segmentation + phone rows), Trainerize (CTA friction microcopy), PTDistinction (desktop+phone hero pairing).

### Page structure (target state)

Type key: **[a]** product visual (device frame) · **[b]** photography · **[c]** graphic/skeleton.

| # | Section | Visuals | Status |
|---|---|---|---|
| 1 | Nav | logo mark [c] | ✅ |
| 2 | Hero | browser frame: coach dashboard [a] + overlapping phone frame [a] + annotation chips [c] | ✅ real captures |
| 3 | Proof band | honest text proof + bilingual badge; pilot coach headshots later [b] | ✅ |
| 4 | Problem | comparison cards + side photo [b: F-2, desktop only] | ✅ real photo |
| 5 | Features — 5 tabs | per-tab story screenshot [a] + client-side phone PiP [a], incl. real Messaging captures (D14) | ✅ real captures |
| 6 | Coach ↔ Client sync | desktop frame + phone frame + animated flowing-dots connector [a+c] | ✅ real captures |
| 7 | How it works | 3 steps, each with screenshot [a]; clean invite modal, brightness hack removed | ✅ real captures |
| 8 | Segments band | fitness / nutrition / health-practitioner cards + photos [b: F-3/F-5/F-6] | ✅ real photos |
| 9 | Client-app showcase | 3 phone frames [a] + "Installs like an app — no App Store needed" chip [c] | ✅ real captures |
| 10 | Pricing | USD/AED + monthly/yearly toggles, tool icon chips [c] | ✅ |
| 11 | Why Wazen | pillars; coach-profile proof screenshot [a]; regional photo [b: F-7]; founder quote (portrait pending [b: F-11]) | ✅ captures + photo · portrait pending |
| 12 | FAQ | text accordion | ✅ |
| 13 | CTA | mini dashboard+phone composite [a] + F-9 photo backdrop at 12% opacity [b] | ✅ captures + photo |
| 14 | Footer | logo mark, single Binaa Labs line, support@wazen.fit | ✅ |

### What shipped

- **Pass A — foundation (code-only):** Binaa Labs consolidation; hero composite (tightened rhythm, PhoneFrame + branded skeleton screens, translatable annotation chips); proof band; 5th Messaging tab; USD/AED pricing toggle with per-locale defaults and per-currency savings; standardized CTA microcopy; PWA copy corrections EN+AR + JSON-LD; WhyWazen counters removed (they mimicked scale metrics); Logo component; dark-mode screenshot softening; AR SEO fixes; `links.ts` launch TODO.
- **Pass A.1 — defect fixes:** the i18n remount root-cause fix (learning #1); content-anchored hero chips (physical coords while captures are LTR); densified messaging skeleton; flowing-dots sync connector with reduced-motion fallback; plan-like "today" skeleton; value-strip icon chips; AED add-on prices (D10).
- **Pass C.1 — structure with placeholders:** `lib/screenshots.ts` locale map wired through every consumer; segments band built; `PhotoPlaceholder` component (branded, F-labeled, true final aspect) placed in all photo slots; coach-profile proof point in WhyWazen; OG composite cards EN+AR (learnings #2/#3).
- **Pass C.2a — real capture swap:** all product screenshots replaced with the new Wazen capture set (curated demo data, new in-app logo, native AR captures — no more EN-on-/ar). 14 map entries (9 desktop + 5 client-mobile) with true per-locale dimensions; every `PhoneSkeleton` replaced by real PWA captures via the new `PhoneShot` component (hero, features PiPs ×5, sync panel, showcase ×3, CTA composite); messaging desktop tab got its real capture (D14); invite-modal brightness hack removed (new capture has a bright backdrop); all 20 old QA-data PNGs pruned from `public/screenshots/`; OG cards auto-picked-up the new dashboard captures. P0-3 (QA data) and P1-3 (EN screenshots on /ar) are closed. Demo data came from the D11 seed script after the D12 i18n-hardening prerequisite.
- **Pass C.2b — photo placement (closes Pass B):** the six sourced photos (F-2/3/5/6/7/9 — D15) cropped to their slots' aspect ratios with sharp and exported as optimized WebP into `public/photos/` (19–79 KB each; JPG originals + unused F-8/F-10 moved to untracked `_photo-originals/`). Every placed `PhotoPlaceholder` replaced with `next/image` (`fill` + `sizes`, lazy — all slots are below the fold, `scaleIn` motion, alt text localized EN+AR in `lib/i18n.ts`): Problem F-2 (3:5 portrait, desktop-only column), Segments F-3/F-5/F-6 (3:2 card headers), WhyWazen F-7 (4:5, anchored `object-[50%_30%]` below `lg` so the 3:2 mobile crop keeps the subject's head), CTA F-9 (full-bleed 12% backdrop; corner slot tag removed). Fixed the aspect-ratio/min-width mobile viewport bug found during verification (learning #5). `.gitignore`'s `_preview/` entry was encoding-mangled and inert — rewritten, plus `_photo-originals/`. `PhotoPlaceholder` has no consumers left; the component stays for the optional F-4/F-8 slots, and the "NS" initials avatar remains until F-11 exists. Verified EN+AR × light+dark × desktop+mobile (32 shots in `_preview/c2b-*`).

---

## 6 · Remaining work

### Pass B — owner asset production ✅ complete

**Screenshot captures ✅ shipped (C.2a) · photo set v1 ✅ sourced and shipped (C.2b, D15 — TEMPORARY, refine post-launch).** Only the founder portrait (F-11) and the optional F-4/F-8 slots remain unsourced — none blocks launch.

**Re-capture checklist** — ✅ completed; kept as the reference sheet for any future re-capture session:

- **Demo data:** 9–12 clients, realistic regional male+female client names are fine in UI lists (data, not photography); real-looking emails (karim.a@gmail.com — never `*.client@example.com`); compliance spread 55–100%, no 0% in visible rows; templates "Used by 3/5"; seeded 6–8-message coach↔client conversation (plan feedback, not lorem); healthy adherence trend (no collapse to zero); active nutrition/medication plans (no ended-plan empty states).
- **Chrome hygiene:** tour banners dismissed, no localhost/debug overlays, production-looking URL, professional account name.
- **Desktop captures:** ~1280–1440px viewport; per-feature story crops, not full pages.
- **Phone captures (D9):** Chrome DevTools device emulation 390×844 @ DPR 3 — authentic for a PWA. Set: client Today, Plans, Check-in submit, Progress chart, Messages. Same demo session as desktop.
- **Locales:** duplicate desktop + phone key sets in Arabic UI for /ar. **Seed order (D11): seed EN → EN shots → seed AR → AR shots — never mix locales in one seeded dataset.**
- **Environment:** `VITE_SHOW_DEV_TOOLS` unset before capturing; Docker bakes `seed.ts` — rebuild the image before seeding.
- **File naming (D13):** drop files into the delivered tree — `public/Wazen-Screenshots/{Coach|Client} Dashboard/{Desktop|Mobile}/{en|ar}/<Name>.png`; `lib/screenshots.ts` maps them.

**Photography briefs** — kept as the reference sheet for the v2 refinement (D15). Global rules: no women anywhere in frame (D7), no visible third-party logos, muted/desaturated tones that let teal `#3D8C84` / sage `#7BA898` UI sit on top, no neon gym lighting. Free-license sources (Unsplash/Pexels licenses) or own shoots.

| Slot | Status | Brief |
|---|---|---|
| F-2 | ✅ v1 shipped | "The old way": man buried in admin — phone + laptop + papers, head in hand; moody/dark; must sit on dark teal `hsl(186,21%,14%)`. Alt composition: hands-only phone flooded with chat notifications. Portrait crop, Problem section side column. |
| F-3 | ✅ v1 shipped | Male coach + male client mid-session (spot, pads, form cue); authentic modern gym; horizontal 3:2; bright neutral light. Boxing/MMA reads regionally right. Segments card 1. |
| F-5 | ✅ v1 shipped (accepted D7 edge concern — D15) | Two men in advisory conversation at a table — tablet/notebook, warm non-corporate setting. Alt: flat-lay meal-prep + plan + male hands. 3:2, segments card 2. |
| F-6 | ✅ v1 shipped (bg poster/sticker noted — D15) | Male practitioner consulting male client, warm clinic/office (not hospital-sterile); supports the medication/supplement differentiator. 3:2, segments card 3. |
| F-7 / F-10 | ✅ F-7 shipped (owner's pick; F-10 held in `_photo-originals/`) | F-7: Gulf men's gym scene — coach+client or strong single subject, modern upscale gym, dignified; vertical-crop survivable. F-10: male runner on a Gulf-city corniche at dawn. Own capture likely beats stock for both. |
| F-9 | ✅ v1 shipped (pre-darkened — D15) | Calm minimal desk + laptop, dusk/moody, no people. Used at ~12% opacity under the dark CTA — texture, not subject. |
| F-4 | optional — not sourced | Male gym-goer seated between sets, phone in hand — "submitting a check-in"; client-app showcase support. |
| F-8 | optional — not sourced (a candidate sits unused in `_photo-originals/`) | Man at kitchen counter or post-workout at home, morning light, phone in hand — "Sunday check-in" routine. |
| F-11 | owner — pending | Founder portrait: Naser Shadid; casual dark/teal top; soft natural side light; plain warm background or blurred gym; chest-up; croppable to ~200px circle; light + slightly moody variants for both themes. Replaces the "NS" initials avatar in WhyWazen when it exists. |

### Launch checklist (separate from passes)

- [x] Real app URL into `lib/links.ts` (both signup + login) — `app.wazen.fit`, July 2026
- [x] BrowserFrame address-bar text matches the real app domain (Hero, Features ×5 tabs, WhyWazen, OG card)
- [ ] Click-test every CTA returns 200 (pending domain verified live)
- [ ] Re-verify OG preview via WhatsApp (primary share channel for the audience)
- [ ] Final logo SVG swapped into `components/ui/Logo.tsx` + favicon/app-icon (`app/icon.tsx`, `app/apple-icon.tsx`)
- [ ] support@wazen.fit forwarding configured (footer contact)

### Post-launch backlog

45–60s product walkthrough video as a secondary CTA · real pilot-coach testimonials (headshot + one metric each) in the reserved slots · review-platform badges · dark-mode app captures if the app ships a dark theme · **photo set v2** — replace the temporary stock set (D15) with own-shoot / Gulf-authentic photography; fix the F-5/F-6 noted concerns; source F-4/F-8 if wanted.
