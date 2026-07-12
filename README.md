# Wazen Landing Page

Marketing landing page for **Wazen (وازن)** — a B2B2C coaching platform (coach dashboard + PWA client app) for fitness coaches, nutrition coaches, and health practitioners in the UAE, GCC, and MENA. Bilingual English/Arabic with full RTL support, light + dark themes.

This repo is the landing page (**wazen.fit**) only — not the app. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. A product of Binaa Labs.

**→ Read [PROJECT.md](PROJECT.md) first** — it is the single source of truth: product context, tech conventions, decisions log, do-not-regress learnings, revamp status, and remaining work.

## Development

```bash
npm install
npm run dev     # http://localhost:3000 (EN) · /ar (Arabic)
npm run build   # production build
npm run lint
```

Deployed on Vercel: branch pushes create preview deployments; `main` is production. Work on feature branches (currently `feat/landing-revamp`) — never commit to `main` directly.
