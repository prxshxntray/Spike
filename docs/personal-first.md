# Spike: personal-first requirements

## Validation

Spike solves the owner's stated problem: learning SNN theory on an iPhone during a commute, retaining it beyond easy immediate quizzes, and eventually understanding research papers. The owner confirmed the 22 explored lessons and two weak spots. Direct feedback exposed a concrete access failure: the install button repeated instructions without showing the link or a QR code. That is evidence to fix the handoff before adding business features. Enjoyment and actual retention still need the owner's use; passing tests cannot establish those outcomes.

## Product and audience

A personal, offline-capable learning companion for one learner. Its position is understanding through retrieval, not checkmarks from immediately repeated questions.

## Problem

Make it easy to open the app on the phone, learn one idea, retrieve it later, repair misconceptions, and report confusion with little friction.

## Core features

- Phone access through a visible deployed link and a locally rendered QR code.
- Tiny teaching cards and numerical examples, followed by questions.
- Delayed review, question-specific prerequisite evidence, and diagnostic retries.
- A clear next lesson, a gentle daily goal, and saved local progress with backups.
- Per-context feedback and an optional copyable prompt for the owner's ChatGPT app.

Glossary, simulations, and personal progress summaries support learning. Their usefulness must be checked with the owner rather than inferred from being implemented.

## Main flow

1. On the Mac, choose Get Spike on your iPhone. Scan the visible QR code or copy the visible app link. The QR opens the website; it does not download an App Store package.
2. On the phone, open the deployed app in Safari. The current private host requires ChatGPT sign-in on first access. Preserve that privacy setting.
3. Add to Home Screen, open once online, and wait for Offline ready.
4. Tap Continue learning. Retrieve up to two due concepts, then study one small lesson.
5. Answer. On a miss, see an explanation, check a prerequisite when appropriate, and retry a fresh example.
6. Finish the session, save evidence and progress, and schedule later review.
7. Give quick feedback when needed. Dive deeper in ChatGPT only by choice.

## Scope boundaries

No subscriptions, paywalls, product analytics, advertising, onboarding funnel, or monetization work. Personal answer history and spaced-review evidence stay because they are the learning engine, not a third-party tracking service. Keep local-first storage; add a backend only for a demonstrated personal need. Do not migrate the existing PWA to Expo merely because the reference guide names a default stack.

## Acceptance checks for the phone handoff

- The install action shows the actual deployed URL, not localhost.
- Desktop shows a clear QR code; mobile prioritizes the usable link and Safari installation steps.
- The code and link carry exactly the same destination.
- Copying succeeds visibly, with selectable text as a fallback.
- Installation is optional and does not interrupt a lesson.
- No tracking request or subscription dependency is introduced.
