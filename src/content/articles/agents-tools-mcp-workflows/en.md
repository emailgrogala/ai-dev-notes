---
title: "Agent, tool, MCP, workflow — where does a chatbot end and an agent begin?"
description: "A practical distinction between chatbots, tools, workflows, agents, and MCP in modern AI applications."
date: 2026-09-17
lang: en
translationKey: agents-tools-mcp-workflows
tags:
  - agents
  - mcp
  - tools
  - workflows
insights:
  - "A chatbot mainly responds; an agent can plan and execute a sequence of actions in an environment."
  - "A tool is one capability, a workflow is a designed process, and an agent dynamically decides how to pursue a goal."
  - "MCP is not an agent — it is a protocol for exposing tools and context to AI systems."
draft: false
---

The word **agent** is used very broadly.

Sometimes it describes a system that independently performs a multi-step task. Sometimes it describes little more than a chatbot with one function call.

It helps to separate five concepts:
- chatbot,
- tool,
- workflow,
- agent,
- MCP.

## Chatbot

A basic chatbot looks like this:

```text
user → LLM → answer
```

The user asks something and the model responds.

That alone does not make it an agent.

## Tool

A tool is an external capability available to the model.

Examples:
- search,
- calculator,
- database,
- file system,
- code execution,
- external API,
- messaging.

Typical flow:

```text
user
 ↓
LLM
 ↓
tool call
 ↓
tool result
 ↓
LLM
 ↓
answer
```

## A chatbot with tools is not automatically an agent

If the application simply follows a fixed rule such as:

> For weather questions, call the weather API.

then it may still be a chatbot with a tool.

Agent-like behavior begins when the system can decide:
- which action to take,
- which tool to use,
- in what order,
- whether the result is sufficient,
- whether another iteration is needed.

## Workflow

A workflow is a designed sequence.

For document processing:

```text
PDF
 ↓
OCR
 ↓
classification
 ↓
extraction
 ↓
validation
 ↓
business system
```

An LLM may appear inside the workflow without making the whole process an agent.

Workflows are usually more predictable.

## Agent

There is no single universally accepted definition of an agent. In this article, we use a practical definition: a system that can choose the next actions needed to pursue a goal.

An agent receives a **goal** and decides how to pursue it.

For example:

> Inspect the repository, find the bug, fix it, run tests, and summarize the result.

This requires multiple dependent actions.

A simplified agent loop:

```text
goal
 ↓
reason / plan
 ↓
action
 ↓
observation
 ↓
reason / plan
 ↓
action
 ↓
...
 ↓
result
```

## Autonomy exists on a spectrum

There is no single hard boundary.

A useful spectrum is:

```text
1. chatbot
2. chatbot + tool
3. model chooses the tool
4. model performs several steps
5. agent operates in an environment
6. long-running agent with limited supervision
```

The more autonomy a system has, the more important permissions, limits, monitoring, validation, and shutdown mechanisms become.

## What is MCP?

**Model Context Protocol** is a communication protocol between an AI application and external systems. It standardizes how a server can expose capabilities such as `tools`, `resources`, and `prompts`.

MCP is not:
- a model,
- an agent,
- a workflow.

It can be treated as an integration layer built around a shared protocol.

An MCP server may expose:
- tools,
- resources,
- prompts.

## Example

Imagine a document platform.

An MCP server exposes:

```text
find_document(customer_id, document_type)
```

An agent may decide:

1. I need the customer's policy,
2. I will call `find_document`,
3. I will inspect the result,
4. if something is missing, I will make another call.

MCP provides the communication mechanism.

The agent decides how to use it.

## Tool and MCP are different concepts

A tool is a capability.

MCP is one way to expose that capability.

You can have:
- a tool without MCP,
- an MCP server exposing many tools,
- an agent using MCP,
- a deterministic workflow using MCP without any agent.

## Agent and workflow are different too

Workflow:

```text
A → B → C → D
```

Agent:

```text
goal
 ↓
decision
 ├─ A
 ├─ B
 └─ C
      ↓
another decision
```

Workflows provide control.

Agents provide flexibility.

Many practical systems combine both.

## Agent inside a workflow

A useful architecture may look like:

```text
OCR
 ↓
classification
 ↓
┌───────────────────────┐
│ extraction agent      │
│ - chooses tools       │
│ - validates data      │
│ - retries if needed   │
└───────────────────────┘
 ↓
validation
 ↓
business system
```

There is no need to turn the entire system into one autonomous agent.

## Why the distinction matters

If every LLM application is called an agent, it becomes difficult to discuss:
- architecture,
- safety,
- cost,
- testing,
- responsibility.

A chatbot that only generates text has a very different risk profile from a system that can edit files, execute commands, or modify production data.

## A simple mental model

> **A chatbot talks. A tool performs one capability. A workflow follows a designed path. An agent chooses the next action. MCP connects AI systems to external tools and context.**

In practical applications, these concepts often work together.
