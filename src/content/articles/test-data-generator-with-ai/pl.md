---
title: "Jak zbudowałem generator danych testowych z pomocą dwóch agentów AI"
description: "Case study pokazujące, jak dwa agenty AI o rozdzielonych rolach mogą wspierać implementację, testy, code review i publikację działającej aplikacji."
date: 2026-09-17
lang: pl
translationKey: test-data-generator-with-ai
tags:
  - programming
  - agents
  - ai
  - react
  - testing
insights:
  - "W tym projekcie AI dawało największą wartość wtedy, gdy działało w jasno zdefiniowanym procesie, a nie tylko generowało pojedyncze fragmenty kodu."
  - "Rozdzielenie implementacji i review między dwóch agentów pomaga ograniczyć ryzyko bezkrytycznego zaakceptowania własnego rozwiązania."
  - "Człowiek nadal definiuje kierunek, zakres i kryteria jakości, a agenci realizują i kontrolują kolejne etapy pracy."
draft: false
---

**Test Data Generator** to lekka aplikacja webowa do generowania danych testowych przydatnych w codziennej pracy developerskiej.

Sam generator jest użyteczny, ale równie ważny jest sposób, w jaki powstał. Projekt stał się praktycznym eksperymentem pokazującym, jak budować oprogramowanie z wykorzystaniem **dwóch agentów AI o rozdzielonych rolach**.

Nie chodziło więc tylko o pytanie:

> „Czy AI potrafi napisać kod?”

Bardziej interesujące było:

> **czy AI można włączyć w cały kontrolowany proces tworzenia oprogramowania — od analizy zadania, przez implementację i testy, aż po oddzielny review wykonywany przez agenta, który nie implementował zmiany, i publikację?**

## Cel projektu

Aplikacja powstała jako prosty developer toolkit działający całkowicie lokalnie w przeglądarce.

Generuje przykładowe dane takie jak:

- PESEL,
- UUID v4,
- losowy tekst,
- NRB,
- IBAN,
- NIP.

Wszystkie wartości powstają lokalnie.

```text
przeglądarka
    ↓
generator
    ↓
wynik
```

Nie ma backendu ani bazy danych, a wygenerowane dane nie muszą opuszczać przeglądarki.

## Najpierw proces, potem kod

Projekt rozwijany jest iteracyjnie, w małych i kontrolowanych krokach.

Każde zadanie ma:

- jasno określony zakres,
- kryteria akceptacji,
- wymagania jakościowe,
- listę rzeczy pozostających poza bieżącym etapem.

To szczególnie ważne przy pracy z agentami AI, ponieważ model bardzo łatwo może rozszerzyć rozwiązanie o rzeczy, które wydają się sensowne, ale nie należą do aktualnego zadania.

## Wspólne źródło zasad

Implementer i reviewer korzystają z tych samych dokumentów projektowych:

- **PROJECT.md** — cel projektu, zakres i wymagania jakościowe,
- **AGENTS.md** — role agentów i zasady ich pracy,
- **README.md** — podstawowe informacje o aplikacji.

Dzięki temu wymagania nie istnieją wyłącznie w pojedynczym promptcie.

Stają się częścią repozytorium.

Można to uprościć:

```text
wymagania
   ↓
PROJECT.md / AGENTS.md / README.md
   ↓
Agent 1
   ↓
Agent 2
```

Oba agenty mają więc wspólny punkt odniesienia.

## Agent 1 — Implementer

Pierwszy agent odpowiada za implementację.

Jego zadania obejmują m.in.:

- analizę repozytorium,
- znalezienie właściwego miejsca na zmianę,
- implementację funkcji,
- dodanie lub aktualizację testów,
- uruchomienie technicznej weryfikacji projektu.

Agent nie otrzymuje wyłącznie polecenia:

```text
napisz generator NIP
```

Zadanie może opisywać również:

- zasady algorytmu,
- oczekiwane zachowanie UI,
- wymagane testy,
- ograniczenia zakresu.

To zbliża pracę bardziej do realizacji ticketu niż do jednorazowego generowania kodu.

## Agent 2 — Reviewer

Drugi agent ma inną rolę.

Nie implementuje funkcji i nie poprawia bezpośrednio kodu.

Jego zadaniem jest oddzielne sprawdzenie rozwiązania przez agenta, który nie implementował danej zmiany:

- zgodności z wymaganiami,
- poprawności implementacji,
- testów,
- architektury,
- potencjalnych regresji.

Problemy klasyfikowane są jako:

```text
BLOCKER
MAJOR
MINOR
SUGGESTION
```

Jeżeli review wykryje istotny problem, zmiana wraca do Agenta 1.

To ważne rozdzielenie odpowiedzialności.

Agent, który stworzył rozwiązanie, nie jest jedynym źródłem oceny jego jakości.

## Review jest niezależnym etapem

Obecnie review Agenta 2 uruchamiane jest ręcznie.

Proces wygląda tak:

```text
1. Wymaganie
2. PROJECT.md
3. Agent 1 — implementacja
4. Lint + testy + build
5. Agent 2 — code review
6. Poprawki, jeśli wymagane
7. APPROVE
8. Pull Request
9. Merge do main
10. GitHub Actions
11. GitHub Pages
```

To znacznie różni się od prostego:

```text
prompt
↓
kod
↓
commit
```

Między wygenerowaniem rozwiązania a publikacją istnieje kilka warstw kontroli.

## Kontrola zakresu

Jedną z ważniejszych zasad projektu jest ochrona zakresu zadania.

Reviewer nie powinien blokować zmiany dlatego, że nie zawiera funkcji, której aktualne zadanie nie wymagało.

Element spoza zakresu może zostać oznaczony jako:

```text
SUGGESTION
```

ale nie jako błąd blokujący.

Ta zasada ogranicza tzw. scope creep — niekontrolowane rozszerzanie zadania podczas implementacji lub review.

W pracy z AI ma to szczególne znaczenie, ponieważ model często potrafi znaleźć wiele dodatkowych „dobrych pomysłów”.

Nie oznacza to jednak, że każdy z nich powinien być realizowany natychmiast.

## Architektura: frontend-only

Aplikacja jest rozwiązaniem frontend-only.

Stack:

- **React**
- **Vite**
- **TypeScript**
- **Material UI**
- **Vitest**

Nie ma backendu ani bazy danych.

Logika generatorów została oddzielona od komponentów React.

To oznacza, że algorytmy takie jak:

```text
PESEL
NRB
IBAN
NIP
```

można testować niezależnie od UI.

Jest to istotne również przy kodzie generowanym z pomocą AI.

Test nie sprawdza, czy kod „wygląda poprawnie”.

Sprawdza, czy dla określonego wejścia otrzymujemy właściwy wynik.

## Od małego MVP do większej aplikacji

Pierwsze MVP obejmowało tylko:

- PESEL,
- UUID v4,
- losowy tekst.

Dopiero kolejne iteracje rozszerzały projekt.

Pojawiły się m.in.:

- zakładki tematyczne,
- accordiony generatorów,
- generowanie wielu rekordów,
- wybór zakresu dat dla PESEL,
- wybór płci,
- NRB i IBAN,
- NIP,
- wspólny panel wyników,
- kopiowanie pojedynczych i wielu wartości,
- poprawki dostępności,
- optymalizacja renderowania.

Każda większa funkcja powstawała jako osobny etap.

To pozwalało uniknąć próby zbudowania całej aplikacji jednym dużym poleceniem dla AI.

## Dlaczego małe iteracje działają lepiej

Przy małym zadaniu łatwiej określić:

```text
co ma powstać
co nie ma powstać
jak sprawdzić poprawność
```

Jeżeli zmiana dotyczy tylko generatora NIP, reviewer może skupić się na:

- algorytmie sumy kontrolnej,
- przypadkach brzegowych,
- testach,
- integracji z istniejącym UI.

Nie musi jednocześnie oceniać całej architektury aplikacji.

Mniejszy zakres ułatwia zarówno pracę człowiekowi, jak i agentom.

## Automatyczna weryfikacja

Przed zaakceptowaniem zmian uruchamiane są cztery podstawowe kontrole:

```text
lint
testy jednostkowe
build
git diff --check
```

Każda sprawdza inny rodzaj problemu.

### Lint

Wykrywa problemy ze stylem i część błędów statycznych.

### Testy

Sprawdzają logikę generatorów i zachowanie aplikacji.

### Build

Potwierdza, że aplikacja może zostać poprawnie zbudowana do wersji produkcyjnej.

### git diff --check

Pomaga znaleźć techniczne problemy w zmianach, np. zbędne białe znaki.

Żaden z tych mechanizmów osobno nie gwarantuje poprawności.

Razem tworzą jednak znacznie lepszą barierę przed przypadkowym zaakceptowaniem błędnego kodu.

## GitHub Actions i publikacja

Po merge do `main` uruchamiany jest GitHub Actions.

Pipeline:

```text
merge
  ↓
automatyczna weryfikacja
  ↓
build
  ↓
deploy
  ↓
GitHub Pages
```

Dzięki temu droga od zmiany w repozytorium do działającej aplikacji jest powtarzalna.

Agent nie publikuje ręcznie plików produkcyjnych.

Publikacja jest częścią zdefiniowanego procesu.

## AI potrafi popełniać błędy

Praca z agentami nie oznacza, że kod powstaje poprawnie za pierwszym razem.

W projekcie review prowadził m.in. do poprawek związanych z:

- przypadkami brzegowymi walidacji,
- obsługą dat,
- użyciem czasu UTC,
- dostępnością,
- zachowaniem komunikatów ARIA.

To jeden z ważniejszych praktycznych wniosków.

Kod wygenerowany przez AI może:

```text
wyglądać dobrze
+
kompilować się
+
przechodzić część testów
```

a mimo to wymagać poprawy.

Dlatego oddzielny review nie jest dodatkiem do procesu.

Jest jego częścią.

Nie oznacza to pełnej niezależności metodologicznej — oba etapy nadal korzystają z modeli AI i mogą dzielić podobne ograniczenia lub błędne założenia. Rozdzielenie ról daje jednak dodatkowy punkt kontroli.

## Czy Agent 2 zastępuje człowieka?

Nie.

Drugi agent może zwiększyć szansę znalezienia problemu, ale również jest modelem AI.

Może czegoś nie zauważyć, a jego udział nie dowodzi, że dwa agenty są zawsze lepsze od jednego. W tym projekcie rozdzielenie ról dało po prostu dodatkowy punkt kontroli.

Dlatego przepływ wygląda raczej tak:

```text
Agent 1
→ implementacja

Agent 2
→ niezależna analiza

testy i CI
→ automatyczna kontrola

człowiek
→ decyzja
```

Każda warstwa ma inne zadanie.

## Co w tym procesie robi człowiek?

W tym modelu rola człowieka nie znika.

Zmienia się.

Człowiek odpowiada przede wszystkim za:

- wybór problemu,
- określenie wymagań,
- podział pracy na etapy,
- kryteria akceptacji,
- decyzje UX,
- ocenę sugestii agentów,
- zatwierdzenie kierunku,
- decyzję o merge.

Agenci wykonują dużą część pracy technicznej, ale działają w ramach zdefiniowanego procesu.

## Od generowania kodu do procesu wytwarzania

Najciekawszy wniosek z projektu nie brzmi:

> „AI potrafi stworzyć generator PESEL albo NIP”.

To już stosunkowo proste zadanie.

Znacznie ciekawsze jest to, że AI można włączyć w szerszy proces:

```text
wymaganie
   ↓
implementacja
   ↓
testy
   ↓
review
   ↓
poprawki
   ↓
Pull Request
   ↓
CI
   ↓
publikacja
```

AI przestaje wtedy być wyłącznie generatorem fragmentów kodu.

Staje się uczestnikiem procesu wytwarzania oprogramowania.

## Najważniejszy wniosek

Największą wartość nie daje samo dodanie AI do IDE.

Daje ją połączenie AI z jasno określonymi zasadami:

- wspólnym źródłem wymagań,
- małymi zadaniami,
- rozdzieleniem implementacji i review,
- automatycznymi testami,
- kontrolą zmian przez Git,
- Pull Requestami,
- CI/CD,
- ostateczną decyzją człowieka.

Można to podsumować:

> **AI realizuje i kontroluje kolejne etapy, ale to człowiek definiuje kierunek i warunki, w których ta praca ma sens.**

To właśnie ten model najlepiej opisuje ten projekt:

> **human-directed, AI-assisted development**

## Projekt

Działająca aplikacja:

https://emailgrogala.github.io/test-data-generator/

Repozytorium:

https://github.com/emailgrogala/test-data-generator
