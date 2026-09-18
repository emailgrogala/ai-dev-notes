---
title: "Jak działa LLM? Od „Ala ma kota” do przewidywania kolejnego tokenu"
description: "Proste, ale technicznie poprawne wyjaśnienie, jak model językowy uczy się prawdopodobieństw kolejnych tokenów i dlaczego temperatura zmienia odpowiedzi."
date: 2026-09-16
lang: pl
translationKey: how-llm-predicts-next-token
tags: [llm, tokens, probability, temperature]
insights:
  - "LLM generuje odpowiedź krok po kroku, przewidując kolejne tokeny."
  - "Przy sampling najbardziej prawdopodobny token nie musi zostać wybrany w każdym kroku."
  - "Temperatura zmienia rozkład wyboru tokenów, a nie wiedzę modelu."
draft: false
---
Najprostszy sposób zrozumienia LLM to zacząć od pytania: **co powinno pojawić się dalej?** Model językowy nie wyszukuje gotowej odpowiedzi w tabeli. Buduje rozkład prawdopodobieństwa kolejnych tokenów i na jego podstawie generuje tekst.

## Najprostszy możliwy przykład

```text
Ala ma kota
Ala ma kota
Ala ma psa
```

W zabawkowym modelu:

```text
P("kota" | "Ala ma") = 2/3 ≈ 66,7%
P("psa"  | "Ala ma") = 1/3 ≈ 33,3%
```

## Czy model zawsze wybierze „kota”?

Jeśli generowanie korzysta z **sampling**, nie. `kota` może być top tokenem, ale pojedyncze losowanie może zakończyć się wyborem `psa`.

Przy strategii **greedy decoding** model wybrałby token o najwyższym prawdopodobieństwie.

## Gdzie pojawia się temperatura

Niższa temperatura wyostrza rozkład, a wyższa go spłaszcza. Oznacza to większą lub mniejszą szansę wyboru tokenów spoza ścisłego topu.

Temperatura ma znaczenie wtedy, gdy z rozkładu wybieramy token metodą losowania. Nie oznacza, że model „wie więcej” ani że przy wyższej temperaturze zaczyna „myśleć bardziej kreatywnie” — zmienia się sposób próbkowania z rozkładu.

```text
pᵢ' = pᵢ^(1/T) / Σ pⱼ^(1/T)
```

<next-token-sandbox lang="pl"></next-token-sandbox>

## Prawdziwy LLM nie przechowuje takiej tabeli

Prawdziwy model uczy się ogromnej liczby parametrów zapisanych w macierzach.

```text
tekst
  ↓
tokeny
  ↓
wektory
  ↓
operacje macierzowe
  ↓
logity
  ↓
softmax
  ↓
prawdopodobieństwa
```

## Tokeny zamiast słów

Token może odpowiadać słowu, części słowa, znakowi interpunkcyjnemu lub fragmentowi kodu.

## Trening

Model przewiduje następny token, porównuje wynik z prawidłowym tokenem i koryguje parametry poprzez backpropagation.

## Kontekst i attention

Attention pomaga ustalić, które fragmenty wcześniejszego kontekstu są istotne dla aktualnej predykcji.

## Logity i softmax

Na końcu model produkuje logity, które softmax zamienia na rozkład prawdopodobieństwa.

## Generowanie jako pętla

Po wyborze token trafia z powrotem do kontekstu:

```text
kontekst
   ↓
przewidź token
   ↓
wybierz token
   ↓
dopisz go
   ↓
powtórz
```

To właśnie z tej prostej pętli powstaje dłuższa odpowiedź.
