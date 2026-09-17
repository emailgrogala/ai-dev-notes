---
title: "How I built a test data generator with two AI agents"
description: "A case study showing how two AI agents with separate roles can support implementation, testing, code review, and deployment of a working application."
date: 2026-09-17
lang: en
translationKey: test-data-generator-with-ai
tags:
  - programming
  - agents
  - ai
  - react
  - testing
insights:
  - "AI provides the most value when it operates inside a clearly defined engineering process, not when it merely generates isolated code snippets."
  - "Separating implementation and review between two agents reduces the risk of uncritically accepting the same system's own solution."
  - "The human still defines direction, scope, and quality criteria, while agents execute and verify individual stages of the work."
draft: false
---

**Test Data Generator** is a lightweight web application for generating test data useful in everyday development work.

The generator itself is useful, but the way it was built is equally important. The project became a practical experiment in building software with **two AI agents with separate responsibilities**.

The interesting question was not simply:

> “Can AI write code?”

A better question was:

> **can AI participate in a controlled software development process — from task analysis and implementation to testing, independent review, and deployment?**

## Project goal

The application was designed as a small developer toolkit that runs entirely in the browser.

It can generate values such as:

- PESEL,
- UUID v4,
- random text,
- NRB,
- IBAN,
- NIP.

All values are generated locally.

```text
browser
   ↓
generator
   ↓
result
```

There is no backend or database, and generated data does not need to leave the browser.

## Process before code

The project is developed iteratively in small, controlled steps.

Each task defines:

- a clear scope,
- acceptance criteria,
- quality requirements,
- items explicitly outside the current scope.

This matters when working with AI agents because a model can easily expand a task with ideas that sound useful but are not part of the current change.

## A shared source of truth

The implementer and reviewer use the same project documents:

- **PROJECT.md** — project goals, scope, and quality requirements,
- **AGENTS.md** — agent roles and working rules,
- **README.md** — core project information.

Requirements therefore do not exist only inside a single prompt.

They are part of the repository.

```text
requirements
    ↓
PROJECT.md / AGENTS.md / README.md
    ↓
Agent 1
    ↓
Agent 2
```

Both agents work from the same reference point.

## Agent 1 — Implementer

The first agent is responsible for implementation.

Its work includes:

- inspecting the repository,
- finding the correct place for the change,
- implementing the feature,
- adding or updating tests,
- running technical verification.

The task is not merely:

```text
write a NIP generator
```

It may also define:

- the algorithm,
- expected UI behavior,
- required tests,
- explicit scope limits.

This makes the work closer to implementing a well-defined ticket than to one-off code generation.

## Agent 2 — Reviewer

The second agent has a different role.

It does not implement the feature and does not directly fix the code.

Its job is to independently evaluate:

- compliance with requirements,
- implementation correctness,
- tests,
- architecture,
- regression risk.

Findings are classified as:

```text
BLOCKER
MAJOR
MINOR
SUGGESTION
```

If the review identifies an important problem, the change goes back to Agent 1.

This separation matters.

The agent that created the solution is not the only source evaluating its quality.

## Review as a separate stage

Agent 2 review is currently triggered manually.

The workflow is:

```text
1. Requirement
2. PROJECT.md
3. Agent 1 — implementation
4. Lint + tests + build
5. Agent 2 — code review
6. Fixes if required
7. APPROVE
8. Pull Request
9. Merge to main
10. GitHub Actions
11. GitHub Pages
```

This is very different from:

```text
prompt
↓
code
↓
commit
```

Several verification layers exist between generated code and deployment.

## Scope control

One of the important project rules is protecting task scope.

The reviewer should not block a change because it lacks functionality that was never required by the current task.

Out-of-scope ideas may be reported as:

```text
SUGGESTION
```

but not as blocking defects.

This reduces scope creep during implementation and review.

That is especially important with AI because models are often very good at proposing additional improvements.

Useful ideas still need to be scheduled deliberately.

## Frontend-only architecture

The application is frontend-only.

Stack:

- **React**
- **Vite**
- **TypeScript**
- **Material UI**
- **Vitest**

There is no backend and no database.

Generator logic is separated from React components.

Algorithms such as:

```text
PESEL
NRB
IBAN
NIP
```

can therefore be tested independently from the UI.

This is particularly valuable for AI-generated code.

A test does not check whether code “looks correct”.

It checks whether a defined input produces the expected result.

## From a small MVP to a larger application

The initial MVP included only:

- PESEL,
- UUID v4,
- random text.

Later iterations added:

- tab-based navigation,
- generator accordions,
- multiple-record generation,
- PESEL date ranges,
- gender selection,
- NRB and IBAN,
- NIP,
- a shared results panel,
- individual and bulk copying,
- accessibility improvements,
- rendering optimizations.

Each larger feature was handled as a separate stage.

The application was not built through one large prompt.

## Why small iterations work better

With a small task it is easier to define:

```text
what should be built
what should not be built
how correctness will be checked
```

If a change concerns only a NIP generator, the reviewer can focus on:

- checksum rules,
- edge cases,
- tests,
- integration with the existing UI.

It does not need to reassess the whole application architecture at the same time.

Small scope helps both humans and agents.

## Automated verification

Before a change is accepted, four basic checks are run:

```text
lint
unit tests
build
git diff --check
```

Each catches a different class of problem.

### Lint

Detects style problems and some static issues.

### Tests

Verify generator logic and application behavior.

### Build

Confirms that the application can be built for production.

### git diff --check

Helps detect technical issues in the diff, including unwanted whitespace problems.

No single check guarantees correctness.

Together, they create a much stronger barrier against accepting broken code.

## GitHub Actions and deployment

After a merge to `main`, GitHub Actions runs automatically.

The pipeline is:

```text
merge
  ↓
automated verification
  ↓
build
  ↓
deploy
  ↓
GitHub Pages
```

The path from repository change to deployed application is therefore repeatable.

An agent does not manually publish production files.

Deployment is part of the engineering process.

## AI still makes mistakes

Working with agents does not mean that code is correct on the first attempt.

Reviews in this project led to fixes involving areas such as:

- validation edge cases,
- date handling,
- UTC behavior,
- accessibility,
- ARIA behavior.

This is an important practical lesson.

AI-generated code can:

```text
look professional
+
compile
+
pass some tests
```

and still need correction.

Independent review is therefore not an optional extra.

It is part of the process.

## Does Agent 2 replace a human?

No.

The second agent increases the chance of finding problems, but it is still an AI model.

It can miss things too.

The process is closer to:

```text
Agent 1
→ implementation

Agent 2
→ independent analysis

tests and CI
→ automated checks

human
→ decision
```

Each layer has a different job.

## What does the human do?

The human role does not disappear.

It changes.

The human is primarily responsible for:

- choosing the problem,
- defining requirements,
- splitting work into stages,
- acceptance criteria,
- UX decisions,
- evaluating agent suggestions,
- approving direction,
- deciding when to merge.

Agents perform a large part of the technical work, but inside a process defined by a human.

## From code generation to software development

The most interesting result of the project is not:

> “AI can write a PESEL or NIP generator.”

That is relatively easy.

The more important point is that AI can participate in a broader workflow:

```text
requirement
   ↓
implementation
   ↓
tests
   ↓
review
   ↓
fixes
   ↓
Pull Request
   ↓
CI
   ↓
deployment
```

At that point AI is no longer only a code generator.

It becomes a participant in the software development process.

## Main conclusion

The greatest value does not come from simply adding AI to an IDE.

It comes from combining AI with clear engineering rules:

- a shared source of requirements,
- small tasks,
- separation of implementation and review,
- automated tests,
- Git-based change control,
- Pull Requests,
- CI/CD,
- final human decision-making.

A useful summary is:

> **AI executes and checks individual stages, but the human defines direction and the conditions under which that work is acceptable.**

That model best describes the project:

> **human-directed, AI-assisted development**

## Project

Live application:

https://emailgrogala.github.io/test-data-generator/

Repository:

https://github.com/emailgrogala/test-data-generator
