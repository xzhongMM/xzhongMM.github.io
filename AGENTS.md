## Repo docs

The living project guide is in `repo-docs/`. Start with `repo-docs/README.md`; when `repo-docs/walkthroughs/one-real-run.md` exists, use it as the main behavior trace.

Repo-docs sync triggers before the final response: repo questions; architecture, onboarding, or "how does this work" answers; behavior-bearing code/config/data/script/test edits; user uncertainty or correction about stable project behavior; stable project knowledge discovered or clarified in conversation; and knowledge about to be written to memory.

When a trigger happens, run a foreground repo-docs sync gate before answering: read the relevant guide pages, inspect current source, and decide `none`, `answer-only`, `foreground patch`, or `background sync`. Ordinary repo questions may be `answer-only` when the guide is current enough and the answer can cite inspected guide/source evidence. Patch the smallest owning guide page before the final response only when the current answer or edit would otherwise mislead, the guide says the opposite, or the missing stable knowledge is a small local patch.

When behavior-bearing code, config, data, scripts, or tests change, compare the change with the guide before finishing unless the user asked not to touch docs. Record meaningful guide updates in `repo-docs/change-log.md` with verification and `Synced through <sha>` when git is available.
