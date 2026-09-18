---
title: "Prompt to nie program — ale też nie zwykłe pytanie"
description: "Czym różni się prompt od kodu i zwykłego pytania oraz dlaczego sposób sformułowania instrukcji wpływa na wynik modelu."
date: 2026-09-16
lang: pl
translationKey: prompt-is-not-program
tags: [prompting, llm, ai]
insights:
  - "Prompt to instrukcja dla systemu probabilistycznego, a nie komenda dla deterministycznego programu."
  - "Dobry prompt ogranicza przestrzeń możliwych odpowiedzi, ale nie gwarantuje jednego wyniku."
  - "Prompt nie zastępuje walidacji, logiki aplikacji ani kontroli błędów."
draft: false
---
Prompt znajduje się gdzieś pomiędzy pytaniem a specyfikacją zadania. Można nim bardzo precyzyjnie określić cel, kontekst i format wyniku, ale model nadal nie wykonuje go tak deterministycznie jak program.

## Dlaczego prompt nie jest programem

Kod:

```text
2 + 2
```

powinien zawsze prowadzić do `4`.

Prompt może prowadzić do kilku różnych poprawnych odpowiedzi, ponieważ model generuje wynik probabilistycznie.

Ale probabilistyczność nie jest jedyną różnicą. Nawet jeśli ograniczymy losowość generowania, prompt nadal nie staje się kodem — model **interpretuje instrukcję**, zamiast wykonywać formalnie zdefiniowany algorytm.

## Ale prompt nie jest też zwykłym pytaniem

Porównaj:

```text
Co to jest API?
```

z:

```text
Wyjaśnij API osobie znającej podstawy programowania.
Podaj jeden przykład HTTP.
Nie używaj analogii do restauracji.
Maksymalnie 150 słów.
```

Druga wersja opisuje już sposób wykonania zadania.

## Prompt jako lekka specyfikacja

Przydatny schemat:

```text
CEL
KONTEKST
OGRANICZENIA
FORMAT
KRYTERIA
```

## Kontekst zmienia odpowiedź

Prompt użytkownika jest tylko jedną częścią kontekstu. Na wynik mogą wpływać również instrukcje systemowe i developerskie, historia rozmowy, wyniki narzędzi oraz inne dane wejściowe dostępne modelowi.

Dlatego ta sama instrukcja użytkownika może prowadzić do innego wyniku w innym kontekście.

## Prompt nie daje pełnej kontroli

Sama instrukcja w promptcie „zwróć dokładnie JSON” nie daje takiej samej gwarancji jak mechanizm **structured output**, schema validation lub tool calling dostępny w API.

Dlatego system produkcyjny nie powinien polegać wyłącznie na tekście promptu. Struktura odpowiedzi powinna być wymuszana lub walidowana przez mechanizmy aplikacyjne.

```text
prompt
  ↓
LLM
  ↓
structured output / walidacja schematu
  ↓
aplikacja
```

## Czy dłuższy prompt jest lepszy?

Nie zawsze. Powinien być na tyle szczegółowy, by ograniczyć niejednoznaczność, ale nie bardziej złożony niż zadanie tego wymaga.

## Gdzie kończy się prompt, a zaczyna aplikacja

Kod powinien odpowiadać za deterministyczne sterowanie procesem, a LLM za zadania językowe i niejednoznaczne.

> **Prompt jest częścią systemu, nie zamiennikiem całego systemu.**
