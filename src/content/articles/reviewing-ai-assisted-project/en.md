---
title: "How we reviewed AI Dev Notes: code, UX, and content review"
description: "A practical account of reviewing an AI-assisted project — from technical code review and UX testing to reviewing 13 articles and measuring Codex usage."
date: 2026-09-18
lang: en
translationKey: reviewing-ai-assisted-project
tags:
  - ai
  - agents
  - code-review
  - ux
  - workflow
insights:
  - "Review and implementation are separate stages: first collect findings, then let a human decide which ones should be implemented."
  - "The most capable tool does not need to be used for every task — Codex was valuable for repository and browser work, while ordinary ChatGPT was a better fit for content review."
  - "The value came less from a single agent than from the process: independent review, explicit ACCEPT/LATER/REJECT decisions, and separate validation of changes."
draft: false
---

**AI Dev Notes** was built with substantial AI assistance. Code, architecture, content, and later refinements were developed iteratively.

After a while, a more interesting question appeared than:

> “Can AI build a project like this?”

The better question was:

> **how do you review the quality of a project when much of the work was also produced with AI assistance?**

Instead of one broad review, we split the process into three perspectives:

```text
CODE REVIEW
    ↓
UX REVIEW
    ↓
CONTENT REVIEW
```

Each stage had a different purpose, different tools, and a different cost.

## Review first, fixes later

The most important rule was simple:

```text
review
  ↓
findings
  ↓
ACCEPT / LATER / REJECT
  ↓
implementation
```

The reviewer was not allowed to immediately fix everything it noticed.

Its first job was to:
- find problems,
- classify their severity,
- explain them,
- provide evidence.

Only then did a human decide which findings should actually be implemented.

We used:

```text
BLOCKER
MAJOR
MINOR
SUGGESTION
```

and separately:

```text
ACCEPT NOW
LATER
REJECT
```

That separation mattered. An AI reviewer can identify a technical issue, but that does not automatically mean the issue should be fixed right now.

## Stage 1: Code Review

The first review was performed in Codex against the current repository.

The scope included:
- Astro and TypeScript,
- accessibility,
- responsive layout,
- SEO,
- performance,
- CSS,
- build configuration,
- real browser behavior.

Codex ran the build, inspected the project on mobile and desktop, and worked with the actual files.

Findings included:
- optimization of the large comic image,
- date localization,
- accessibility,
- missing `astro check`,
- CSS cleanup,
- GitHub Pages and `base`,
- canonical/hreflang,
- sandbox JavaScript being loaded on pages that did not need it.

Not everything was implemented immediately.

For example:
- image optimization, accessibility, and type checking → **ACCEPT NOW**,
- GitHub Pages/base and canonical/hreflang → **LATER**,
- broader sandbox-loading optimization → **LATER**.

That prevented the review from turning into an uncontrolled redesign.

## Implementing Code Review findings

After the decisions, the reviewer received a separate implementation prompt.

The scope was intentionally limited to accepted findings only.

The result included:
- moving the comic image into Astro's image pipeline with responsive AVIF/WebP/PNG variants,
- fixing PL/EN date localization,
- improving accessibility,
- adding `@astrojs/check`,
- cleaning up global CSS collisions,
- removing the unused `AiMark` component.

Validation ended with:

```text
astro check → 0 errors / 0 warnings / 0 hints
build       → 31 pages
audit       → 0 vulnerabilities
```

This made the difference between review and implementation very clear:

```text
review ≠ implementation
```

The review identified problems. Implementation handled only the approved fixes.

## Stage 2: UX Review

The UX review was done in a **new Codex session**.

That was intentional.

The new session was not supposed to continue the code reviewer's line of reasoning. It was supposed to inspect the project from a different perspective:

- home page,
- navigation,
- article reading,
- mobile behavior,
- learning aids,
- sandbox interaction,
- PL/EN consistency,
- discoverability.

This time Codex behaved more like a tester using a real browser.

It found:
- horizontal overflow caused by long URLs,
- an unreadable comic on mobile,
- a dead end at the bottom of articles,
- an overly strong section-focus treatment,
- small touch targets,
- inconsistent `Worth remembering` vs `Key takeaways`.

Again, findings came first and decisions came second.

We accepted all of these except the hero change, which stayed for later.

## Why UX implementation stayed in the same session

For implementation, we made the opposite choice.

We kept the **same session** that had just performed the UX review.

The reason was practical:
- it already knew all findings,
- it had fresh browser context,
- it did not need to rediscover the same areas,
- the implementation prompt could refer directly to accepted findings.

The pattern became:

```text
new session
→ independent review
→ human decisions
→ same session
→ implementation of accepted changes
```

After the changes:
- mobile overflow was gone even at 320 px,
- the comic gained `Powiększ / Enlarge`,
- articles gained `Czytaj dalej / Read next`,
- section focus became more subtle,
- touch targets increased,
- `Key takeaways` became consistent in English.

## How much did the process cost in Codex?

We recorded the Usage panel during the work.

The weekly figures are approximate — they assume that no other shared-usage tool was being used at the same time.

According to the UI, usage was shared across services including:
- Codex,
- Work,
- workspace agents,
- ChatGPT for Excel.

Ordinary ChatGPT conversations were not counted in that shared Codex usage.

| Stage | Time | Approx. weekly usage |
| --- | ---: | ---: |
| Code review | 8 min 22 s | ~8 p.p. |
| Code review implementation | ~11 min 13 s | ~12 p.p. |
| UX review | 4 min 20 s | ~7 p.p. |
| UX implementation | 5 min 48 s | ~8 p.p. |
| **Total** | **~29 min 43 s** | **~35 p.p.** |

We also watched the 5-hour window, but it is not meaningful to simply add those values because the window reset during the process.

Execution time alone was not a good predictor of cost either.

For example, UX implementation took less time than code review but consumed a similar share of weekly usage.

The likely drivers were:
- number of files,
- browser use,
- repeated iterations,
- builds and checks,
- context size.

## Stage 3: Content Review

After code and UX review, 13 articles remained.

At first, using Codex again seemed natural.

After looking at the task, it no longer made sense.

Content review mainly required:
- factual precision,
- clarity,
- avoiding overgeneralization,
- PL/EN parity,
- reviewing `insights`,
- terminology consistency.

It did not require:
- terminal access,
- builds,
- repository automation,
- browser control,
- application changes.

So the content review moved to ordinary ChatGPT and was split into three batches.

```text
13 articles
   ↓
4 + 4 + 5
   ↓
content review
   ↓
ACCEPT NOW
   ↓
targeted PL/EN fixes
```

This preserved Codex for work where its repository and browser tools offered a real advantage.

## What changed in the articles

The content review did not lead to rewriting the site.

Most changes were small but important.

Examples:
- separating AI from LLM,
- updating Memory and Temporary Chat descriptions,
- sampling vs greedy decoding,
- more precise embedding definitions,
- RAG ≠ fine-tuning,
- MCP as a communication protocol,
- local/cloud ≠ open/proprietary,
- structured outputs instead of relying only on `return JSON`,
- more careful descriptions of scheming and alignment research,
- softening universal claims drawn from individual case studies.

The most common issue was not:

> “this is false”

but:

> **“this is true in the example, but the sentence sounds like a universal rule.”**

That became one of the most useful lessons from content review.

## Why three different reviews were useful

Each reviewer asked a different question.

Code review asked:

> **is the project technically correct?**

UX review asked:

> **can a user comfortably use it?**

Content review asked:

> **is what we publish precise and understandable?**

None of these replaces the others.

A project can have:
- correct code and poor UX,
- good UX and inaccurate content,
- strong content and technical defects.

Only the combination gives a more complete view of quality.

## AI reviewing AI — with a human controlling the process

In this project, AI:
- wrote code,
- reviewed code,
- tested UX,
- reviewed articles,
- proposed fixes.

That did not remove the human from the process.

The human decisions were still about:
- review scope,
- tool selection,
- whether to use a new or existing session,
- ACCEPT / LATER / REJECT,
- when to stop polishing,
- what actually enters the project.

A simplified model is:

```text
AI finds
    ↓
AI explains
    ↓
human decides
    ↓
AI implements
    ↓
tools verify
    ↓
human accepts
```

## The main lesson

The most interesting result was not that an agent could find defects.

The important part was building a process where the agent's output was not automatically treated as a decision.

Review worked best when:

1. the scope was explicit,
2. the reviewer did not fix things before approval,
3. findings were classified,
4. a human chose ACCEPT / LATER / REJECT,
5. implementation received a separate prompt,
6. the result went through tests and validation.

That fits the broader principle of this project:

> **Learn → Build → Share**

First we built the site.

Then we used AI to critically review it.

Now the review process itself becomes something worth documenting, remembering, and reusing in the next project.
