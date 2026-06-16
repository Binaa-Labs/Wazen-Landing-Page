# Wazen Landing Page — Master Build Prompt
# For: Claude Code in VS Code
# Project: Next.js (App Router) · TypeScript · Tailwind CSS
# Last updated: June 2026

---

## ROLE

You are a senior frontend engineer and product designer building the Wazen
marketing landing page. Wazen (وازن) is a B2B coaching platform for
practitioners in the UAE, GCC, and MENA region. This is a $10,000-quality
landing page — professional, motion-rich, and built to convert coaches.

Read every instruction in this prompt before writing a single line of code.

---

## STACK

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS (utility-first, no component libraries)
- Framer Motion for all animations
- next/image for all screenshots
- next/font for Google Fonts (Outfit + Inter + Tajawal)
- next/head / metadata API for SEO
- No UI component libraries (Shadcn, Radix, etc.) — build everything from scratch

---

## PROJECT STRUCTURE

```
/app
  layout.tsx        ← root layout, fonts, metadata
  page.tsx          ← landing page, imports all sections
/components
  /sections
    Nav.tsx
    Hero.tsx
    TrustBar.tsx
    Problem.tsx
    Features.tsx
    HowItWorks.tsx
    Pricing.tsx
    WhyWazen.tsx
    FAQ.tsx
    CTA.tsx
    Footer.tsx
  /ui
    Button.tsx
    Badge.tsx
    SectionHeader.tsx
/public
  /screenshots
    ← all screenshot files go here (listed below)
/styles
  globals.css       ← CSS custom properties / token definitions
```

---

## DESIGN TOKEN SYSTEM

Implement ALL of these as CSS custom properties in globals.css AND as a
Tailwind theme extension in tailwind.config.ts. Every color used in the
codebase must reference these tokens — no hardcoded hex values anywhere.

### Brand Colors (exact HSL values — do not adjust)

```css
--color-primary:        hsl(186, 21%, 26%);   /* Deep Teal — CTAs, nav, key UI */
--color-primary-hover:  hsl(186, 21%, 20%);   /* Primary hover state */
--color-primary-light:  hsl(186, 21%, 93%);   /* Teal Mist — Pricing section bg */
--color-primary-dark:   hsl(186, 21%, 14%);   /* Dark sections background */
--color-primary-darker: hsl(186, 21%, 10%);   /* Footer background */

--color-secondary:      hsl(99, 22%, 72%);    /* Sage — accents, underlines */
--color-secondary-dark: hsl(99, 20%, 42%);    /* Sage Dark — success text */
--color-secondary-light:hsl(99, 22%, 92%);    /* Sage Mist — badges */

--color-accent:         hsl(201, 20%, 23%);   /* Steel Blue — dark surface cards */

--color-ink:            hsl(0, 0%, 5%);       /* Near-black text */
--color-bg:             hsl(0, 0%, 95%);      /* Page background */
--color-surface:        hsl(0, 0%, 100%);     /* Card surfaces */

--color-error:          hsl(0, 75%, 45%);     /* Problem states */
--color-error-bg:       hsla(0, 75%, 45%, 0.05);
--color-error-border:   hsla(0, 75%, 45%, 0.15);
--color-success:        hsl(99, 20%, 42%);
--color-success-bg:     hsla(99, 20%, 42%, 0.06);
--color-success-border: hsla(99, 20%, 42%, 0.2);
```

### Typography

```css
--font-display: 'Outfit', sans-serif;   /* All headings */
--font-body:    'Inter', sans-serif;    /* All body text */
--font-arabic:  'Tajawal', sans-serif;  /* Arabic text only */
```

Load all three via next/font/google. Apply Tajawal automatically when
`dir="rtl"` is set on the html element.

### Type Scale

```
Display / H1:  clamp(2.6rem, 5.5vw, 4.4rem) · Outfit 700 · tracking -0.03em
H2:            clamp(1.9rem, 3.5vw, 2.8rem) · Outfit 700 · tracking -0.02em
H3:            clamp(1.2rem, 2vw, 1.5rem)   · Outfit 600 · tracking -0.01em
Eyebrow:       0.75rem · Inter 500 · tracking 0.08em · uppercase
Body large:    1.1rem  · Inter 400 · line-height 1.7
Body:          0.95rem · Inter 400 · line-height 1.6
Caption:       0.8rem  · Inter 400 · color: secondary text
```

### Spacing & Radius

```
Section padding:  120px top/bottom (desktop) · 80px (mobile < 768px)
Container:        max-width 1200px · padding 0 24px
Card radius:      20px
Button radius:    100px (pill)
Badge radius:     6px
Card padding:     32px (desktop) · 20px (mobile)
```

### Shadow System

```css
--shadow-sm:  0 1px 3px hsla(186, 21%, 10%, 0.06);
--shadow-md:  0 4px 16px hsla(186, 21%, 10%, 0.08);
--shadow-lg:  0 16px 48px hsla(186, 21%, 10%, 0.12);
--shadow-xl:  0 32px 64px hsla(186, 21%, 10%, 0.16);
```

---

## SECTION RHYTHM (backgrounds — implement exactly)

```
01 Nav:       hsl(0,0%,95%) — sticky, blur backdrop on scroll
02 Hero:      hsl(0,0%,95%)
03 TrustBar:  hsl(0,0%,100%) — white, hairline borders top/bottom
04 Problem:   hsl(186,21%,14%) — DARK section
05 Features:  hsl(0,0%,95%)
06 HowItWorks:hsl(0,0%,100%) — white
07 Pricing:   hsl(186,21%,93%) — Teal Mist
08 WhyWazen:  hsl(0,0%,95%)
09 FAQ:       hsl(0,0%,100%) — white
10 CTA:       hsl(186,21%,14%) — DARK section
11 Footer:    hsl(186,21%,10%) — darkest
```

The two dark sections (Problem + CTA) use `hsl(186,21%,14%)` — derived
directly from the primary brand color. They must feel on-brand, not
generic black.

---

## SIGNATURE ELEMENT

On both dark sections (Problem and CTA), render the Arabic wordmark وازن
as a large ghost typographic element BEHIND the content:

```css
position: absolute;
font-family: 'Tajawal', sans-serif;
font-size: clamp(10rem, 22vw, 18rem);
font-weight: 800;
color: white;
opacity: 0.04;
user-select: none;
pointer-events: none;
white-space: nowrap;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 0;
```

All section content sits at `z-index: 1` relative to this ghost element.

---

## MOTION SYSTEM

Use Framer Motion for all animations. Wrap the page in a single
`<MotionConfig reducedMotion="user">` to respect accessibility preferences.

### Scroll reveal (apply to ALL section content blocks)

```typescript
// Use this pattern for every major content block
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
}

// For staggered children (card grids, lists):
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`.

### Hero screenshot reveal (on page load, not scroll)

```typescript
// Browser frame animates in on mount
initial: { opacity: 0, rotateX: 8, scale: 0.96 }
animate: { opacity: 1, rotateX: 0, scale: 1 }
transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
```

Apply `perspective: 1200px` to the wrapper div.

### Hover interactions

```typescript
// All CTA buttons
whileHover: { y: -3 }
transition: { duration: 0.22, ease: "easeOut" }

// Feature cards, step cards, pricing cards
whileHover: { y: -4, boxShadow: "var(--shadow-lg)" }
transition: { duration: 0.25, ease: "easeOut" }

// Offer item cards (horizontal nudge)
whileHover: { x: 4 }
```

### Feature tab switch

```typescript
// Screenshot swap animation
AnimatePresence mode="wait"
initial: { opacity: 0, x: 16 }
animate: { opacity: 1, x: 0 }
exit:    { opacity: 0, x: -16 }
transition: { duration: 0.3, ease: "easeOut" }
```

### Problem section list items (staggered reveal)

Each ✕ and ✓ list item fades up with 60ms stagger offset.

---

## SECTION-BY-SECTION SPECIFICATIONS

---

### 01 — NAV

**Background:** `hsl(0,0%,95%)` → on scroll: `backdrop-filter: blur(20px)` +
semi-transparent background + `box-shadow: var(--shadow-sm)`

**Structure:**
- Centered floating pill shape: `max-width: 720px`, `border-radius: 100px`,
  `border: 1px solid hsla(186,21%,26%,0.1)`
- Positioned: `fixed top-8 left-1/2 -translate-x-1/2`
- On scroll (scrollY > 20): shrinks to `top-4`, adds shadow and blur

**Contents (left to right):**
- Logo: "Wazen" in Outfit 700 + "وازن" in Tajawal below at 60% scale +
  "Powered by Binaa Labs" micro-text
- Nav links (desktop only): Features · How it works · Pricing · FAQ
- Right side: Language toggle (EN/AR) + Theme toggle + "Start free" CTA button

**Mobile (< 768px):**
- Logo only visible in pill
- Hamburger menu icon → slide-down mobile menu with all links + CTA

**Anchor links:** Each nav link scrolls smoothly to its section ID.

---

### 02 — HERO

**Layout:** Centered, max-width 860px, text-center

**Content (top to bottom):**

1. Badge pill: pulsing green dot + "Free for your first 5 clients — full
   platform, no limits"

2. H1 headline (two lines):
   ```
   Run your coaching practice from
   one calm, organized place
   ```
   The second line gets the signature wavy underline in `--color-secondary`
   (SVG wave path, same as existing implementation)

3. Below H1 (bilingual identity element — UNIQUE to this design):
   Arabic translation at 55% of H1 size, `color: --color-primary`,
   `font-family: Tajawal`, `opacity: 0.65`:
   ```
   أدِر عملك مع عملائك من مكان واحد، منظّم وسلس
   ```

4. Subheadline: "Wazen brings your clients, plans, check-ins, progress, and
   messages into a single system — so you spend less time chasing and more
   time coaching."

5. Dual CTA row:
   - Primary: "Start free — up to 5 clients" → `https://app.wazen.com/signup`
     Background: `--color-primary` · text: white · pill shape
   - Secondary: "See how it works ↓" → smooth scroll to #features
     Background: transparent · border: `1px solid --color-primary` · text: `--color-primary`

6. Trust micro-copy below CTAs:
   "✓ No credit card required  ✓ Free forever for 5 clients  ✓ Arabic & English"
   Font size: 0.8rem · color: secondary text · inline flex with gaps

7. Browser frame mockup (Framer Motion reveal on load):
   - Outer wrapper: `perspective: 1200px`
   - Browser chrome: dots (red/yellow/green) + URL bar showing `app.wazen.com/dashboard`
   - Screenshot: `Coach-Dashboard.png` (fill the frame, object-position: top)
   - Frame has `border-radius: 16px`, subtle border, `box-shadow: var(--shadow-xl)`
   - On hover: `rotateX(0deg)` settle, slight lift

---

### 03 — TRUST BAR

**Background:** White · hairline borders top and bottom

**Layout:** Single row, centered, flex with dividers between items

**Content (4 items):**
- "Built for UAE, GCC & MENA"
- "Arabic & English — full RTL support"
- "Free for your first 5 clients"
- "Powered by Binaa Labs"

Each item: small icon (inline SVG or appropriate Heroicon) + text at 0.85rem.
Dividers: `1px solid hsla(0,0%,0%,0.08)` between items.
Full width fade animation on scroll-into-view.

---

### 04 — PROBLEM (DARK SECTION)

**Background:** `hsl(186,21%,14%)` — dark teal

**Ghost element:** وازن behind content at opacity 0.04 (see Signature Element)

**Section header:**
- Eyebrow badge: "The scattered-tools problem" — error red background,
  `hsl(0,75%,45%)` text
- H2: "The problem isn't your coaching — it's your tools"
  Color: white
- Description: color `hsla(255,255,255,0.7)`

**Comparison grid:** Two cards side by side (stack on mobile)

LEFT CARD — "The Old Way":
- Background: `hsla(0,75%,45%,0.06)` · border: `1px solid hsla(0,75%,45%,0.15)`
- Header: red dot indicator + "The Old Way (Scattered Tools)"
- 4 list items with ✕ icons (red circle background):
  1. Living in your DMs — Client check-ins buried in endless WhatsApp chats
  2. Plans in spreadsheets & PDFs — Files clients lose, forget, or can't open
  3. Chasing check-ins manually — Texting every client individually
  4. No clear view of progress — Results scattered across notes and sheets
- Each list item stagger-animates in on scroll (60ms offset)

RIGHT CARD — "The Wazen Way":
- Background: `hsla(99,22%,72%,0.06)` · border: `1px solid hsla(99,22%,72%,0.2)`
- Header: green dot indicator + "The Wazen Way (One System)"
- 4 list items with ✓ icons (sage green circle background):
  1. Everything in one place — Clients, plans, check-ins, progress, messages
  2. Plans in the client app — Clients follow them clearly in their own app
  3. Structured check-ins — Review them all from one dashboard
  4. Progress you can actually see — Clear charts and summaries
- Same stagger animation, 100ms delay offset from left card

Both cards: `border-radius: 20px` · `padding: 36px`
Text colors: white for headings, `hsla(255,255,255,0.75)` for body

---

### 05 — FEATURES (FEATURE SHOWCASE)

**Background:** `hsl(0,0%,95%)`

**Section header:**
- Eyebrow: "Everything you need"
- H2: "One platform. Every tool your coaching practice needs."
- Description: "Stop stitching together apps. Wazen brings client management,
  plans, check-ins, progress tracking, and messaging into one organized system."

**Layout:** Tab navigation + screenshot panel

**4 Feature tabs** (horizontal tab row, scrollable on mobile):

Tab 1 — "Client Management"
- Icon: users icon
- Headline: "Every client, fully organized"
- Body: "Manage all your clients from one dashboard. See their compliance,
  upcoming check-ins, active plans, and recent activity at a glance."
- Screenshots to use:
  - Primary: `Coach-Client_Tab.png` (client roster with compliance scores)
  - Secondary: `Coach-Client-VIEW.png` (individual client overview)

Tab 2 — "Check-ins"
- Icon: clipboard-check icon
- Headline: "Structured check-ins, zero chasing"
- Body: "Create check-in schedules for each client. They submit from their app,
  you review everything from one organized queue — no more hunting through messages."
- Screenshots to use:
  - Primary: `Coach-Dashboard.png` (attention queue showing check-ins)
  - Secondary: `Coach-Client-VIEW-Check-ins.png` (check-in management tab)

Tab 3 — "Progress & Analytics"
- Icon: trending-up icon
- Headline: "See exactly how your clients are doing"
- Body: "Track weight, body metrics, and adherence over time. The analytics
  dashboard shows plan performance, top performers, and at-risk clients across
  your entire roster."
- Screenshots to use:
  - Primary: `Client-Progress-Tab.png` (client-side progress with clean downward trend)
  - Secondary: `Coach-Analytics-Tab1.png` (analytics overview)

Tab 4 — "Plans & Templates"
- Icon: layout-grid icon
- Headline: "Build plans once, assign to anyone"
- Body: "Create workout and nutrition plans from scratch or from your template
  library. Assign to any client in seconds — they appear instantly in the client app."
- Screenshots to use:
  - Primary: `Coach-Template-Tab.png` (template library)
  - Secondary: `Coach-Client-VIEW-Workout.png` (assigned workout plans)

**Tab interaction:**
- Active tab: `background: --color-primary` · text: white · pill shape
- Inactive tab: transparent · text: secondary · hover: primary tint background
- Screenshot panel: AnimatePresence with slide transition on tab change
- Screenshot displayed in browser frame (same chrome as hero, smaller)
- Below screenshot: small caption matching the secondary screenshot description

**The 2-in-1 proof point** (below the tab panel):
- Side-by-side mini cards: "Coach Dashboard" (left) + "Client App" (right)
  with an arrow or connector between them
- Coach card: `Coach-Dashboard.png` thumbnail
- Client card: `Client-Dashboard-Tab.png` thumbnail
- Caption: "A coach dashboard and a client app — working as one connected system"

---

### 06 — HOW IT WORKS

**Background:** White

**Section header:**
- Eyebrow: "How it works"
- H2: "From scattered to organized in three steps"
- Description: "No migration headaches, no technical setup. Bring your clients
  in, assign their plans, and follow their progress — all from one place."

**3-step layout:** Horizontal row on desktop, vertical on mobile

Each step card:
- Background: white · border: `1px solid hsla(186,21%,26%,0.08)`
- `border-radius: 20px` · `padding: 36px`
- Step number: Large ghost number (01/02/03) at top-right, Outfit 800,
  `opacity: 0.05`, `color: --color-primary`, `font-size: 6rem`
- Step icon: small icon in a teal tint circle
- H3 heading
- Body paragraph

Step 01 — "Add your clients"
Icon: user-plus
Body: "Invite your clients by email. They join and set up their profile in the
Wazen client app in minutes — no technical setup required on their end."
Screenshot reference: `Coach-Invite-Client.png` as a small inline visual

Step 02 — "Assign plans & check-ins"
Icon: clipboard-list
Body: "Give each client their workout and nutrition plans and check-in schedule.
Everything appears instantly in their app."
Screenshot reference: `Client-Plans-Tab.png` as a small inline visual

Step 03 — "Track progress & stay in touch"
Icon: chart-line-up
Body: "Review check-ins from your dashboard, follow each client's progress
charts, and message them directly — all from one organized place."
Screenshot reference: `Coach-Analytics-Tab2.png` as a small inline visual

**Connector between steps (desktop only):**
A subtle dashed line with a right-pointing arrow connecting the three cards,
color: `hsla(186,21%,26%,0.2)`

---

### 07 — PRICING

**Background:** `hsl(186,21%,93%)` — Teal Mist

**Section header:**
- Eyebrow: "Simple pricing"
- H2: "Start free. Grow on your terms."
- Description: "Your first 5 clients are always free. Upgrade when you're
  ready to grow your practice."

**Billing toggle:** Monthly | Yearly (Save 2 months)
- Toggle is a pill-shaped switch, animated with Framer Motion
- When Yearly selected: prices update to yearly, show "Save $X/year" badge

**3-column pricing table:**

All three cards: `border-radius: 20px` · white background · `padding: 32px`

STARTER (left):
- Label: "Starter"
- Price: "Free" (large display) · "forever" below
- Highlight: "Up to 5 active clients"
- Feature list (checkmarks):
  ✓ Full core platform
  ✓ Client app access
  ✓ Plans & templates
  ✓ Check-ins & messaging
  ✓ Client analytics
  ✓ Standard support
- CTA: "Start free" (outlined button)

PROFESSIONAL (center — FEATURED):
- Badge above card: "Most popular" in sage green background
- Border: `2px solid --color-primary`
- Label: "Professional"
- Monthly price: "$49/month" · Yearly: "$490/year"
- Yearly savings badge: "Save $98/year"
- Highlight: "20 active clients included · up to 30 with add-ons"
- Feature list:
  ✓ Everything in Starter
  ✓ 20 active clients (up to 30)
  ✓ Priority support
  ✓ Standard progress report export
  ✓ Scheduled messages
  ✓ Extra client bundles available
- Add-on note: "+5 clients from $12/mo · +10 clients from $20/mo"
- CTA: "Get started" (filled primary button)

PREMIUM (right):
- Label: "Premium"
- Monthly price: "$99/month" · Yearly: "$990/year"
- Yearly savings badge: "Save $198/year"
- Highlight: "50 active clients included · scale to 100+"
- Feature list:
  ✓ Everything in Professional
  ✓ 50 active clients (scale to 100+)
  ✓ Highest priority support
  ✓ Advanced progress report export
  ✓ Advanced automation
  ✓ Suggested follow-up list
  ✓ Basic branding customization
- Add-on note: "+10 clients from $18/mo · up to +50 clients"
- CTA: "Get started" (outlined button)
- Note below: "Full white-label branding — coming soon"

**Value comparison strip** (below pricing cards):
"Most coaches pay $400+/month across separate tools.
Wazen replaces all of them."
Subtle list: WhatsApp (free but chaos) + Spreadsheets + Form tools +
Progress trackers = "$400+/mo" crossed out → "Wazen from $49/mo"

---

### 08 — WHY WAZEN

**Background:** `hsl(0,0%,95%)`

**Section header:**
- Eyebrow: "Why Wazen"
- H2: "Built around how coaches actually work"
- Description: "Designed around real coaching workflows — clients, plans,
  check-ins, progress, and communication — for coaches across the UAE, GCC,
  and MENA, in both Arabic and English."

**Stats row (3 items):**
- "5" — "Active clients free, forever — with full core platform access"
- "6+" — "Scattered tools replaced — WhatsApp, spreadsheets, PDFs, forms,
  notes, reminders"
- "2-in-1" — "A coach dashboard and a client app, working as one connected system"

Stat numbers: `clamp(2.4rem, 4.5vw, 3.8rem)` · Outfit 800 · `--color-primary`
Dividers between stats (desktop) · horizontal rule between stats (mobile)

**Bilingual trust badge:**
Centered badge: "العربية & English — full right-to-left support"
Background: `--color-secondary-light` · text: `--color-secondary-dark`

**Coach profile proof point** (using real screenshot):
Show `Client-Coach-Profile-View.png` in a device frame or card frame.
Caption: "Coaches build a public profile clients can view — with active
clients, programs delivered, compliance rate, and experience."
This replaces the founder quote as social proof. The screenshot shows
real metrics (13 clients, 89% compliance rate, 8y experience).

**Founder origin story** (below, clearly framed as "Why we built this"):
Card with left sage-green border accent:
Quote: "We built Wazen because coaching shouldn't mean living in WhatsApp
threads and spreadsheets. Every coach deserves one calm, organized place
to manage clients, deliver plans, and actually see progress — so the focus
stays on coaching, not admin."
Attribution: "Naser Shadid · Founder, Wazen (by Binaa Labs)"
Avatar: "NS" initials in teal circle

---

### 09 — FAQ

**Background:** White

**Section header:**
- Eyebrow: "FAQ"
- H2: "Questions coaches ask before switching"

**8 questions, accordion interaction:**
Each item: question row (click to expand) + answer panel
Transition: `max-height` + `opacity` · 0.28s ease-in-out
Chevron rotates 180° when open

Q01: "Is Wazen really free? What's the catch?"
A: "No catch. Your first 5 active clients are free forever — full platform
access, no credit card required, no trial timer. The free tier exists so you
can run your practice on Wazen before deciding to grow. When you're ready to
take on more clients, paid plans start at $49/month. Until then, nothing
changes and nothing expires."

Q02: "Do my clients need to pay or create an account to use Wazen?"
A: "Your clients pay nothing. Ever. You invite them to the Wazen client app
and they join for free — no subscription, no hidden fees on their end. The
client app is included in your plan. They access their plans, check-ins, and
progress through their own dedicated app, completely separate from your coach
dashboard."

Q03: "How long does it take to get set up?"
A: "Most coaches are fully set up within a day. Create your account, invite
your first client, assign their plan and check-in schedule — that's the full
flow. There's no data migration required, no technical configuration, and no
onboarding call needed."

Q04: "What happens to my clients and their data if I reach my limit and don't upgrade?"
A: "Nothing is deleted. If you reach your active client limit, you can
deactivate a current client to free up a slot — their full history and data is
preserved and accessible for 90 days (Starter), 180 days (Professional), or
365 days (Premium) after deactivation. You only upgrade when you want to manage
more active clients simultaneously. Your data is always yours."

Q05: "Does Wazen work in Arabic? Is it built for coaches in the region?"
A: "Yes — fully. Wazen is built in both Arabic and English, with complete
right-to-left support. The coach dashboard and the client app both switch
languages. It's designed specifically for coaches operating in the UAE, GCC,
and broader MENA region — built into the product from the ground up, not
added as an afterthought."

Q06: "Is my clients' data safe and private?"
A: "Yes. All data is encrypted in transit and at rest. Your clients' health,
progress, and personal information is never shared with third parties. As the
coach, you own and control your client data. Wazen is built by Binaa Labs —
a UAE-based software studio."

Q07: "Can I cancel anytime? Is there a contract?"
A: "No contracts, no lock-in. Cancel anytime from your account settings and
you won't be charged again. Your access continues until the end of your current
billing period, and your data remains accessible throughout. We don't believe
in making it hard to leave."

Q08: "What's the difference between the paid plans?"
A: "The main difference is active client capacity and a few advanced features.
Starter is free for up to 5 clients. Professional ($49/mo) includes 20 active
clients (up to 30 with add-ons), priority support, standard report export, and
scheduled messages. Premium ($99/mo) includes 50 clients (scalable to 100+),
advanced automation, suggested follow-up lists, and basic branding
customization. Full plan comparison is in the pricing section above."

---

### 10 — CTA (DARK SECTION)

**Background:** `hsl(186,21%,14%)`

**Ghost element:** وازن behind content at opacity 0.04 (same as Problem section)

**Layout:** Two-column grid on desktop · single column on mobile

LEFT — Info:
- Badge: "Free to start — no credit card" (sage green tint)
- H2: "Bring your coaching into one organized place" · color: white
- Body: "Create your free account and start managing up to 5 active clients
  with the full platform — plans, check-ins, progress, and messaging."
  color: `hsla(255,255,255,0.8)`
- Trust badges (vertical list):
  ✓ Free for your first 5 clients
  ✓ No credit card required
  ✓ Full core platform
  ✓ Arabic & English

RIGHT — Signup card:
- Background: white · `border-radius: 20px` · `padding: 36px`
- Title: "Create your free account" · `--color-primary`
- Sub: "Up to 5 active clients · Full core platform · No credit card"
- Feature list (3 items with sage checkmarks):
  ✓ Manage clients, plans & check-ins
  ✓ Client mobile app included
  ✓ Progress tracking & messaging
- Primary CTA button (full width): "Start free — up to 5 clients"
  → `https://app.wazen.com/signup`
- Login link: "Already using Wazen? Log in"

---

### 11 — FOOTER

**Background:** `hsl(186,21%,10%)`

**Layout:** Two rows

Row 1: Logo (Wazen + وازن) on left · links on right
Links: Terms of Service · Privacy Policy · Contact Support
Text color: `hsla(255,255,255,0.5)` · hover: white

Row 2: "© 2026 Wazen by Binaa Labs. All rights reserved."
Text color: `hsla(255,255,255,0.35)`

---

## SCREENSHOT ASSET MAP

All screenshots live in `/public/screenshots/`. Use next/image for all.

```
HERO:
  Coach-Dashboard.png              → Hero browser frame

FEATURE SHOWCASE:
  Coach-Client_Tab.png             → Feature 1 primary (client management)
  Coach-Client-VIEW.png            → Feature 1 secondary
  Coach-Dashboard.png              → Feature 2 primary (check-ins queue)
  Coach-Client-VIEW-Check-ins.png  → Feature 2 secondary
  Client-Progress-Tab.png          → Feature 3 primary (progress — CLIENT SIDE)
  Coach-Analytics-Tab1.png         → Feature 3 secondary
  Coach-Template-Tab.png           → Feature 4 primary (templates)
  Coach-Client-VIEW-Workout.png    → Feature 4 secondary

HOW IT WORKS (small inline visuals):
  Coach-Invite-Client.png          → Step 1
  Client-Plans-Tab.png             → Step 2
  Coach-Analytics-Tab2.png         → Step 3

2-IN-1 PROOF POINT:
  Coach-Dashboard.png              → Coach side thumbnail
  Client-Dashboard-Tab.png         → Client side thumbnail

WHY WAZEN:
  Client-Coach-Profile-View.png    → Coach public profile proof point

MESSAGING PROOF (optional, use in Features or Why Wazen):
  Coach-Messagin-Tab.png           → Coach messaging
  Client-Messaging-Tab.png         → Client messaging
```

---

## BILINGUAL SYSTEM (EN/AR)

Preserve the existing i18n system from the old implementation:

- Language state: React context or localStorage
- Toggle: "EN" ↔ "ع" button in nav
- On switch: `document.documentElement.setAttribute('dir', 'rtl')`
  and `document.documentElement.setAttribute('lang', 'ar')`
- Arabic font (Tajawal) loads automatically via CSS:
  ```css
  [dir="rtl"] body { font-family: 'Tajawal', sans-serif; }
  [dir="rtl"] h1, h2, h3, h4 { font-family: 'Tajawal', sans-serif; }
  ```
- RTL-specific layout fixes:
  - Nav actions move to left edge
  - Browser mockup address bar stays LTR (`dir="ltr"` override)
  - Step numbers flip to opposite corner
  - Offer card hover nudge reverses direction

All user-facing text strings must be defined in a single `i18n.ts` file
with EN and AR keys. No hardcoded text strings in component JSX.

---

## DARK MODE

Implement full dark mode via `prefers-color-scheme` media query +
localStorage persistence + toggle button in nav.

Dark mode token overrides:
```css
html.dark {
  --color-bg:      hsl(220, 20%, 6%);
  --color-surface: hsl(220, 20%, 9%);
  --color-ink:     hsl(220, 10%, 95%);
  /* Primary, secondary, accent stay the same — they're already saturated */
  --color-primary-light: hsl(186, 21%, 12%);
  --color-secondary-light: hsl(99, 22%, 10%);
}
```

---

## SEO

In `/app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: 'Wazen — Run your coaching practice from one calm, organized place',
  description: 'Wazen brings your clients, plans, check-ins, progress, and
    messages into a single system — built for coaches in UAE, GCC & MENA.
    Free for your first 5 clients.',
  keywords: ['coaching platform', 'coach app', 'client management',
    'UAE coach', 'GCC fitness coach', 'منصة تدريب', 'تطبيق مدرب'],
  openGraph: {
    title: 'Wazen — One calm, organized place for your coaching practice',
    description: 'Free for your first 5 clients. Built for coaches in UAE,
      GCC & MENA. Arabic & English.',
    url: 'https://wazen.com',
    siteName: 'Wazen',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wazen — Coaching platform for UAE & GCC',
    description: 'Free for your first 5 clients. Plans, check-ins, progress,
      messaging — all in one place.',
  },
  alternates: {
    canonical: 'https://wazen.com',
    languages: { 'ar': 'https://wazen.com?lang=ar' }
  },
  robots: { index: true, follow: true }
}
```

Use semantic HTML throughout: `<main>`, `<section>`, `<nav>`, `<footer>`,
proper heading hierarchy (one H1, H2 per section, H3 for cards).

---

## PERFORMANCE RULES

- All images: `next/image` with explicit `width` and `height`, `loading="lazy"`
  (except hero which uses `priority`)
- Fonts: `next/font/google` with `display: 'swap'`
- No layout shift: reserve aspect ratios for all image slots before load
- Animations: CSS transforms only (`transform`, `opacity`) — never animate
  `width`, `height`, `top`, `left`, or `margin`
- Bundle: no heavy animation libraries other than Framer Motion

---

## ACCESSIBILITY

- All interactive elements keyboard-focusable
- Focus rings: `outline: 2px solid --color-primary` · `outline-offset: 2px`
- Images: meaningful alt text on all screenshots
- Reduced motion: `<MotionConfig reducedMotion="user">` wraps the page
- Color contrast: all text meets WCAG AA minimum
- Semantic HTML landmark elements throughout

---

## BUILD ORDER

Build in this exact order to maintain clean component boundaries:

1. `globals.css` — all CSS tokens + base resets
2. `tailwind.config.ts` — extend theme with brand tokens
3. `app/layout.tsx` — fonts, metadata, html/body wrapper
4. `components/ui/` — Button, Badge, SectionHeader (reusable primitives)
5. Nav.tsx
6. Hero.tsx
7. TrustBar.tsx
8. Problem.tsx
9. Features.tsx (most complex — tabs + screenshots)
10. HowItWorks.tsx
11. Pricing.tsx (billing toggle logic)
12. WhyWazen.tsx
13. FAQ.tsx (accordion logic)
14. CTA.tsx
15. Footer.tsx
16. `app/page.tsx` — assemble all sections
17. i18n.ts — all EN/AR strings
18. Dark mode — wire up toggle + localStorage persistence
19. Final pass — scroll animations, motion polish, mobile responsive review

---

## WHAT NOT TO DO

- Do not use any UI component library (no Shadcn, Radix, Headless UI)
- Do not hardcode any hex color values — always use CSS tokens
- Do not use `<img>` tags — always `next/image`
- Do not animate layout properties (width, height, top, left, margin)
- Do not use the Pages Router — App Router only
- Do not put all sections in one file — one component per section
- Do not use placeholder/lorem text anywhere — all real copy is provided
- Do not show a white-label feature as available — mark it "coming soon"
- Do not use $39/mo as a price — correct prices are $49 (Pro) and $99 (Premium)
- Do not fabricate testimonials — use the coach profile screenshot instead

---

## COPY REFERENCE (key strings — use exactly as written)

Hero H1:       "Run your coaching practice from one calm, organized place"
Hero Arabic:   "أدِر عملك مع عملائك من مكان واحد، منظّم وسلس"
Hero sub:      "Wazen brings your clients, plans, check-ins, progress, and
                messages into a single system — so you spend less time
                chasing and more time coaching."
Primary CTA:   "Start free — up to 5 clients"
Secondary CTA: "See how it works ↓"

Problem H2:    "The problem isn't your coaching — it's your tools"
Features H2:   "One platform. Every tool your coaching practice needs."
Steps H2:      "From scattered to organized in three steps"
Pricing H2:    "Start free. Grow on your terms."
Why H2:        "Built around how coaches actually work"
FAQ H2:        "Questions coaches ask before switching"
CTA H2:        "Bring your coaching into one organized place"

Founder quote: "We built Wazen because coaching shouldn't mean living in
                WhatsApp threads and spreadsheets. Every coach deserves one
                calm, organized place to manage clients, deliver plans, and
                actually see progress — so the focus stays on coaching, not
                admin."
Attribution:   "Naser Shadid · Founder, Wazen (by Binaa Labs)"

Footer copy:   "© 2026 Wazen by Binaa Labs. All rights reserved."

---

*End of prompt. Build sequentially. Do not skip sections.*
*Ask for clarification on any ambiguity before building, not during.*
