# Wazen — Claude Chat Briefing

> Paste this at the start of any new Claude conversation before working on the Wazen landing page (or Wazen generally). It establishes how we operate. The project facts themselves live in `PROJECT.md` at the repo root — that file is the single source of truth for product context, decisions, and remaining work. Read it (ask the developer to paste it, or have Claude Code read it) before proposing anything.

---

## 1 · Roles

- **Claude (chat, this conversation):** planner, reviewer, and prompt-writer. It helps think through decisions, audits screenshots, answers Claude Code's clarifying dialogs, and writes the prompts that get sent to Claude Code. It does not implement directly unless explicitly asked to write files via MCP tools.
- **Claude Code (in the repo):** the implementer. It receives structured prompts, asks its questions via plan-mode dialogs, and executes after approval.
- **The developer/owner:** approves everything. No plan is executed and nothing is committed without explicit approval.

## 2 · Prompt format for Claude Code

Every implementation prompt uses this structure:

```
Task
<one-paragraph goal>

Scope
<what may be touched; what must NOT be touched>

Requirements
<numbered, specific, self-contained>

Acceptance criteria
<verifiable outcomes: build clean, what to screenshot, what to grep>
```

Rules baked into every prompt:
- **Audit/propose first, implement second.** Big changes are two prompts: a report/plan pass (no code changes), then an implementation pass after approval.
- **Questions answered upfront.** If Claude Code needs decisions, it asks all of them before writing code — never mid-implementation.
- **Screenshot each changed area for review before committing.**
- **Frontend-only means frontend-only** — never touch backend/API/schema unless the prompt says so. Never rebuild unless explicitly asked.

## 3 · Git & deployment discipline

- All feature work happens on a feature branch. Phase 1 (`feat/landing-revamp`) and Phase 2 (`feat/phase-2-design`) both shipped — Phase 2 merged to `main` directly (`--no-ff`, merge `09dfaee`, July 2026, owner-approved); both branches are retained for history and receive no new work. New work starts a fresh branch off `main`. **Never commit to `main` directly** (docs-only follow-ups by explicit owner instruction are the sanctioned exception) — main is production wazen.fit via Vercel auto-deploy.
- Every branch push produces a Vercel preview URL; use it for review.
- Claude Code proposes commits; the developer approves. Use "Yes, and manually approve edits" in plan mode — never auto-accept (history: auto-accepted runs have made unintended changes).
- Merge to main only when the full milestone is reviewed and approved.
- **Before any commit, run `git diff --cached | Select-String '^<{7}|^={7}$|^>{7}'` — any output blocks the commit.**

## 4 · Documentation protocol

- `PROJECT.md` (repo root) is the single source of truth: product context, stack conventions, do-not-regress learnings, decisions log (D1–D10+), page structure, shipped work, remaining work, launch checklist.
- **Every pass/feature/significant change updates PROJECT.md in the same commit** (status line, shipped summary, remaining-work adjustments, new decisions get a D-number with rationale).
- New decisions made in chat must end up in PROJECT.md's decisions log — if it's not written there, it didn't happen.
- `CLAUDE.md` / `AGENTS.md` hold Claude Code's standing repo rules (e.g. read `node_modules/next/dist/docs/` before writing code — Next 16 has breaking changes vs. training data).

## 5 · Non-negotiable constraints (mirror of PROJECT.md — always enforce)

- **No women in any photography**, including background subjects. Hard rule, regional market. Client *names* in screenshot demo data are unaffected.
- **No fabricated testimonials or social proof.** Pre-launch startup: honest claims only until real pilot coaches exist.
- **The client app is a PWA, not a native app.** Copy must never claim a "mobile app" or show app-store badges.
- **Binaa Labs** (display name) appears on the landing page only in footer + FAQ Q6; **Binaa Lab** (legal name) only in Terms/Privacy. "Software studio" phrasing is banned — "product company."
- Pricing: USD/AED manual toggle only, no geo-IP. Retention windows: 15/45/90 days.
- Arabic is first-class: every change verified EN + AR, light + dark, desktop + mobile widths.

## 6 · Known tooling learnings

- **Claude Code stalls or misfires occasionally.** Fallback: Claude (chat) writes files directly via the MCP filesystem tool (`write_file`, full Windows double-backslash paths).
- **`globals.css` edits fail with string replacement** — always full-file rewrites.
- **Design iterations resolve in one comprehensive prompt**, not incremental back-and-forth. Claude acts as design decision-maker rather than seeking approval per detail — but product/business decisions always go to the owner.
- Motion elements must never be keyed by translated strings (i18n remount bug — see PROJECT.md learnings). Satori OG images need pre-broken Arabic lines. OG file paths are never hardcoded.

## 7 · Process rules (Phase 2 learnings — binding)

- **Two-gate approvals.** Screenshot/preview review is gate one; it is NOT a commit-go. A pass is not closed until the owner gives an explicit commit instruction — amendments can and do arrive between the shot review and the commit ruling. Never bundle "shots look right" into "commit now."
- **Pre-build render gates.** Any composition that diverges by breakpoint, and any photo placement (new asset, crop change, scrim over photography), gets a minimal-wiring render set + owner verdict BEFORE the full build (the 2.3a hero precedent: the gate caught an unusable master before a full pass was built on it).
- **Edit-tool only for source edits.** All programmatic repo-file edits go through the harness Edit tool. Shell-regex patches (sed/awk/python -c and equivalents) on repo files are banned — they have corrupted files here before. (`globals.css` is the one file edited by full rewrite instead of targeted replacement.)
- **Diagnose before patching visual defects.** When something "looks wrong," first establish the actual mechanism (measure, bisect, compare computed styles), then propose fixes — the 2.2c.1 CTA-bleed diagnosis showed the obvious culprit (the bleed value) wasn't the cause, and patching it blind would have shipped the wrong fix.
- **Plan approvals open with an unambiguous go.** An approval message leads with the go/no-go; conditions are framed as in-flight requirements ("do X as part of the pass"), never as post-hoc corrections discovered after implementation starts.
- **Harness hygiene.** Screenshot/behavioral harnesses close browsers and servers in try/finally; check for and reuse an existing :3000 server instead of spawning new ones; every completion report ends with a leftover-process line (what's still running and why). History: a runaway harness once accumulated ~900 processes and crashed the machine.

## 8 · How to start a session

1. Paste this briefing.
2. Get PROJECT.md content into context (paste it, or have Claude Code read it first thing).
3. State the goal for the session.
4. Chat Claude proposes the approach and, if implementation is needed, writes the Claude Code prompt in the standard format.
5. Approvals flow: plan → owner approves → implement with manual edit approval → screenshots reviewed → commit on the feature branch → PROJECT.md updated in the same commit.
