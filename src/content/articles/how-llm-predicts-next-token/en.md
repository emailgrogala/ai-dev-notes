---
title: "How does an LLM work? From “Alice has a cat” to predicting the next token"
description: "A simple but technically grounded explanation of how language models learn next-token probabilities and why temperature changes generation."
date: 2026-09-16
lang: en
translationKey: how-llm-predicts-next-token
tags: [llm, tokens, probability, temperature]
insights:
  - "An LLM generates an answer step by step by predicting successive tokens."
  - "The most probable token does not have to be selected on every run."
  - "Temperature changes the sampling distribution, not the model's knowledge."
draft: false
---
The simplest way to understand an LLM is to start with one question: **what should come next?** A language model does not look up a finished answer in a table. It produces a probability distribution over next tokens and generates text from that distribution.

## The simplest possible example

```text
Alice has a cat
Alice has a cat
Alice has a dog
```

In a toy model:

```text
P("cat" | "Alice has a") = 2/3 ≈ 66.7%
P("dog" | "Alice has a") = 1/3 ≈ 33.3%
```

## Will the model always choose “cat”?

No. `cat` can remain the top token while an individual sample still selects `dog`.

## Where temperature comes in

Lower temperature sharpens the distribution; higher temperature flattens it.

```text
pᵢ' = pᵢ^(1/T) / Σ pⱼ^(1/T)
```

<next-token-sandbox lang="en"></next-token-sandbox>

## A real LLM does not store this table

A real model learns a huge number of parameters stored in matrices.

```text
text
  ↓
tokens
  ↓
vectors
  ↓
matrix operations
  ↓
logits
  ↓
softmax
  ↓
probabilities
```

## Tokens, not words

A token can represent a word, part of a word, punctuation, or a piece of code.

## Training

The model predicts the next token, compares it with the correct token, and adjusts parameters through backpropagation.

## Context and attention

Attention helps determine which earlier pieces of context matter for the current prediction.

## Logits and softmax

The model produces logits, which softmax converts into a probability distribution.

## Generation as a loop

After a token is selected, it becomes part of the next context:

```text
context
   ↓
predict token
   ↓
select token
   ↓
append it
   ↓
repeat
```

Long answers emerge from repeating this loop.
