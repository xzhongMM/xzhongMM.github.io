# Source evidence

## Evidence traversal log

| Pass | Purpose | Inspected evidence | What changed in the model |
| --- | --- | --- | --- |
| Pass 1 | Main path | [src/main.tsx](../../src/main.tsx), [src/app/App.tsx](../../src/app/App.tsx), [package.json](../../package.json) | The app is a Vite React portfolio with a custom route layer and a single main application component. |
| Pass 2 | Socratic challenge/fill | [vite.config.ts](../../vite.config.ts), [README.md](../../README.md), [src/app/App.tsx](../../src/app/App.tsx) | The build pipeline, asset handling, and project data model are the most important concepts for future maintainers. |

## Coverage note

The guide currently focuses on the portfolio shell, the app’s route behavior, and the project detail experience. Deeper visual styling and individual UI widget behavior are not documented in full detail.

## Claim | Evidence | Confidence | Caveat | Used by
| --- | --- | --- | --- | --- |
| The site is built with Vite and React | [package.json](../../package.json), [vite.config.ts](../../vite.config.ts) | High | The Vite config includes a Figma-specific asset resolver plugin. | [README.md](../README.md), [walkthroughs/one-real-run.md](../walkthroughs/one-real-run.md) |
| The portfolio uses custom client-side routing | [src/app/App.tsx](../../src/app/App.tsx) | High | Routing is handled directly in the app component rather than with a separate router library. | [modules/app-routing.md](../modules/app-routing.md) |
| Project content is driven by a central data array | [src/app/App.tsx](../../src/app/App.tsx) | High | New projects should be added there to keep cards and detail pages in sync. | [modules/project-content-data.md](../modules/project-content-data.md) |
