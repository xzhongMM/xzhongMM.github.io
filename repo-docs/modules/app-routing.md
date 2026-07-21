# App routing and view switching

The portfolio uses a lightweight routing approach implemented directly in [src/app/App.tsx](../../src/app/App.tsx). Instead of relying on a router package, the app keeps a `route` state and resolves the current URL to a view.

## What the routing layer does

The important pieces are:
- `resolveRoute`, which maps a path to the current section or project detail page,
- `navigateTo`, which updates the browser history and changes the active view, and
- the `route` state, which controls what the page renders.

## Why this design exists

The site is a single-page portfolio experience, so a full router would add complexity without much benefit. The custom approach keeps the navigation behavior self-contained and makes it easier to manage scroll resets and project detail transitions.

## Verification

A simple browser check confirms the model: navigate to `/projects`, click a project card, and confirm that the URL changes and the detail view appears.
