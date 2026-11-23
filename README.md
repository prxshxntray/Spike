# Spike

A personal, mobile-first SNN learning app. React + TypeScript + Vite, Motion, KaTeX, Zod. No login, backend, AI API key, or paid service is required for learning.

## Run

Use Node 22.13+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open the printed URL. For your iPhone on the same Wi-Fi use the Network URL. A plain HTTP LAN URL is useful for previewing; service workers and reliable offline installation require HTTPS. Build and preview production locally:

```sh
npm run build
npm run preview
npm test
npm run test:e2e
```

The Playwright test uses an iPhone 14 viewport in Chromium. Install its browser if needed with `npx playwright install chromium`. This emulation is not physical-device Safari verification.

## Deploy & install

Deploy this `spike` directory, not the parent Mastery app. Vercel: import the repository, set Root Directory to `spike`, build `npm run build`, output `dist`. Netlify: base `spike`, build `npm run build`, publish `dist`. Config files are included. For a standalone repository leave Root/Base at its root.

In Safari on your iPhone, open the deployed HTTPS link, tap Share → Add to Home Screen, and enable Open as Web App if available. Open the icon online once and wait for **Offline ready**. Test airplane mode before the commute. Your Mac can then be off. Papers, ChatGPT, and Sheets links still need internet.

The production build generates a versioned service worker from every built asset, including fonts, lesson content and icons. A successful install caches the complete learning app. Updates wait for old app windows to close before activation. Progress is separate from the cache. The browser/OS can evict local storage; export backups periodically.

## What is included

27 fully authored lessons: 25 from your brief plus Hodgkin–Huxley intuition and synapse models. Further topics are explicitly coming soon, including reproduction, ablations and formulating research questions. Two simulations: discrete hard-reset LIF and the numerical Izhikevich model with regular-spiking/chattering presets. Glossary, stats, 30-day heatmap, light/dark themes, reduced motion, optional synthesized sounds, per-card feedback and a contextual ChatGPT handoff.

First launch reads `src/content/seed.json`: 22 lessons explored, 410 XP, streak 1. Delta encoding and memory timescales are due immediately. Other explored concepts are due the next day. No historical attempts or independent mastery are fabricated.

## Learning loop

Every new lesson begins with up to two due reviews. Independent challenges omit teaching cards. Wrong answers show misconception-specific explanation, the concept's tracker or worked example, then a different retry. Immediate teaching checks and hinted/retry answers are recorded as supported learning. They do not count as independent successes.

A concept graph describes prerequisites, but inference uses only explicit question-level `requires`. Only a first independent check or a success at least four hours after the previous attempt advances independent evidence. Immediate repeats do not advance the interval ladder. Correct delayed independent answers provide small supporting updates to those requirements, without transitive ancestor mastery. Confidence decays with time; independent review success schedules 1, 3, 7, then 14 days. Failure schedules a check after ten minutes; supported success schedules one day. This is a transparent heuristic, not a validated cognitive model or guarantee of mastery.

XP: correct 15, correct hinted/retry 10, first lesson completion 25, completed review session 20. Completing a lesson with a review warm-up also earns the review bonus. Streaks count completed sessions, once per local calendar day. A single missed day can be automatically bridged once per calendar week. Daily goals are 1–3 sessions, including review. No hearts or punitive lockout.

## Progress & feedback

Settings → Export progress downloads a versioned JSON containing all evidence, settings and feedback. Import validates the schema and topic IDs and replaces the current device record; the old record downloads as a backup first. Reset requires an explicit confirmation and restores the seed.

IndexedDB stores the complete record, with a localStorage mirror/fallback. Writes are queued in order. There is no cross-device sync. Feedback is stored locally, attached to the lesson/card/question, and never sent automatically.

Settings includes Concepts, Attempts, and Feedback CSV exports for Google Sheets. They are **snapshots**, not live synchronization. Use File → Import → Upload in the corresponding tab, replacing that tab rather than the whole workbook. The private native tracker is delivered separately from deployed app assets. Do not put Google credentials in this client. Automatic private syncing would need authenticated infrastructure and is deliberately not claimed here.

## ChatGPT handoff

Every learning screen has an optional expandable handoff. A deterministic template includes the question, your answer, the explanation and learning goal. Copy it, open ChatGPT and paste into your own conversation. A selectable text field is available if clipboard permission fails. No ChatGPT API or token is used; the app does not transmit your progress automatically.

## Add content

Add `src/content/topics/<topic>/topic.json` with metadata, a concept graph and an ordered list of unit IDs. Add `units/<id>.json` for each unit. See the SNN pack and `schema.ts` for supported card/question types. Vite discovers folders automatically. The renderer handles generic cards and all three quiz kinds. `simId` is a renderer registry; new simulation behavior requires a component.

Settings discovers available packs and switches between them. Each topic has separate local progress. SNN uses your supplied seed; other topics start fresh at zero XP with no explored lessons.

Run `npm test`: schema and graph validation, numerical verification for every numeric answer, answer tolerance, prerequisites, scheduling, XP, streaks, seed and backup checks. Playwright covers a complete mobile lesson with review, a mistake and retry, persisted completion, feedback, glossary, settings, backup export, and a production offline reload.

## Content sources & assumptions

Optional paper links are stored in each lesson, outside its main teaching flow. Core references include Diehl & Cook (2015), Izhikevich (2003), Bellec et al. (2018), Neuronal Dynamics, and the snnTorch documentation. The 6.4% energy break-even figure is labeled a hypothetical setup because the brief did not identify the original study. The memory estimate `1/(1−ρ)` is explicitly approximate; exact e-fold time is `−1/ln(ρ)`. Delta exercises use at most one event per reading. LIF exercises explicitly state reset, input ordering and threshold assumptions where needed. Numerical results and browser emulation do not establish physical iPhone performance or research competency.

## Verification for this build

- Production build and TypeScript check passed.
- 15 unit/content tests passed, including every numerical question and all packs.
- Mobile browser checks cover lesson completion, prerequisite diagnosis and retry, glossary and feedback, export/reset/import, invalid import, Izhikevich presets, KaTeX rendering, ChatGPT handoff, offline reload, and recovery from a stale localStorage mirror.
- Local mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100; FCP/LCP approximately 0.9 seconds and CLS 0 in that run. These are local browser measurements, not a physical iPhone or hosted network benchmark. Current Lighthouse has no separate PWA category; manifest assets and production offline behavior are checked directly.
- Physical iPhone installation, audible output, and real commute use still require your device. The in-app installation guide includes an airplane-mode check.

## Personal-first scope

See `docs/personal-first.md` for the product requirements and the user's validation evidence. Subscriptions, third-party product analytics, monetization, and unnecessary backend work are outside the current scope. Local learning evidence remains part of the review engine.

The Get Spike on your iPhone action now contains the actual deployed link, a copy action, and a desktop QR code. The QR is generated inside the app without an external service. For a different deployment origin, set `VITE_APP_URL` to that HTTPS URL before building; otherwise it points to the existing private Spike site.
