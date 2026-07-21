# Project content data

Project information is stored in a central `PROJECTS` array near the top of [src/app/App.tsx](../../src/app/App.tsx). Each object contains the project title, slug, summary, image paths, description, tags, technologies, contribution breakdown, features, and external links.

## What this data model powers

The same data object is used to render:
- the project cards on the portfolio,
- the detail page for a selected project, and
- the media gallery and feature list shown inside that detail page.

## How to add a new project

1. Add a new object to the `PROJECTS` array.
2. Provide the cover image and any gallery image paths.
3. Use a slug that matches the URL pattern you want for the detail page.

## Verification

After adding a project entry, open the projects section and confirm that a new card appears and that its detail page renders correctly.
