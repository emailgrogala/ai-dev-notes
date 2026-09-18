---
title: "What happens to the data I enter during a conversation?"
description: "How ChatGPT handles conversation data, how history, memory and model training differ, and which controls are available to users."
date: 2026-09-14
lang: en
translationKey: what-happens-to-chat-data
tags: [privacy, chatgpt, data]
insights:
  - "Chat history, memory, and the use of conversations for model improvement are separate mechanisms."
  - "Temporary Chat does not create or update memories, but a personalized temporary chat can use existing personalization."
  - "Do not put information into a chat that you would not want processed outside your own system."
draft: false
---

The question “what happens to what I type into ChatGPT?” does not have one single answer because several mechanisms sit behind the same interface. The key is to separate chat history, memory, personalization, and possible use of content for model improvement.

> **Information current as of September 2026.** Privacy features and ChatGPT behavior can change, so current OpenAI documentation should be checked when a decision depends on the details.

## Chat history

History lets you return to previous conversations. Saving a conversation in history is not the same as saving information in memory.

Deleting, saving, or using a temporary conversation are separate mechanisms and may follow different retention rules.

## Memory

Memory supports personalization in future conversations using information available to ChatGPT according to the user's settings.

The important distinction is:

```text
chat history
≠ memory
```

A conversation can remain in history without creating a new memory, while an existing memory may influence a later answer when personalization is enabled.

## Model improvement

For individual services such as ChatGPT and Codex, OpenAI may use content to train and improve its models.

Users can opt out in:

```text
Settings
→ Data Controls
→ Improve the model for everyone
```

When this setting is turned off, **new conversations are not used to train OpenAI models**. Chat history can still remain enabled.

Business offerings and the API follow separate rules; according to OpenAI documentation, inputs and outputs in those services are not used for model training by default.

## Temporary Chat

Temporary Chat is intended for conversations that you do not want to behave like normal saved chats.

Before the conversation starts, you can choose:

- **Personalized** — may use existing memories, custom instructions, and available personalization,
- **Unpersonalized** — does not use memory, custom instructions, or personalization.

While the conversation remains temporary:

- it does not appear in chat history,
- it does not create or update memories,
- it is not used to improve models,
- OpenAI may retain a copy for up to 30 days for safety purposes.

A Temporary Chat can later be saved. Once saved, it becomes a regular chat and follows the standard account settings for history, memory, and model improvement.

## Confidential information

A useful rule remains:

> do not put information into an external system if you are not comfortable with that information being processed there.

This includes passwords, company secrets, credentials, or unnecessary personal data.

## Apps and external services

When a model uses external apps, plugins, actions, or other integrations, some data may be passed to another provider under that service's own rules.

Privacy therefore depends not only on ChatGPT settings, but also on the external services involved in the interaction.

## The key distinction

```text
history
≠ memory
≠ personalization
≠ model improvement
≠ external integrations
```

Treating these mechanisms as one thing causes many misunderstandings.

## Sources and freshness

For privacy-sensitive decisions, check the current OpenAI documentation:

- Data Controls FAQ: https://help.openai.com/en/articles/7730893
- Temporary Chat in ChatGPT: https://help.openai.com/en/articles/8914046
- How your data is used to improve model performance: https://help.openai.com/en/articles/5722486
