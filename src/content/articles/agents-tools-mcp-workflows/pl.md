---
title: "Agent, tool, MCP, workflow — gdzie kończy się chatbot, a zaczyna agent"
description: "Praktyczne rozróżnienie pomiędzy chatbotem, narzędziem, agentem, workflow i MCP oraz ich rolą w nowoczesnych aplikacjach AI."
date: 2026-09-17
lang: pl
translationKey: agents-tools-mcp-workflows
tags:
  - agents
  - mcp
  - tools
  - workflows
insights:
  - "Chatbot przede wszystkim odpowiada; agent może planować i wykonywać kolejne działania w środowisku."
  - "Tool to pojedyncza zdolność, workflow to zaprojektowany przepływ, a agent decyduje dynamicznie, jak wykonać cel."
  - "MCP nie jest agentem — jest standardem komunikacji, dzięki któremu model lub agent może korzystać z zewnętrznych zasobów i narzędzi."
draft: false
---

Słowo **agent** jest dziś używane bardzo szeroko. Czasem oznacza system, który samodzielnie wykonuje wieloetapowe zadanie. Czasem zwykłego chatbota z dostępem do jednej funkcji.

Dlatego warto rozdzielić kilka pojęć:

- chatbot,
- tool,
- workflow,
- agent,
- MCP.

## Chatbot

Najprostszy chatbot wygląda tak:

```text
user → LLM → answer
```

Użytkownik zadaje pytanie, model generuje odpowiedź i interakcja się kończy.

Chatbot może:
- wyjaśniać,
- pisać tekst,
- generować kod,
- analizować dostarczony kontekst.

Ale sam fakt, że model prowadzi rozmowę, nie oznacza jeszcze, że jest agentem.

## Tool

Tool to zewnętrzna funkcja lub możliwość, z której model może skorzystać.

Na przykład:
- wyszukiwarka,
- kalkulator,
- API pogodowe,
- baza danych,
- system plików,
- wykonanie kodu,
- wysłanie wiadomości.

Schemat:

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

Model nie musi sam znać wyniku działania narzędzia. Może go pobrać.

## Chatbot z toolami nadal nie zawsze jest agentem

Jeżeli aplikacja ma prostą regułę:

> Jeżeli użytkownik pyta o pogodę, wywołaj weather API.

to nadal może być zwykłym chatbotem z narzędziem.

Agentowość pojawia się wtedy, gdy system zaczyna samodzielnie decydować:
- jakie kroki wykonać,
- w jakiej kolejności,
- których narzędzi użyć,
- czy wynik jest wystarczający,
- czy potrzebna jest kolejna iteracja.

## Workflow

Workflow to z góry zaprojektowany przepływ.

Przykład przetwarzania dokumentów:

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

Każdy etap ma określoną odpowiedzialność.

LLM może być używany wewnątrz workflow, ale to nie oznacza, że cały system jest agentem.

Workflow jest zwykle bardziej przewidywalny niż agent.

## Agent

Agent otrzymuje **cel**, a nie tylko pojedynczą instrukcję.

Może następnie:
1. przeanalizować sytuację,
2. wybrać działanie,
3. użyć narzędzia,
4. ocenić wynik,
5. wykonać kolejny krok,
6. zakończyć po osiągnięciu celu.

Przykład:

> Sprawdź repozytorium, znajdź przyczynę błędu, popraw kod, uruchom testy i przygotuj podsumowanie.

To nie jest pojedyncze pytanie.

Agent musi wykonać serię działań zależnych od wyników poprzednich kroków.

## Agent jako pętla

W uproszczeniu:

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

Ta pętla jest jedną z kluczowych różnic między klasycznym chatbotem a agentem.

## Autonomia ma poziomy

Nie istnieje jedna granica, po której system nagle staje się agentem.

Można myśleć o skali:

```text
1. chatbot
2. chatbot + tool
3. model wybierający tool
4. model wykonujący kilka kroków
5. agent pracujący w środowisku
6. agent wykonujący długie zadania z minimalnym nadzorem
```

Im wyższa autonomia, tym ważniejsze stają się:
- uprawnienia,
- limity,
- monitoring,
- walidacja,
- możliwość zatrzymania procesu.

## Czym jest MCP

**Model Context Protocol** to standard pozwalający aplikacjom AI komunikować się z zewnętrznymi źródłami danych i narzędziami przez wspólny interfejs.

MCP nie jest:
- modelem,
- agentem,
- workflow.

Można go traktować jak warstwę integracyjną.

Zamiast budować osobną integrację dla każdego klienta AI, serwer MCP może udostępniać na przykład:
- tools,
- resources,
- prompts.

## Przykład

Załóżmy, że mamy system dokumentowy.

Serwer MCP może udostępnić tool:

```text
find_document(customer_id, document_type)
```

Agent może wtedy zdecydować:

1. potrzebuję dokumentu klienta,
2. wywołam `find_document`,
3. przeanalizuję wynik,
4. jeżeli czegoś brakuje, wykonam kolejne zapytanie.

MCP dostarcza mechanizm komunikacji.

Agent wykorzystuje go do realizacji celu.

## Tool i MCP to nie to samo

Tool to konkretna zdolność.

MCP to sposób jej udostępnienia.

Można mieć:
- tool bez MCP,
- MCP udostępniający wiele tools,
- agenta korzystającego z MCP,
- workflow korzystający z MCP bez agenta.

## Agent i workflow też nie są tym samym

Workflow:

```text
A → B → C → D
```

Agent:

```text
goal
 ↓
decyzja
 ├─ A
 ├─ B
 └─ C
      ↓
kolejna decyzja
```

Workflow daje większą kontrolę.

Agent daje większą elastyczność.

W praktyce dobre systemy często łączą oba podejścia.

## Agent wewnątrz workflow

Przykład:

```text
OCR
 ↓
classification
 ↓
┌───────────────────────┐
│ extraction agent      │
│ - wybiera tool        │
│ - sprawdza dane       │
│ - ponawia ekstrakcję  │
└───────────────────────┘
 ↓
validation
 ↓
business system
```

Nie trzeba budować całego procesu jako jednego autonomicznego agenta.

Często lepiej ograniczyć agentowość tylko do miejsca, gdzie rzeczywiście daje przewagę.

## Dlaczego to rozróżnienie jest ważne

Jeżeli każdy system z LLM nazywamy agentem, trudno rozmawiać o:
- architekturze,
- bezpieczeństwie,
- kosztach,
- odpowiedzialności,
- testowaniu.

System, który tylko odpowiada na pytanie, ma zupełnie inny profil ryzyka niż agent mogący:
- edytować pliki,
- wykonywać komendy,
- wysyłać wiadomości,
- zmieniać dane.

## Prosty model mentalny

Można zapamiętać:

> **Chatbot rozmawia. Tool wykonuje pojedynczą czynność. Workflow prowadzi przez ustaloną ścieżkę. Agent wybiera kolejne działania. MCP pomaga połączyć AI z narzędziami i danymi.**

W praktycznych systemach te elementy bardzo często występują razem.
