# One real run: launch the portfolio and open a project detail page

This walkthrough follows the most representative user path in the repository: start the site, move into the projects section, and open one project detail page.

## Step 1: start the development server

From the repository root, install dependencies and launch Vite:

```bash
npm install
npm run dev
```

The app bootstraps through [src/main.tsx](../../src/main.tsx), which mounts the main app component.

## Step 2: load the app shell

The main experience is assembled in [src/app/App.tsx](../../src/app/App.tsx). That file owns the shared header, portfolio sections, project cards, and the custom routing state.

## Step 3: navigate to the projects section

The site does not use a separate router library. Instead, it resolves the current URL and maps it to a view with logic in [src/app/App.tsx](../../src/app/App.tsx). Paths such as `/projects` and `/projects/:slug` are handled directly by the component.

## Step 4: open a project detail page

When a visitor clicks a project card, the app updates the browser history and renders a dedicated detail view. That detail page pulls content from the project data object in [src/app/App.tsx](../../src/app/App.tsx) and shows:
- the project overview,
- a media gallery,
- feature highlights, and
- links to external resources.

## Verification

A successful run is a browser window that loads the portfolio and lets a visitor move from the project list into a project detail view without a full page reload.
