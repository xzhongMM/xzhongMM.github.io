# Repository guide

This repository is a Vite + React portfolio website for a personal online presence. The app is centered on a single main experience that mixes storytelling, project showcases, and a lightweight custom routing layer.

## What this repo does

A visitor can:
- land on the portfolio home view,
- browse highlights and project cards,
- open a dedicated project detail page, and
- read about experience, skills, interests, and contact details.

The most useful source of truth is the main app component in [src/app/App.tsx](../src/app/App.tsx), where the portfolio sections, project content, and route handling all live.

## First useful path

Start with [walkthroughs/one-real-run.md](walkthroughs/one-real-run.md) to follow one real user journey through the app: launch the site, reach the projects section, and open a project detail page.

## Main concepts

- App shell and route switching: [modules/app-routing.md](modules/app-routing.md)
- Project content model and data-driven rendering: [modules/project-content-data.md](modules/project-content-data.md)
- Build and asset setup: [vite.config.ts](../vite.config.ts)

## Running locally

```bash
npm install
npm run dev
```

The development server is provided by Vite and serves the React app from the workspace root.
