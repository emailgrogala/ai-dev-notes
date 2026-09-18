---
title: "What does training an AI model actually mean?"
description: "Pretraining, fine-tuning, instruction tuning, RLHF, RAG, and inference — how they differ and which processes actually change the model."
date: 2026-09-18
lang: en
translationKey: what-model-training-really-means
tags:
  - ai
  - llm
  - training
  - fine-tuning
  - rag
insights:
  - "Training means updating model parameters using data and an optimization objective; prompts, RAG, and conversational memory usually do not change model weights."
  - "Pretraining, instruction tuning, preference tuning, and fine-tuning are different stages or strategies and should not be treated as interchangeable terms."
  - "Inference means using an already trained model. New context can change the answer without changing the model's parameters."
draft: false
---

In discussions about AI, the word **“training”** is often used very broadly.

Sometimes it means actual learning from data.

Sometimes someone says:

> “I trained ChatGPT on my documents”

when they actually built a RAG system.

In other cases:

> “the model learned me during the conversation”

when only the available context or memory changed.

These are not the same thing.

The most important distinction is:

```text
model parameters change
        ↓
training / tuning
```

versus:

```text
same model
+
new prompt / context / documents
        ↓
inference
```

## What is actually being trained?

A language model contains a very large number of **parameters**, often informally called weights.

They are numerical values that determine how the model transforms its input.

During training:

```text
training data
      ↓
model makes a prediction
      ↓
error is calculated
      ↓
parameters are updated
      ↓
next iteration
```

This process is repeated many times.

A central element is the **loss function** — a measure of how far the model's output is from the objective defined by the training procedure.

An optimizer uses that signal to update parameters.

In simplified form:

```text
prediction
   ↓
loss
   ↓
gradient
   ↓
weight update
```

If the model's weights are being updated, the model is learning.

## Pretraining

The first major stage is usually **pretraining**.

The model processes very large datasets and learns to predict subsequent tokens.

For example:

```text
Alice has a ...
```

the model may try to predict:

```text
cat
dog
house
...
```

At first, its predictions are poor.

After a huge number of examples, the parameters begin to capture patterns related to:

- syntax,
- language style,
- relationships between concepts,
- text structure,
- recurring patterns in the data.

The result is a **base model**.

That does not automatically mean the model will behave well as a conversational assistant.

## Instruction tuning

A later stage may be **instruction tuning**.

The model receives examples such as:

```text
instruction
↓
desired response
```

For example:

```text
User:
Summarize this text in three bullet points.

Response:
1. ...
2. ...
3. ...
```

The objective is no longer merely to produce text resembling the training corpus.

The model learns to respond more effectively to instructions.

This is still training — model parameters are updated.

## Preference tuning and RLHF

Following instructions is not enough.

Two responses can both be technically valid, while one is:

- more helpful,
- safer,
- more precise,
- better aligned with user expectations.

Models can therefore be further tuned using **preference data**.

A simplified process looks like:

```text
prompt
 ↓
response A
response B
 ↓
rating / preference
 ↓
model tuning
```

One method is **RLHF — Reinforcement Learning from Human Feedback**.

An important distinction:

> **RLHF is one approach to preference tuning, not a synonym for all model alignment or tuning.**

Other preference-learning methods also exist.

## Fine-tuning

**Fine-tuning** means further training an existing model on an additional dataset.

Instead of:

```text
random parameters
↓
massive training run
↓
model
```

we start from a capable model:

```text
existing model
↓
additional examples
↓
fine-tuning
↓
adapted model
```

Fine-tuning can be used to:

- reinforce a particular output format,
- improve performance on a class of tasks,
- adapt style,
- teach recurring task patterns.

This is **not the same as supplying documents in a prompt**.

Fine-tuning changes model parameters.

## Continued pretraining

Another technique is **continued pretraining**.

The model continues training in a way similar to its original pretraining, but on an additional corpus that may focus on a specific domain.

For example:

```text
general model
↓
large technical corpus
↓
continued pretraining
↓
domain-adapted model
```

This is not the same as ordinary instruction fine-tuning.

The objective and type of data are different.

## What is NOT model training?

This distinction is the most important part.

### Prompting

A prompt changes the model's input.

```text
model
+
new instruction
↓
different answer
```

That does not automatically change its parameters.

### System prompts

A system prompt can strongly influence model behavior, but it is still context supplied at inference time.

It is not training by itself.

### Context windows

Supplying more information in the context lets the model use that information in the current run.

```text
model
+
more context
↓
response
```

The model weights stay the same.

### RAG

RAG works like this:

```text
question
↓
retrieval
↓
selected documents
↓
LLM context
↓
answer
```

The model receives additional information when the request is processed.

**RAG does not require changing the model's parameters.**

So the sentence:

> “I trained the model on my documents using RAG”

is technically misleading.

A more precise description is:

> “I built a system that supplies my documents to the model through RAG.”

## Embeddings and vector search

Generating document embeddings also does not mean training the main generative LLM.

Embeddings can support retrieval:

```text
question
↓
embedding
↓
similarity search
↓
LLM
```

That is part of the retrieval system, not an update to the parameters of the model generating the answer.

## Conversational memory

A system may remember something such as:

```text
user prefers concise answers
```

and inject that information into later conversations.

It can look as if the model has “learned”.

Technically, the mechanism can simply be:

```text
same model
+
remembered information
↓
different answer
```

No weight update is required.

## Quantization

Quantization is also not training in the usual sense.

It represents model parameters with lower numerical precision in order to:

- reduce memory requirements,
- run on smaller hardware,
- improve inference speed in some configurations.

```text
FP16 model
↓
quantization
↓
8-bit / 4-bit model
```

The representation changes, but the model is not learning new examples.

## Downloading a local model

Downloading a model through a tool such as Ollama is not training either.

```text
download
↓
local model
↓
inference
```

Only when an actual fine-tuning or other training procedure is run do we begin modifying the model.

## Inference — using the trained model

**Inference** is the stage where a trained model is used.

```text
prompt
↓
tokenization
↓
computation using existing weights
↓
next tokens
↓
response
```

This is what normally happens during a conversation with an LLM.

The model performs computation using parameters it already has.

## Does talking to a model train it?

Not directly.

If you say:

> “From now on, answer briefly.”

later responses may become shorter.

But the mechanism is closer to:

```text
instruction
↓
remains in context
↓
affects later responses
```

than to:

```text
instruction
↓
immediate weight update
```

That difference matters.

Depending on the product and user settings, conversation data may later be used by the provider in a separate process to improve future models.

That is a different process from the live conversation.

It does not mean the model updates its parameters after every user message.

## One model, many systems

The same model can be used in very different architectures.

```text
model
+ simple prompt
```

or:

```text
model
+ system prompt
+ history
+ memory
+ RAG
+ tools
```

The second system may appear far more capable.

That does not necessarily mean the underlying model was additionally trained.

The environment around inference changed.

## Where is the boundary?

A useful mental model is:

```text
PRETRAINING
      ↓
base model
      ↓
instruction tuning
      ↓
preference tuning / RLHF
      ↓
fine-tuning / continued pretraining
      ↓
MODEL
══════════════════════════════
      ↓
prompt
context
memory
RAG
tools
      ↓
INFERENCE
      ↓
answer
```

Elements **above the line** can change model parameters.

Elements **below the line** mainly change the information and capabilities available during a particular use of the model.

Real systems can be more complicated, but this distinction is a useful mental model.

## Why does the distinction matter?

Because these approaches solve different architectural problems.

If the problem is:

> the model does not know the latest documentation

fine-tuning may not be the best solution.

Often the better choice is:

```text
RAG
```

If instead we want to:

> make a model consistently perform a specific type of task

fine-tuning may be appropriate.

If we only want to:

> change the style of the response

a good prompt or system prompt may be enough.

So before saying:

> “we need to train the model”

it is worth asking:

> **what exactly are we trying to change — the information available at query time, the behavior of the surrounding system, or the parameters of the model itself?**

Those are three different problems.
