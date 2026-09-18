---
title: "Co naprawdę znaczy trenowanie modelu AI?"
description: "Pretraining, fine-tuning, instruction tuning, RLHF, RAG i inference — czym się różnią i które z tych procesów rzeczywiście zmieniają model."
date: 2026-09-18
lang: pl
translationKey: what-model-training-really-means
tags:
  - ai
  - llm
  - training
  - fine-tuning
  - rag
insights:
  - "Trenowanie modelu oznacza aktualizowanie jego parametrów na podstawie danych i funkcji straty; prompt, RAG czy pamięć rozmowy zwykle nie zmieniają wag modelu."
  - "Pretraining, instruction tuning, preference tuning i fine-tuning to różne etapy lub strategie uczenia — nie warto używać tych nazw zamiennie."
  - "Inference to używanie już wytrenowanego modelu. Model może dostać nowy kontekst, ale jego parametry nie muszą się przez to zmieniać."
draft: false
---

W rozmowach o AI słowo **„trenowanie”** jest używane bardzo szeroko.

Czasem oznacza rzeczywiste uczenie modelu na danych.

Czasem ktoś mówi:

> „wytrenowałem ChatGPT na swoich dokumentach”

choć w praktyce zbudował system RAG.

Innym razem:

> „model nauczył się mnie podczas rozmowy”

choć zmienił się tylko kontekst albo pamięć dostępna przy kolejnych odpowiedziach.

Te rzeczy nie są tym samym.

Najważniejsze rozróżnienie można zapisać tak:

```text
zmiana parametrów modelu
        ↓
trening / dostrajanie
```

oraz:

```text
ten sam model
+
nowy prompt / kontekst / dokumenty
        ↓
inference
```

## Co właściwie jest trenowane?

Model językowy zawiera ogromną liczbę **parametrów**, potocznie nazywanych również wagami.

Można je traktować jako liczby określające sposób, w jaki model przetwarza wejście.

Podczas treningu:

```text
dane treningowe
      ↓
model generuje przewidywanie
      ↓
obliczany jest błąd
      ↓
parametry są aktualizowane
      ↓
kolejna iteracja
```

Proces powtarza się bardzo wiele razy.

Kluczowym elementem jest **funkcja straty** (`loss function`) — miara mówiąca, jak bardzo wynik modelu różni się od wyniku oczekiwanego przez procedurę treningową.

Optymalizator wykorzystuje tę informację do aktualizacji parametrów.

W dużym uproszczeniu:

```text
predykcja
   ↓
loss
   ↓
gradient
   ↓
aktualizacja wag
```

Jeżeli wagi się zmieniają, mamy do czynienia z uczeniem modelu.

## Pretraining — podstawowe uczenie modelu

Pierwszym dużym etapem jest zwykle **pretraining**.

Model przetwarza bardzo duże ilości danych i uczy się przewidywać kolejne tokeny.

Przykładowo:

```text
Ala ma ...
```

model może próbować przewidzieć:

```text
kota
psa
dom
...
```

Na początku jego przewidywania są słabe.

Po ogromnej liczbie przykładów parametry zaczynają kodować wzorce związane m.in. z:

- składnią,
- stylem języka,
- relacjami między pojęciami,
- strukturą tekstu,
- typowymi zależnościami występującymi w danych.

Rezultatem jest **base model**.

Nie oznacza to jeszcze, że model będzie dobrze zachowywał się jak asystent konwersacyjny.

## Instruction tuning

Kolejnym etapem może być **instruction tuning**.

Model dostaje przykłady w rodzaju:

```text
instrukcja
↓
oczekiwana odpowiedź
```

Np.:

```text
Użytkownik:
Podsumuj ten tekst w trzech punktach.

Odpowiedź:
1. ...
2. ...
3. ...
```

Celem nie jest już tylko przewidywanie tekstu podobnego do danych treningowych.

Model uczy się lepiej reagować na instrukcje.

To nadal jest trening — parametry modelu są aktualizowane.

## Preference tuning i RLHF

Sama zdolność wykonywania instrukcji nie wystarcza.

Dwie odpowiedzi mogą być technicznie poprawne, ale jedna może być:

- bardziej pomocna,
- bezpieczniejsza,
- bardziej precyzyjna,
- lepiej dopasowana do oczekiwań użytkownika.

Dlatego modele mogą być dodatkowo dostrajane na podstawie **preferencji**.

Schemat może wyglądać tak:

```text
prompt
 ↓
odpowiedź A
odpowiedź B
 ↓
ocena / preferencja
 ↓
dostrajanie modelu
```

Jedną z metod jest **RLHF — Reinforcement Learning from Human Feedback**.

Ważne rozróżnienie:

> **RLHF jest jedną z metod preference tuning, a nie synonimem całego procesu dostrajania modeli.**

Istnieją również inne podejścia do uczenia na preferencjach.

## Fine-tuning

**Fine-tuning** oznacza dalsze trenowanie już istniejącego modelu na dodatkowym zbiorze danych.

Zamiast trenować model od zera:

```text
losowe parametry
↓
ogromny trening
↓
model
```

zaczynamy od modelu, który już coś potrafi:

```text
gotowy model
↓
dodatkowe przykłady
↓
fine-tuning
↓
dostosowany model
```

Fine-tuning może służyć np. do:

- utrwalenia określonego formatu odpowiedzi,
- poprawy zachowania w konkretnej klasie zadań,
- dostosowania stylu,
- nauczenia modelu specyficznych wzorców.

To **nie jest to samo co podanie dokumentów w promptcie**.

Fine-tuning zmienia parametry modelu.

## Continued pretraining

Istnieje też pojęcie **continued pretraining**.

Tutaj model kontynuuje trening podobny do pretrainingu, ale na dodatkowym zbiorze danych, często związanym z konkretną domeną.

Przykładowo:

```text
model ogólny
↓
duży korpus tekstów technicznych
↓
continued pretraining
↓
model lepiej dopasowany do tej domeny
```

Nie jest to to samo co klasyczny instruction fine-tuning.

Cel i rodzaj danych są inne.

## Co NIE jest trenowaniem modelu?

To najważniejsza część całego rozróżnienia.

### Prompt

Prompt zmienia wejście do modelu.

```text
model
+
nowa instrukcja
↓
inna odpowiedź
```

Nie oznacza to automatycznie zmiany jego parametrów.

### System prompt

System prompt może mocno wpływać na zachowanie modelu, ale nadal jest częścią kontekstu dostarczanego podczas inference.

Nie jest sam w sobie treningiem.

### Context window

Dodanie większej ilości informacji do kontekstu pozwala modelowi z nich skorzystać podczas aktualnego przebiegu.

```text
model
+
więcej kontekstu
↓
odpowiedź
```

Wagi modelu pozostają takie same.

### RAG

RAG:

```text
pytanie
↓
wyszukiwanie
↓
wybrane dokumenty
↓
kontekst dla LLM
↓
odpowiedź
```

Model dostaje dodatkowe informacje w momencie wykonywania zapytania.

**RAG nie wymaga zmiany parametrów modelu.**

Dlatego zdanie:

> „wytrenowałem model na swoich dokumentach przez RAG”

jest technicznie mylące.

Precyzyjniej:

> „zbudowałem system, który dostarcza modelowi moje dokumenty przez RAG”.

## Embeddings i wyszukiwanie wektorowe

Tworzenie embeddingów dokumentów także nie oznacza trenowania głównego LLM.

Embeddingi mogą służyć do znalezienia informacji:

```text
pytanie
↓
embedding
↓
wyszukiwanie podobnych fragmentów
↓
LLM
```

To element systemu retrieval, nie zmiana parametrów modelu generującego odpowiedź.

## Pamięć rozmowy

System może zapamiętać np.:

```text
użytkownik preferuje krótkie odpowiedzi
```

i dodać tę informację do przyszłego kontekstu.

To może wyglądać, jakby model „się nauczył”.

Technicznie jednak:

```text
ten sam model
+
zapamiętana informacja
↓
inna odpowiedź
```

Nie musi to oznaczać żadnej zmiany wag.

## Quantization

Quantization również nie jest treningiem w typowym znaczeniu.

Polega na reprezentowaniu parametrów modelu z mniejszą precyzją, np. po to, aby:

- zmniejszyć wymagania pamięci,
- uruchomić model na słabszym sprzęcie,
- przyspieszyć inference w niektórych konfiguracjach.

```text
model FP16
↓
quantization
↓
model 8-bit / 4-bit
```

Parametry są reprezentowane inaczej, ale model nie uczy się nowych przykładów.

## Pobranie modelu lokalnego

Pobranie modelu przez narzędzie takie jak Ollama również nie oznacza treningu.

```text
download
↓
model lokalny
↓
inference
```

Dopiero jeśli uruchomimy rzeczywisty proces fine-tuningu lub innego dostrajania, zaczynamy zmieniać model.

## Inference — kiedy model już jest wytrenowany

**Inference** to etap używania gotowego modelu.

```text
prompt
↓
tokenizacja
↓
obliczenia na istniejących wagach
↓
kolejne tokeny
↓
odpowiedź
```

To właśnie dzieje się podczas zwykłej rozmowy z LLM.

Model wykonuje obliczenia na podstawie parametrów, które już posiada.

## Czy rozmowa z modelem go trenuje?

Nie w bezpośrednim sensie.

Jeżeli podczas jednej rozmowy napiszesz:

> „Od teraz odpowiadaj krótko.”

kolejne odpowiedzi mogą być krótsze.

Ale mechanizm wygląda raczej tak:

```text
instrukcja
↓
pozostaje w kontekście
↓
wpływa na kolejne odpowiedzi
```

a nie:

```text
instrukcja
↓
natychmiastowa aktualizacja wag modelu
```

To ważna różnica.

Dane z rozmów mogą — zależnie od usługi i ustawień — zostać później wykorzystane przez dostawcę do osobnego procesu ulepszania przyszłych modeli.

To jednak inny proces niż bieżąca rozmowa.

Nie oznacza, że model zmienia swoje parametry po każdym wysłanym przez użytkownika zdaniu.

## Jeden model, wiele sposobów użycia

Ten sam model może działać w bardzo różnych systemach.

```text
model
+ prosty prompt
```

albo:

```text
model
+ system prompt
+ historia
+ pamięć
+ RAG
+ tools
```

Drugi system może wydawać się znacznie „mądrzejszy”.

Nie oznacza to jednak, że sam model został dodatkowo wytrenowany.

Zmieniło się otoczenie, w którym wykonuje inference.

## Gdzie przebiega granica?

Przydatny model mentalny wygląda tak:

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

Elementy **nad linią** mogą zmieniać parametry modelu.

Elementy **pod linią** przede wszystkim zmieniają informacje i możliwości dostępne podczas konkretnego użycia modelu.

W realnych systemach istnieją bardziej złożone warianty, ale jako model mentalny to rozróżnienie jest bardzo użyteczne.

## Dlaczego to rozróżnienie ma znaczenie?

Bo prowadzi do zupełnie innych decyzji architektonicznych.

Jeżeli problem brzmi:

> model nie zna aktualnej dokumentacji

fine-tuning może nie być najlepszym rozwiązaniem.

Często lepsze będzie:

```text
RAG
```

Jeżeli natomiast chcemy:

> nauczyć model konsekwentnie wykonywać specyficzny typ zadania

fine-tuning może być właściwym kierunkiem.

Jeżeli chcemy:

> tylko zmienić sposób odpowiedzi

czasem wystarczy dobry prompt lub system prompt.

Dlatego przed stwierdzeniem:

> „musimy wytrenować model”

warto najpierw zapytać:

> **co dokładnie chcemy zmienić — wiedzę dostępną przy zapytaniu, zachowanie systemu czy parametry samego modelu?**

To trzy różne problemy.
