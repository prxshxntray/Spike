# Lesson figures and copy

All 27 available lessons include an authored figure in their first teaching card. Figures use inline SVG or semantic HTML and ship in the offline app bundle. There is no runtime AI, remote image request, or additional dependency.

Edit `scripts/diagrams.py` for figures and `scripts/content.py` for explanations and questions, then run `python3 scripts/content.py` from the Spike directory. Commit the regenerated unit JSON too. The Zod schema validates figure types with the rest of each topic pack. The `curveStyle` field explicitly distinguishes a hard step from a connected sequence of samples; optional beaker thresholds use data values rather than prose parsing.

Lesson 23's architecture is simplified from [Diehl & Cook (2015)](https://doi.org/10.3389/fncom.2015.00099): input activity, excitatory learning neurons, inhibitory competition, STDP, and adaptive thresholds. The figure explains mechanisms rather than simulating training. Selecting a mechanism changes the explanation and highlighted connections; it does not record an answer, grant XP, or imply mastery. Labels are assigned after unsupervised weight learning.

Use headings that name the mechanism or worked example. Keep authoring instructions, references to the original brief, motivational filler, and unsupported claims out of lesson copy. Preserve mathematical conventions, quiz identifiers, explicit prerequisites, and numerical answers when editing prose.

The existing review engine and storage schema remain unchanged. Browser tests cover feedback, backup/restore, offline reload, delayed-review behavior, contextual ChatGPT handoff, and the phone link/QR. A new assertion checks figure coverage in every authored lesson; the lesson-flow test checks that diagram selection leaves the stored progress unchanged. Device safe-area padding is implemented but still needs physical iPhone feedback.
