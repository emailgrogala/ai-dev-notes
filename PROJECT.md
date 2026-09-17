# PROJECT.md — AI Dev Notes

## Goal
AI Dev Notes is a bilingual educational website documenting practical learning about AI, LLMs, agents, programming, and AI-assisted development.

## Principle
**Learn → Build → Share**

Prefer:
- practical explanation over hype,
- clarity over unnecessary complexity,
- working examples over abstract claims,
- verifiable statements over confident speculation,
- simple architecture where possible.

## Product
The site is:
- content-first,
- static,
- bilingual PL/EN,
- deployed on GitHub Pages,
- intentionally lightweight.

Do not introduce backend, database, authentication, CMS, or large dependencies without a concrete requirement.

## Stack
- Astro
- TypeScript
- Markdown
- Astro Content Collections
- CSS

Use client-side JavaScript only when it adds real value.

## Routes
```text
/pl/
/en/
/pl/about/
/en/about/
/pl/articles/<translationKey>/
/en/articles/<translationKey>/
```

## Article frontmatter
```yaml
title: string
description: string
date: date
lang: pl | en
translationKey: string
tags: string[]
insights: string[2..3]
draft: boolean
```

`insights` are the source of truth for article takeaways and home-page insight presentation.

## UX principles
The site should feel calm, editorial, technical, readable, and minimal.

Important:
- comfortable article width,
- clear heading hierarchy,
- no unnecessary repetition of branding,
- interactive elements must support learning,
- mobile must remain readable,
- language switching should preserve the equivalent page when available.

## Content principles
Articles should:
- explain one main concept clearly,
- distinguish fact from interpretation,
- avoid hype and clickbait,
- acknowledge simplifications,
- remain technically accurate,
- use examples where useful,
- use primary/official sources for current claims when appropriate.

## AI-assisted process
AI may support ideation, drafting, code, review, translation, images, and refactoring.

The human remains responsible for scope, direction, verification, acceptance, and publication.

## Definition of a good change
A good change:
- solves a real problem,
- preserves or improves clarity,
- adds no unnecessary complexity,
- keeps PL/EN behavior consistent,
- builds successfully,
- does not regress mobile behavior,
- remains understandable to future maintainers.
