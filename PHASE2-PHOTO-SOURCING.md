# Phase 2 Photo Sourcing — Briefs, Stock Routes & AI Generation

> Companion to PHASE2-DESIGN.md's photo brief list v2. Goal: Everfit-grade imagery under Wazen's constraints. Key context: every photo receives a **teal duotone / dark treatment in CSS**, so when judging candidates prioritize **composition, light direction, and subject quality** over the photo's native color grade.

---

## The strategic call: AI-generate the hero personas, stock the rest

**Why:** D7 (no women anywhere in frame, including backgrounds) is nearly impossible to guarantee in stock *gym* photography — backgrounds are uncontrollable, and hero-grade shots with clean backgrounds are the rarest kind. AI generation gives full control: subject, Gulf-plausibility, background emptiness, headline negative space, and lighting direction. This is also effectively what Everfit does — their imagery is produced/AI-assisted, not stock.

**Where stock still wins:** no-people or hands-only slots (CTA backdrop, desk scenes, meal flat-lays) — stock is faster, guaranteed-real, and D7-trivial there.

| Slot | Route | Why |
|---|---|---|
| H-1 Fitness coach (hero) | **AI** | Needs: specific composition + guaranteed-clean background + Gulf-plausible subject |
| H-2 Nutrition coach (hero) | **AI** | Same, plus male-male nutrition-consult stock barely exists (Phase 1 finding) |
| H-3 Health practitioner (hero) | **AI** | Same |
| Interleave: client on phone in gym | Stock first, AI fallback | Candid single-subject shots exist in stock |
| Interleave: coach at laptop/desk | Stock first, AI fallback | Common stock genre |
| CTA backdrop (dark desk, no people) | **Stock** (F-9 likely survives) | Zero D7 risk, abundant |
| Meal-prep flat-lay (hands only, optional) | **Stock** | Abundant, zero risk |

---

## Hero persona briefs (the three that matter most)

All three share: **vertical-safe composition** (mobile crops to ~4:5), subject on one third with **clean negative space on the other** (headline sits there), directional light (one-source, moody), **no text/logos/brands**, no other people anywhere, dark or neutral background that accepts the teal duotone. Subjects: men, 25–45, Gulf-plausible (dark hair, olive/brown skin tones read right; avoid obviously Nordic/American-collegiate looks).

**H-1 · Fitness coach** — coach standing in a dark modern gym, arms crossed or adjusting a dumbbell rack, looking off-frame (not at camera); shallow depth, gym equipment as soft bokeh. Alternative: coach spotting/instructing a male client, coach clearly the authority figure.

**H-2 · Nutrition coach** — man at a clean kitchen counter or consult table with meal-prep containers / a tablet showing nothing legible; warm-but-muted light; reads "structured nutrition professional," not "chef."

**H-3 · Health practitioner** — male practitioner in smart-casual (no white coat — too clinical for the brand) at a warm office desk, tablet or notes in hand; reads "modern wellness professional."

---

## Stock search routes (Unsplash + Pexels)

Copy-paste queries — open each on both platforms, filter by orientation as needed:

- Interleave, client on phone: `man phone gym rest`, `athlete resting bench phone`, `man checking phone workout`
- Coach at desk: `man laptop desk dark`, `man working tablet office moody`
- CTA backdrop: `dark desk setup minimal`, `workspace night laptop` (compare against current F-9 before replacing)
- Flat-lay: `meal prep containers overhead`, `healthy food flat lay hands`
- Regional long-shot attempts (low yield, worth 10 min): `dubai gym`, `middle east fitness man`, `arab athlete`

Direct search URLs (replace spaces with %20):
- `https://unsplash.com/s/photos/<query>`
- `https://www.pexels.com/search/<query>/`

**Vetting checklist per candidate (60 seconds each):** ① scan EVERY background figure for D7 — zoom in, mirrors and glass reflections count; ② no visible brand logos on clothing/equipment; ③ does the crop survive 4:5 vertical AND wide desktop? ④ will it hold under a dark teal duotone (avoid busy multicolor scenes)?

License notes: Unsplash and Pexels both allow commercial use without attribution. Avoid Unsplash+ (paid tier) images unless you subscribe; they're watermarked in search.

---

## AI generation — tools, prompts, rules

**Tools you already use** (per your stack): Ideogram, Higgsfield, Gemini (Imagen). All permit commercial use of outputs on standard paid plans — verify your current plan tier's terms once before generating the final set.

**Consistency rule:** generate all three hero personas in ONE session, same tool, same style suffix, so they read as one photoshoot. Iterate the subject line, keep the suffix fixed.

**Shared style suffix (append to every prompt):**
```
— cinematic editorial photography, dark moody atmosphere, single directional
light source, shallow depth of field, muted desaturated tones with deep teal
shadows, shot on 85mm, photorealistic, no text, no logos, no other people
in background, empty negative space on the left third of frame
```
(Flip "left" to "right" per composition needs; generate both.)

**H-1 prompt core:**
```
A fit middle-eastern man in his 30s, short dark hair and trimmed beard, wearing
a plain dark athletic t-shirt, standing in a modern upscale gym at night,
resting one hand on a dumbbell rack, looking away from camera with calm focus
```

**H-2 prompt core:**
```
A middle-eastern man in his 30s, smart-casual dark shirt, standing at a clean
minimalist kitchen counter with glass meal-prep containers and a closed
notebook, warm muted evening light from a window, calm professional presence
```

**H-3 prompt core:**
```
A middle-eastern male health practitioner in his 40s, smart-casual attire
without a white coat, seated at a warm wooden desk in a modern wellness office,
holding a tablet, soft window light, composed and approachable
```

**AI-specific vetting (beyond the stock checklist):** hands and fingers (count them), text-like artifacts on clothing/equipment (regenerate, don't retouch), skin plasticity at hero size (upscale via the tool's HD/upscale mode before judging), and the eyes if the face is visible — uncanny eyes kill trust on a hero.

**Honest disclosure consideration:** using AI imagery of *people* on a trust-sensitive page is industry-normal now (Everfit does it), and these are illustrative personas, not fake testimonials — so it doesn't collide with your no-fabricated-social-proof rule. The line you must not cross: never caption an AI person as a real coach or client, never attach a name/quote to one.

---

## Process

1. Generate/collect 3–4 candidates per hero slot + 2–3 per interleave slot.
2. Drop them into a folder and screenshot-test the best against the Option A mockup (paste over the F-7 stand-in) before committing — composition against the actual headline is the real test.
3. Final picks → `public/photos/` with slot-named files (`hero-h1-fitness.webp` etc.), WebP ≤ 200KB per PHASE2-DESIGN.md's asset budget.
4. Pass 2.3 integrates them; until then, 2.1/2.2 build against the F-7 stand-in.
