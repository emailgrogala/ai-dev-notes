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

Model korzysta z wcześniejszych instrukcji i danych wejściowych, dlatego wynik zależy od całego dostępnego kontekstu.

## Prompt nie daje pełnej kontroli

Nawet instrukcja „zwróć dokładnie JSON” może zakończyć się błędem. Dlatego system produkcyjny powinien mieć walidację.

```text
prompt
  ↓
LLM
  ↓
walidacja
  ↓
korekta lub odrzucenie
```

## Czy dłuższy prompt jest lepszy?

Nie zawsze. Powinien być na tyle szczegółowy, by ograniczyć niejednoznaczność, ale nie bardziej złożony niż zadanie tego wymaga.

## Gdzie kończy się prompt, a zaczyna aplikacja

Kod powinien odpowiadać za deterministyczne sterowanie procesem, a LLM za zadania językowe i niejednoznaczne.

> **Prompt jest częścią systemu, nie zamiennikiem całego systemu.**
