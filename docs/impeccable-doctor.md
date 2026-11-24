# Impeccable Doctor repair · November 24, 2026

Doctor identified one issue: the project had no installed design hook. Installed the official project-scoped Codex skill and `.codex/hooks.json`, enabled the hook in `.impeccable/config.json`, and recorded consent in the ignored local config.

Verification:

- Both the original launcher and the installed project launcher report an empty Doctor findings array.
- Hook status reports the `.agents` provider as wired and enabled.
- A manual PostToolUse smoke test against `src/components/CardView.tsx` returned exit code 0 and a valid hook response with no deterministic findings. This checks the hook command, not whether the already-running Codex chat has reloaded its settings.
- A source scan of `src` and `index.html` reported one false positive: the tiny beaker's decorative highlight uses a right border. It is a stroke inside a drawing, not a side accent on a content card. No rule-wide or file-wide suppression was added.

The app UI and deployed bundle did not change. Codex must load the new settings before automatic hook events run; first-use hook trust remains controlled by Codex.
