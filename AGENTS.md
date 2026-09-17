# AGENTS.md — Instructions for AI agents

Read `PROJECT.md` before making changes.

## General behavior
Work from the repository, not assumptions.

Before editing:
1. inspect relevant files,
2. understand the existing pattern,
3. identify the smallest coherent change.

Do not rewrite unrelated files.

## Scope discipline
Respect the requested scope.

Do not add frameworks, dependencies, backend services, databases, state-management libraries, or design systems unless clearly required.

Out-of-scope ideas should be reported as suggestions, not implemented.

## Astro conventions
Prefer:
- Astro components for static UI,
- Content Collections for article metadata,
- TypeScript where useful,
- minimal client-side JavaScript.

Do not convert Astro components to React/Vue/Svelte without a concrete reason.

## Bilingual behavior
Any user-facing structural change must be checked for PL and EN.

Preserve:
- `translationKey`,
- equivalent PL/EN routes,
- correct language-switch behavior.

## Content
Do not silently rewrite article meaning during technical work.

When editing content:
- preserve authorial intent,
- keep PL and EN semantically aligned,
- avoid unsupported claims,
- keep `insights` consistent with article content.

## Accessibility
Check:
- semantic headings,
- keyboard navigation,
- focus visibility,
- meaningful labels,
- reduced motion,
- readable contrast.

Prefer native HTML semantics over unnecessary ARIA.

## Responsive behavior
Check desktop and narrow mobile widths.

Watch for:
- horizontal overflow,
- oversized images,
- long headings,
- tags,
- code blocks,
- interactive components.

## Images
Article images must:
- stay inside article width unless intentionally full-bleed,
- preserve aspect ratio,
- not create horizontal scrolling,
- have meaningful alt text where appropriate.

## Quality checks
Before completion:
- inspect the diff,
- run available build,
- run tests/lint if present,
- check changed routes,
- check both languages where relevant.

Never claim a check passed if it was not actually run.

## Review behavior
When asked to review, do not fix issues unless explicitly requested.

Classify findings:
- **BLOCKER**
- **MAJOR**
- **MINOR**
- **SUGGESTION**

For each finding provide:
- category,
- location,
- evidence,
- impact,
- recommended change.

Prefer high-confidence findings over speculative lists.

## Review independence
Do not assume AI-generated code or content is correct.

Review against:
- `PROJECT.md`,
- repository behavior,
- actual code,
- stated requirements.

## Implementation summary
At the end of implementation tasks summarize:
- what changed,
- files changed,
- checks performed,
- remaining risks/follow-ups.
