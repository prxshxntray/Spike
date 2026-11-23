# Personal-first review

This review applies the supplied app-building guide to the existing app. Subscriptions and third-party product analytics are excluded by the owner's instruction. Personal learning records remain necessary for scheduling and feedback. PASS below means the implementation or automated check supports the item, not that the owner has validated the experience.

| Guide check | Screen or flow | Result | Evidence or limit |
| --- | --- | --- | --- |
| Time to first payoff is measured | Learn → first review answer | PASS | Three automated interactions after opening: Continue, enter answer, Check. The local browser run reached correct-answer feedback in 0.323 s. This excludes human reading and recall, phone installation, and the host's sign-in gate. |
| A visible early win | Session | PASS | Correct-answer explanation and XP update precede session completion. Covered by mobile lesson tests. |
| Nothing non-essential precedes payoff | First hosted visit | FAIL | The private host requires ChatGPT sign-in. The app itself adds no onboarding, payment, or account setup. Preserve the existing private audience rather than silently making the site public. |
| One primary action | Learn | PASS | Continue learning is the dominant action; review is secondary. |
| One primary action | Session | PASS | Continue or Check answer remains pinned at the bottom; extra help is optional. |
| One primary action | Review | PASS | Start quick review is primary; an independent challenge is secondary. |
| One primary action | Glossary | PASS | Search is the main task; lesson links are contextual. |
| One primary action | Progress | PASS | Inspect personal evidence, then use the single practice action. |
| Exactly one action on every screen | Settings | FAIL | Several necessary utilities share this page: preferences, backup, installation, feedback, reset. Keep them grouped here rather than inserting them into learning. No evidence yet supports removing a particular utility. |
| Primary action visually dominant | Install | PASS | Open Spike is the single prominent button. Copy link is a quiet secondary action. Desktop has a visible QR; phone prioritizes the link. Screenshots reviewed at desktop and iPhone dimensions. |
| No equally important buttons side by side | Optional ChatGPT handoff | FAIL | Copy prompt and Open ChatGPT currently share secondary styling. They are sequential steps in an optional expanded panel. This remains a small coherence issue; it does not block learning. |
| Options appear when applicable | Install and Session | PASS | QR is visible on a desktop-sized viewport; Safari steps are expandable. Reteach/retry appears after a miss. No pricing or signup choices exist in the app. |
| One coherent feel | App screens and install panel | PASS | Shared colors, typography, controls, and beaker metaphor. No ads or separate onboarding exist to evaluate. |
| Every feature is used | Glossary, simulations, stats, deeper links, exports | FAIL | Implementation and tests establish availability, not actual use. The owner has not yet provided enough usage feedback to establish which supporting features are useful. Do not guess by adding analytics or removing requested features. |
| Point of view is explicit | Learn, Review, Progress | PASS | Lesson exploration is distinguished from retained understanding; delayed independent evidence matters more than immediate repetition. |
| Validation evidence written | Product requirements | PASS | `personal-first.md` records the owner's learning needs, confirmed starting point, weak spots, and observed access failure. |
| PRD covers what, who, problem, features, and flow | Product requirements | PASS | All five are documented before this handoff change. |
| Core feature first | Full app | PASS | Learning, retrieval, repair, persistence, and feedback remain the focus. Business features and a stack migration are not introduced. |
| Backend, subscriptions, analytics | Full app | PASS for current scope | No subscription or tracking service is added. Existing IndexedDB/localStorage meets the personal persistence requirement; an external backend is not required by the owner's current need. |

## Verification

Production build and 15 engine/content tests pass. The existing six mobile integration checks pass; a browser-startup timeout in one check was rerun successfully without changing the app. New handoff checks verify the real URL, QR rendering, copied destination, keyboard dismissal/focus restoration, mobile layout, and installation steps. The payoff test records automation timing without claiming a human learning result. Physical iPhone scanning and commute use require the owner's device.
