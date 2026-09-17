---
title: "Context window, embeddings i RAG — czym się różnią i kiedy czego używać"
description: "Wyjaśnienie trzech często mylonych pojęć: okna kontekstu, embeddingów i RAG oraz ich roli w systemach opartych na LLM."
date: 2026-09-17
lang: pl
translationKey: context-embeddings-rag
tags:
  - llm
  - rag
  - embeddings
  - context
insights:
  - "Context window mówi, ile informacji model może przetworzyć naraz, a nie ile wiedzy posiada."
  - "Embedding zamienia treść na reprezentację wektorową, dzięki której można wyszukiwać podobne znaczeniowo fragmenty."
  - "RAG łączy wyszukiwanie z generowaniem: najpierw znajduje potrzebne dane, a dopiero potem przekazuje je do modelu."
draft: false
---

Przy budowaniu aplikacji z LLM szybko pojawiają się trzy pojęcia: **context window**, **embeddings** i **RAG**.

Są ze sobą powiązane, ale rozwiązują zupełnie różne problemy.

Najprościej:

```text
Context window → ile informacji model widzi teraz
Embeddings     → jak reprezentować znaczenie tekstu
RAG            → jak znaleźć właściwe informacje i przekazać je modelowi
```

## Context window

Okno kontekstu to maksymalna ilość informacji, którą model może uwzględnić podczas pojedynczej interakcji.

W kontekście mogą znaleźć się:
- instrukcje systemowe,
- historia rozmowy,
- pytanie użytkownika,
- dokumenty,
- wyniki narzędzi,
- fragmenty kodu.

Model nie „pamięta” dowolnej ilości tekstu naraz.

Jeżeli aplikacja przekazuje bardzo dużo danych, wcześniej czy później pojawi się limit.

## Większy context window nie oznacza większej wiedzy

To częste nieporozumienie.

Duże okno kontekstu oznacza, że model może jednocześnie analizować więcej informacji.

Nie oznacza, że:
- został wytrenowany na większej liczbie danych,
- automatycznie lepiej rozumuje,
- zawsze dobrze wykorzysta cały przekazany tekst.

Można to porównać do biurka.

Model może mieć większe biurko, na którym mieści się więcej dokumentów. Nie oznacza to jednak, że sam z siebie zna treść dokumentów, których na biurku nie ma.

## Dlaczego nie wrzucić po prostu wszystkich dokumentów do kontekstu?

Dla małych zbiorów czasem ma to sens.

Przy większych pojawiają się problemy:
- limit tokenów,
- większy koszt,
- większe opóźnienie,
- dużo nieistotnego tekstu,
- trudniejsze znalezienie właściwego fragmentu.

Jeżeli użytkownik pyta o jedną konkretną fakturę, przekazywanie modelowi dziesięciu tysięcy dokumentów nie jest dobrym rozwiązaniem.

I tutaj pojawiają się embeddings.

## Embeddings

Embedding to numeryczna reprezentacja znaczenia danych.

Dla tekstu może to wyglądać koncepcyjnie tak:

```text
"pies" → [0.12, -0.31, 0.88, ...]
```

W praktyce taki wektor może mieć setki lub tysiące wymiarów.

Najważniejsze jest to, że teksty podobne znaczeniowo mają zwykle reprezentacje położone bliżej siebie w przestrzeni wektorowej.

Dzięki temu zapytanie:

> Jak anulować polisę?

może znaleźć dokument zawierający:

> Procedura wypowiedzenia umowy ubezpieczenia

nawet jeżeli nie użyto dokładnie tych samych słów.

## Embedding nie jest odpowiedzią

Embedding sam niczego nie „wyjaśnia”.

Jest narzędziem, które pomaga:
- wyszukiwać semantycznie,
- grupować podobne treści,
- znajdować podobne dokumenty,
- budować rekomendacje.

Do przechowywania takich reprezentacji często używa się baz wektorowych.

Przykłady zastosowań:
- Qdrant,
- pgvector,
- Pinecone,
- Weaviate.

## Czym jest RAG

RAG to skrót od **Retrieval-Augmented Generation**.

Najważniejsza idea jest prosta:

> Zanim model odpowie, system wyszukuje informacje, które mogą być potrzebne do odpowiedzi.

Typowy przepływ:

```text
pytanie użytkownika
        ↓
embedding pytania
        ↓
wyszukiwanie podobnych fragmentów
        ↓
wybrane fragmenty dokumentów
        ↓
context window LLM
        ↓
odpowiedź
```

LLM nie musi otrzymywać całej bazy danych.

Dostaje tylko kilka fragmentów uznanych za istotne.

## Przykład

Załóżmy, że firma posiada 100 000 dokumentów.

Użytkownik pyta:

> Jaki był limit odpowiedzialności w polisie klienta X?

Bez RAG można próbować przekazać modelowi bardzo dużo dokumentów, co szybko staje się niepraktyczne.

Z RAG:

1. system wyszukuje dokument klienta,
2. znajduje fragment dotyczący limitu,
3. przekazuje tylko ten fragment do modelu,
4. model generuje odpowiedź.

## Context window i RAG nie są konkurencją

RAG korzysta z okna kontekstu.

Różnica polega na tym, **co do tego kontekstu trafia**.

Bez retrieval:

```text
dużo dokumentów → LLM
```

Z retrieval:

```text
dużo dokumentów
      ↓
wyszukiwanie
      ↓
kilka trafnych fragmentów
      ↓
LLM
```

## Gdzie pasują embeddings

Embeddings są jednym ze sposobów realizacji etapu wyszukiwania.

Nie każdy RAG musi wykorzystywać wyłącznie wyszukiwanie wektorowe.

Można łączyć:
- full-text search,
- filtry metadanych,
- embeddings,
- wyszukiwanie hybrydowe,
- reranking.

Na przykład:

```text
category = "invoice"
AND year = 2026
AND semantic_similarity(query, document) > threshold
```

## Chunking ma znaczenie

Dokumenty zwykle nie są zapisywane jako jeden wielki embedding.

Dzieli się je na fragmenty — **chunks**.

Jeżeli fragment jest zbyt duży:
- może zawierać dużo nieistotnego tekstu.

Jeżeli jest zbyt mały:
- może stracić potrzebny kontekst.

Dobór chunkingu jest jednym z najważniejszych elementów praktycznego RAG.

## RAG nie rozwiązuje wszystkiego

RAG może się pomylić jeszcze przed generowaniem odpowiedzi.

System może:
- nie znaleźć właściwego fragmentu,
- znaleźć fragment podobny, ale błędny,
- pobrać za mało kontekstu,
- źle podzielić dokument.

Dlatego jakość systemu zależy od dwóch elementów:

```text
retrieval quality + generation quality
```

## Kiedy używać czego

### Sam context window

Dobrze sprawdza się, gdy:
- danych jest niewiele,
- dokument jest krótki,
- wszystko mieści się w promptcie,
- potrzebujemy jednorazowej analizy.

### Embeddings

Przydają się, gdy:
- chcemy wyszukiwać po znaczeniu,
- mamy dużą kolekcję tekstów,
- dokładne słowa nie zawsze występują w dokumencie.

### RAG

Ma sens, gdy:
- wiedza znajduje się poza modelem,
- dokumentów jest dużo,
- informacje często się zmieniają,
- odpowiedzi powinny bazować na konkretnych materiałach.

## Prosty model mentalny

Można zapamiętać to w taki sposób:

> **Context window to miejsce na biurku. Embeddings pomagają znaleźć właściwą teczkę. RAG przynosi z archiwum właściwe strony i kładzie je na biurku modelu.**

Te trzy mechanizmy nie zastępują się wzajemnie.

W dobrze zaprojektowanym systemie często współpracują.
