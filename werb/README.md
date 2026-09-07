# Visit Pangasinan Web Guide

Mobile-first tourism website for Pangasinan focused on cultural and heritage destinations. Built with Vue, Vite, Bootstrap utilities, and custom CSS design tokens.

## Goals

- Fast enough for 3G and 4G mobile conditions.
- Responsive on small phones through desktop screens.
- Inclusive UX aligned with WCAG 2.1 AA practices.
- Maintainable component and data-driven architecture.
- Deployable as static output to GitHub Pages.

## Stack

- Vue 3 (RC channel)
- Vue Router
- Vite
- Bootstrap (layout and utilities)
- Vitest + Vue Test Utils
- ESLint + Oxlint + Prettier

## Project setup

```sh
npm install
```

## Run locally

```sh
npm run dev
```

## Quality checks

```sh
npm run lint
npm run test:unit -- --run
npm run build
```

## Route map

- /
- /destinations
- /heritage
- /about
- /contact

## Project structure

- src/views: route-level pages
- src/components: reusable UI blocks
- src/data/tourismContent.js: local static content model
- src/assets/base.css: design tokens and accessibility baselines
- src/assets/main.css: component and layout styles

## Accessibility checklist

- Skip link present in app shell.
- Keyboard focus states on links, buttons, and form controls.
- Semantic landmarks and heading hierarchy per route view.
- Contrast-safe palette based on primary tokens.
- Form fields include labels and required semantics.

## Performance checklist

- Route-level lazy loading for non-home pages.
- Images set with loading lazy and async decoding.
- Responsive layout optimized for narrow viewports first.
- Keep new media compressed and prefer modern formats.

## Content editing workflow

Edit destination, event, tip, and contact content in src/data/tourismContent.js.
Keep fields consistent to avoid view-level formatting changes.

## GitHub Pages deployment

This project uses Vite base path /webact/ for repository-hosted Pages.

Manual deploy:

```sh
npm run build
```

Publish the generated dist folder through GitHub Pages, or use the included GitHub Actions workflow.
