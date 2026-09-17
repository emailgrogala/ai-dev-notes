---
title: "How I chose the technology for this site"
description: "Why a simple article-focused site was built with Astro even though React, Angular, or Next.js could also have been used."
date: 2026-09-16
lang: en
translationKey: choosing-tech-stack
tags: [astro, frontend, architecture, web]
insights:
  - "Define the problem and constraints first, then choose the framework."
  - "Architectural simplicity is a strength when it matches the real needs of the project."
  - "Technology should not be chosen only because it is familiar."
draft: false
---
The key decision at the beginning was not “which framework is best?” but **“what does this site actually need?”** Only after defining the requirements did comparing Astro, React, Angular, and Next.js become useful.

## Requirements before frameworks

The project needed repository-based articles, simple publishing, little JavaScript, free hosting, and selective interactivity.

## Why not plain React

React is excellent for interactive applications, but most of this site is static content. There was no need to turn the entire site into a client-side application.

## Why not Angular

Angular is strong for large business applications, but its architecture would be larger than the problem here.

## Why not Next.js

Next.js offers SSR, backend capabilities, and complex application logic. The project did not need those features at the beginning.

## Why Astro

Astro fits content-focused sites and lets articles stay as normal Markdown files.

```text
Markdown
   ↓
Git
   ↓
GitHub Actions
   ↓
GitHub Pages
```

## Islands architecture

JavaScript can be added only where interaction is needed — for example in an educational sandbox — without turning the whole page into an SPA.

## Markdown as architecture

Frontmatter stores title, language, tags, `translationKey`, draft status, and now the article's main `insights`.

## Is this universally better?

No. Tools fit different problems.

```text
large business application → Angular
interactive UI → React
React + SSR/backend → Next.js
content + selective interactivity → Astro
```

The useful rule is:

> **define the problem and constraints first, then choose the technology.**
