---
title: "How AI Helped Extend a Static Site with Firebase"
description: "A practical example of using AI to evolve an Astro application: architecture analysis, Firebase and Firestore integration, local testing, and deployment to GitHub Pages."
date: 2026-09-19
lang: en
translationKey: firebase-ai-assisted-integration
tags:
  - ai
  - firebase
  - firestore
  - astro
  - github-pages
insights:
  - "AI can support more than code generation: it can help with architecture analysis, implementation, service configuration, testing, and deployment."
  - "Firebase can add dynamic data to a static Astro site without requiring a custom backend or replacing GitHub Pages."
  - "A small-step integration works well: first the view counter, then feedback, with end-to-end validation after each stage."
draft: false
---

AI Dev Notes originally started as a fully static website. Articles are stored in Markdown, the application is built with Astro, and deployment is handled through GitHub Pages.

That setup is simple, fast, and almost maintenance-free. It also has a natural limitation: a static site has nowhere to persist data that changes over time.

The first need for dynamic data came from two small features:

- a view counter for each article,
- simple reader feedback: **Helpful**, **Too long**, **Too complex**, or **Not helpful**.

Instead of building a custom backend, I decided to use **Firebase and Cloud Firestore**. The integration itself also became another experiment in using AI during application development.

## From a static site to an application that stores data

Before the change, the architecture was very simple:

```text
Markdown
   ↓
Astro
   ↓
GitHub Pages
```

There was no backend, no database, and no user authentication.

After the integration, the flow looks like this:

```text
Markdown
   ↓
Astro
   ↓
GitHub Pages
   │
   └────→ Firebase / Cloud Firestore
             ├── article views
             └── feedback
```

Firebase did not replace GitHub Pages. It was added only as a small persistence layer for dynamic data.

That was an important design constraint: **do not make the architecture more complex than the feature requires**.

## Start with a small scope

One of the most useful decisions was to split the integration into stages.

The first version implemented only the article view counter.

Only after validating the entire path:

```text
Astro
→ Firebase SDK
→ Firestore
→ write
→ read
→ local test
→ GitHub Pages
```

was reader feedback added.

This made troubleshooting much easier. Once the counter worked, it was already clear that the Firebase configuration, environment variables, Firestore, and deployment path were correct.

The second feature therefore became an extension of a working mechanism rather than another large integration.

## Where AI entered the process

AI was used primarily to work with the existing codebase.

Instead of giving a short instruction such as:

> Add Firebase.

the task was described together with architectural constraints.

These included:

- do not modify individual Markdown articles,
- do not add a custom backend,
- keep GitHub Pages,
- reuse the existing article identification mechanism,
- make the feature testable locally,
- make sure a Firebase failure never prevents an article from rendering,
- limit repeated view counting,
- prepare Firestore security rules.

This changes the nature of working with AI.

The goal is no longer only to generate code, but to provide **the objective, context, and constraints**, and then evaluate the proposed solution.

## AI first analyzed the existing architecture

Before implementation, the agent inspected the project structure and the way articles were rendered.

Both the Polish and English versions of articles already used a shared `ArticleLayout.astro`.

That meant there was no need to modify many `.md` files.

The integration could be placed centrally:

```text
Markdown
   ↓
ArticleLayout
   ├── ArticleViews
   └── ArticleFeedback
```

As a result, every existing and future article automatically gets the new functionality.

This is a small example of the difference between generating code that works and introducing a change that fits an existing architecture.

## One article, two languages, one identifier

AI Dev Notes has Polish and English versions.

Both language variants of the same article share a common `translationKey`.

That key was also reused as the Firestore document identifier:

```text
articles/{translationKey}
```

As a result, the Polish and English versions of the same article share the same statistics.

The counter represents the popularity of the article itself rather than maintaining two separate counters for two translations.

No additional identifier had to be added to article frontmatter.

## The article view counter

The first feature was very simple from the reader's perspective:

```text
3 views
```

Behind that small label, however, are several implementation decisions.

The counter is incremented atomically in Firestore:

```text
views: 3
```

In addition, `sessionStorage` remembers that a given article has already been opened during the current browser session.

An example key is:

```text
ai-dev-notes:viewed:{slug}
```

This prevents a normal page refresh from increasing the counter on every `F5`.

It is not an analytics system comparable to Google Analytics, nor is it protection against deliberate manipulation. It is simply a lightweight view counter appropriate for a small educational site.

## Feedback instead of a traditional rating

The second step was to add simple feedback.

Instead of a scale such as:

```text
1 2 3 4 5
```

a reader can choose:

```text
Helpful
Too long
Too complex
Not helpful
```

This kind of result is more useful to the author.

A rating of `3/5` says very little.

A response such as:

> Too complex

can directly influence the next revision of the article.

In Firestore, the data can look like this:

```text
articles
  └── reviewing-ai-assisted-project
       ├── views: 3
       └── feedback
            └── helpful: 1
```

The remaining fields are created only when someone selects the corresponding option.

Eventually, a document might look like this:

```text
views: 120

feedback:
  helpful: 31
  tooLong: 4
  tooComplex: 7
  notHelpful: 2
```

## `localStorage` as a simple voting limit

For feedback, the application uses `localStorage`.

After Firestore confirms a successful vote, the application stores the user's selection:

```text
ai-dev-notes:feedback:{translationKey}
```

When the user returns to the article:

- the previous choice remains selected,
- another vote cannot normally be submitted.

This is not a complete security mechanism. A user can clear browser storage, and a custom client can bypass the frontend.

The goal was not to build an authenticated voting system, but to add a lightweight feedback mechanism.

## Firestore Security Rules matter more than hiding configuration

One of the more interesting parts of the integration was the Firebase configuration.

The application uses variables such as:

```text
PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID
```

The name `API_KEY` may suggest a secret similar to a server-side credential.

In a Firebase Web application, however, the client configuration is delivered to the browser. The presence of that configuration is not what secures the database.

That is why **Firestore Security Rules** are much more important.

In this project, the rules restrict, among other things:

- setting the view count to an arbitrary value,
- decreasing the counter,
- modifying unrelated fields,
- deleting documents.

The view count may only increase by `1`, and a feedback submission may increment only one allowed feedback counter.

AI also helped prepare and tighten those rules.

## Testing before deployment

The whole integration could be tested locally:

```bash
npm run dev
```

The local Astro application communicated with the same Firestore database later used by the GitHub Pages deployment.

The test covered, among other things:

```text
open an article
→ views increases

press F5
→ views does not increase again

open another article
→ separate counter

choose “Helpful”
→ helpful + 1

return to the article
→ previous selection is remembered
```

The production build was also verified:

```bash
npm run check
npm run build
```

and the components were checked on desktop and mobile layouts.

## AI also helped configure Firebase

The assistance did not stop at writing code.

AI also guided the Firebase setup process:

```text
create project
→ register Web app
→ keep GitHub Pages as hosting
→ create Cloud Firestore
→ configure .env
→ publish Security Rules
→ configure GitHub Actions Variables
```

This was especially useful because external service configuration and code changes could be treated as one continuous workflow.

Whenever a new decision appeared during setup, it could immediately be checked against the application's implementation.

## AI did not replace real testing

An important lesson from this experiment was that a report saying:

> the build passes

does not yet mean:

> the feature works.

Only an actual test in Firebase Console showed persisted data such as:

```text
feedback
  helpful: 1

views: 3
```

That confirmed the complete end-to-end flow:

```text
user click
→ application code
→ Firebase SDK
→ Security Rules
→ Firestore
→ persisted data
```

The feature was also tested again after deployment to GitHub Pages.

AI can prepare the implementation, analyze code, and automate a large part of the validation process, but final verification of a real integration still matters.

## What I learned from this stage

The most interesting part of this change was not Firebase itself.

A view counter and four feedback buttons are small features.

What was more interesting was using AI throughout the entire evolution of an existing application:

```text
idea
↓
define scope
↓
analyze architecture
↓
implementation
↓
review
↓
external service configuration
↓
local test
↓
deployment
↓
production test
```

In this kind of workflow, AI begins to play a much broader role than a code generator.

At the same time, human decisions are still necessary: what scope makes sense, how much complexity is justified, what level of protection is sufficient, and when the solution is ready.

For AI Dev Notes, the result was a small but complete evolution of the project:

```text
static site
      ↓
static site + dynamic data
      ↓
reader feedback
```

Firebase was added without changing the hosting platform, without building a custom backend, and without restructuring the existing articles.

---

This article describes a real change made to AI Dev Notes. Interestingly, the feedback mechanism described here is also the same mechanism you can use to rate this article.
