---
title: "Jak wybrałem technologię do budowy tego serwisu"
description: "Dlaczego prosty serwis z artykułami powstał w Astro, mimo że równie dobrze można było sięgnąć po React, Angular albo Next.js."
date: 2026-09-16
lang: pl
translationKey: choosing-tech-stack
tags: [astro, frontend, architecture, web]
insights:
  - "Najpierw należy określić problem i ograniczenia, a dopiero potem wybierać framework."
  - "Prostota architektury jest zaletą, jeśli odpowiada rzeczywistym potrzebom projektu."
  - "Technologia nie powinna wynikać wyłącznie z przyzwyczajenia do znanego stosu."
draft: false
---
Najważniejsza decyzja przy starcie projektu nie brzmiała „który framework jest najlepszy?”, tylko **„czego ten serwis naprawdę potrzebuje?”**. Dopiero po zebraniu wymagań sens miało porównanie Astro, Reacta, Angulara i Next.js.

## Najpierw potrzeby, potem framework

Założenia były proste: artykuły w repozytorium, łatwa publikacja, mało JavaScriptu, darmowy hosting i punktowa interaktywność.

## Dlaczego nie zwykły React

React jest świetny do interaktywnych aplikacji, ale większość tej strony to statyczna treść. Nie było potrzeby budowania całego serwisu wokół Reacta ani hydratować dużej części interfejsu po stronie klienta.

## Dlaczego nie Angular

Angular oferuje rozbudowany, ustandaryzowany framework aplikacyjny. W tym małym, content-first projekcie większość jego możliwości nie byłaby potrzebna.

## Dlaczego nie Next.js

Next.js oferuje SSR, backend i rozbudowaną logikę aplikacyjną. Ten projekt nie potrzebował tych możliwości na starcie.

## Dlaczego Astro

Astro dobrze pasuje do serwisów treściowych i pozwala zachować artykuły jako zwykły Markdown.

```text
Markdown
   ↓
Git
   ↓
GitHub Actions
   ↓
GitHub Pages
```

## Islands architecture

JavaScript może działać tylko tam, gdzie jest potrzebny — np. w interaktywnym sandboxie — bez zamieniania całej strony w SPA.

Islands nie oznaczają braku JavaScriptu. Oznaczają możliwość wysyłania go tylko tam, gdzie dana interakcja rzeczywiście go potrzebuje.

## Markdown jako część architektury

Frontmatter pozwala przechowywać tytuł, język, tagi, `translationKey`, status szkicu i teraz także główne `insights`.

## Czy ten wybór jest uniwersalnie najlepszy?

Nie. Narzędzie powinno odpowiadać problemowi.

Przykładowe dopasowanie, nie reguła:

```text
rozbudowana aplikacja ze spójnym frameworkiem → Angular może pasować
dużo własnej interaktywności UI → React może pasować
React + routing/rendering full-stack → Next.js może pasować
content-first + punktowa interaktywność → Astro może pasować
```

Najważniejsza zasada pozostaje prosta:

> **najpierw problem i ograniczenia, potem technologia.**
