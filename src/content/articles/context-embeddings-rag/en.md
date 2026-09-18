---
title: "Context windows, embeddings, and RAG — what is the difference?"
description: "A practical explanation of three concepts that are often confused: context windows, embeddings, and retrieval-augmented generation."
date: 2026-09-17
lang: en
translationKey: context-embeddings-rag
tags:
  - llm
  - rag
  - embeddings
  - context
insights:
  - "A context window defines how many tokens a model can handle in one run, not how much knowledge it has."
  - "Embeddings are learned vector representations that make semantic similarity search possible."
  - "RAG combines retrieval with generation: it finds relevant information first and only then passes it to the model."
draft: false
---

When building applications with LLMs, three concepts appear quickly: **context windows**, **embeddings**, and **RAG**.

They are related, but they solve different problems.

```text
Context window → how much information the model can see now
Embeddings     → how meaning can be represented numerically
RAG            → how relevant information is found and passed to the model
```

## Context window

The context window defines how many tokens a model can handle in one run. It includes the supplied context and, depending on the model and how the limit is defined, space needed for the generated output.

It may contain:
- system instructions,
- conversation history,
- the user prompt,
- documents,
- tool outputs,
- source code.

A larger context window means more information can be processed at once.

It does not mean the model has more built-in knowledge.

## Why not put every document into the prompt?

For small datasets, that can work.

At larger scale it becomes inefficient because of:
- token limits,
- cost,
- latency,
- irrelevant text,
- difficulty locating the important fragment.

If the user asks about one insurance policy, sending ten thousand documents is not a sensible strategy.

## Embeddings

An embedding is a learned numerical representation of content. It is not a literal encoding of “meaning”, but it makes semantic features and similarity measurable.

Conceptually:

```text
"dog" → [0.12, -0.31, 0.88, ...]
```

Semantically similar content tends to have vectors that are close to one another.

This makes it possible for a query such as:

> How do I cancel the policy?

to retrieve a document containing:

> Procedure for terminating an insurance contract

even if the exact words are different.

## An embedding is not an answer

Embeddings are useful for:
- semantic search,
- clustering,
- finding similar documents,
- recommendations.

They are often stored and searched using vector databases and related technologies such as Qdrant, Pinecone, Weaviate, or PostgreSQL with the pgvector extension.

## What is RAG?

RAG stands for **Retrieval-Augmented Generation**.

The core idea is simple:

> Before the model answers, the system retrieves information that may be needed.

A typical flow:

```text
user question
      ↓
query embedding
      ↓
semantic search
      ↓
relevant document chunks
      ↓
LLM context window
      ↓
answer
```

The model does not need the entire knowledge base.

It receives only the selected fragments.

RAG **does not change the model's weights**. It supplies additional information at query time, which makes it different from training or fine-tuning.

## Context windows and RAG are not competitors

RAG uses the context window.

The difference is what gets placed into it.

Without retrieval:

```text
many documents → LLM
```

With retrieval:

```text
many documents
      ↓
search
      ↓
a few relevant chunks
      ↓
LLM
```

## Where embeddings fit

Embeddings are one way to implement retrieval.

Real systems may combine:
- full-text search,
- metadata filters,
- vector similarity,
- hybrid search,
- reranking.

## Chunking matters

Documents are usually divided into smaller pieces called **chunks**.

Chunks that are too large include irrelevant text.

Chunks that are too small may lose necessary context.

Chunking strategy can have a major impact on RAG quality.

## RAG can still fail

Retrieval can fail before generation even begins.

The system may:
- miss the correct fragment,
- retrieve a similar but wrong document,
- provide too little context,
- split the source badly.

The final quality depends on both:

```text
retrieval quality + generation quality
```

## When to use each approach

### Context window only

Useful when:
- the data is small,
- the document is short,
- everything fits comfortably in the prompt,
- the analysis is one-off.

### Embeddings

Useful when:
- semantic search is needed,
- the collection is large,
- exact keywords are not reliable.

### RAG

Useful when:
- knowledge lives outside the model,
- documents are numerous,
- information changes often,
- answers should rely on specific source material.

## A simple mental model

> **The context window is the desk. Embeddings help find the right folder. RAG brings the relevant pages from the archive and puts them on the model’s desk.**

These concepts do not replace each other.

In practical systems, they often work together.
