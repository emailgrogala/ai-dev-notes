---
title: "Jak recenzowaliśmy AI Dev Notes: code review, UX review i content review"
description: "Praktyczny opis procesu review projektu rozwijanego z pomocą AI — od technicznego code review, przez UX review, po przegląd 13 artykułów i pomiar zużycia Codex."
date: 2026-09-18
lang: pl
translationKey: reviewing-ai-assisted-project
tags:
  - ai
  - agents
  - code-review
  - ux
  - workflow
insights:
  - "Review i implementacja poprawek to dwa różne etapy: najpierw zbieramy findings, potem człowiek decyduje, które z nich wdrożyć."
  - "Najdroższe narzędzie nie musi być używane do każdego rodzaju pracy — Codex był przydatny przy repozytorium i przeglądarce, a content review lepiej pasował do zwykłego ChatGPT."
  - "Najwięcej wartości dawał nie pojedynczy agent, ale proces: niezależny review, jawne decyzje ACCEPT/LATER/REJECT i osobna walidacja zmian."
draft: false
---

Projekt **AI Dev Notes** powstawał przy dużym udziale AI. Kod, architektura, treści i kolejne usprawnienia były rozwijane iteracyjnie.

Po pewnym czasie pojawiło się jednak ważniejsze pytanie niż:

> „Czy AI potrafi zbudować taki projekt?”

Bardziej interesujące było:

> **jak sprawdzić jakość projektu, jeśli duża część pracy również powstała z pomocą AI?**

Zamiast robić jeden ogólny review, podzieliliśmy proces na trzy niezależne perspektywy:

```text
CODE REVIEW
    ↓
UX REVIEW
    ↓
CONTENT REVIEW
```

Każdy etap miał inny cel, inne narzędzia i inny koszt.

## Zasada: review najpierw, poprawki później

Najważniejsza reguła całego procesu była prosta:

```text
review
  ↓
findings
  ↓
ACCEPT / LATER / REJECT
  ↓
implementacja
```

Reviewer nie miał od razu poprawiać wszystkiego, co zauważył.

Najpierw miał:
- znaleźć problemy,
- sklasyfikować ich wagę,
- uzasadnić je,
- pokazać dowody.

Dopiero potem człowiek decydował, które findings rzeczywiście powinny wejść do projektu.

Używaliśmy prostego podziału:

```text
BLOCKER
MAJOR
MINOR
SUGGESTION
```

oraz osobno:

```text
ACCEPT NOW
LATER
REJECT
```

To rozdzielenie okazało się ważne. AI może znaleźć problem techniczny, ale nie oznacza to automatycznie, że powinien zostać rozwiązany właśnie teraz.

## Etap 1: Code Review

Pierwszy review został wykonany w Codex na aktualnym repozytorium.

Zakres obejmował m.in.:
- Astro i TypeScript,
- dostępność,
- responsive layout,
- SEO,
- wydajność,
- CSS,
- konfigurację builda,
- zachowanie strony w przeglądarce.

Codex uruchomił build, sprawdził projekt na mobile i desktopie oraz przeanalizował rzeczywiste pliki.

Najważniejsze findings dotyczyły m.in.:
- optymalizacji dużego obrazu komiksu,
- lokalizacji dat,
- dostępności,
- braku `astro check`,
- porządków w CSS,
- GitHub Pages i `base`,
- canonical/hreflang,
- ładowania kodu sandboxu na stronach, które go nie używały.

Nie wszystkie zostały wdrożone od razu.

Przykładowo:
- optymalizacja obrazów, accessibility i type-checking → **ACCEPT NOW**,
- GitHub Pages/base i canonical/hreflang → **LATER**,
- szersza optymalizacja ładowania sandboxu → **LATER**.

Dzięki temu code review nie zamienił się w niekontrolowany redesign.

## Implementacja findings z Code Review

Po decyzjach reviewer otrzymał osobny prompt wdrożeniowy.

Zakres był celowo ograniczony tylko do zaakceptowanych punktów.

W efekcie:
- obraz komiksu trafił do pipeline'u Astro i dostał responsywne warianty AVIF/WebP/PNG,
- poprawiono lokalizację dat PL/EN,
- zwiększono dostępność kontrolek,
- dodano `@astrojs/check`,
- poprawiono kolizje globalnego CSS,
- usunięto nieużywany komponent `AiMark`.

Walidacja zakończyła się:

```text
astro check → 0 errors / 0 warnings / 0 hints
build       → 31 stron
audit       → 0 vulnerabilities
```

To był pierwszy moment, w którym dobrze było widać różnicę między:

```text
review ≠ implementation
```

Review określił problemy. Implementacja miała wykonać tylko zatwierdzone poprawki.

## Etap 2: UX Review

UX review wykonaliśmy w **nowej sesji Codex**.

To było celowe.

Nowa sesja nie miała kontynuować wcześniejszego myślenia code-reviewera, tylko spojrzeć na projekt z innej perspektywy:

- home,
- nawigacja,
- czytanie artykułów,
- mobile,
- learning aids,
- sandbox,
- spójność PL/EN,
- discoverability.

Tym razem Codex pracował głównie jak tester używający prawdziwej przeglądarki.

Znalazł m.in.:
- poziomy overflow przez długie URL-e,
- nieczytelny komiks na mobile,
- brak dalszej nawigacji po zakończeniu artykułu,
- zbyt mocny section focus,
- małe touch targets,
- niespójne `Worth remembering` vs `Key takeaways`.

Ponownie najpierw powstała lista findings, a dopiero potem decyzje.

Zaakceptowaliśmy wszystkie powyższe punkty poza zmianą hero, którą zostawiliśmy na później.

## Dlaczego implementacja UX została w tej samej sesji

Tutaj podjęliśmy odwrotną decyzję niż przy samym review.

Do implementacji UX użyliśmy **tej samej sesji**, która przed chwilą wykonała review.

Powód był praktyczny:
- znała wszystkie findings,
- miała świeży kontekst z testów mobile/desktop,
- nie trzeba było ponownie analizować tych samych miejsc,
- prompt wdrożeniowy mógł odnosić się bezpośrednio do zaakceptowanych punktów.

To dało prosty wzorzec:

```text
nowa sesja
→ niezależny review
→ decyzje człowieka
→ ta sama sesja
→ implementacja zaakceptowanych zmian
```

Po wdrożeniu:
- overflow zniknął także przy 320 px,
- komiks dostał `Powiększ / Enlarge`,
- artykuły dostały `Czytaj dalej / Read next`,
- section focus został uproszczony,
- touch targets zwiększono,
- nazwa `Key takeaways` została ujednolicona.

## Ile kosztował ten proces w Codex

Podczas pracy zapisywaliśmy wykorzystanie z panelu Usage.

Wartości tygodniowe są przybliżone — zakładamy, że w danym czasie nie było innego użycia usług współdzielących ten sam limit.

Według interfejsu usage limit był współdzielony między m.in.:
- Codex,
- Work,
- workspace agents,
- ChatGPT for Excel.

Zwykłe rozmowy ChatGPT nie wchodziły do tego licznika.

| Etap | Czas | Przybliżone zużycie weekly |
| --- | ---: | ---: |
| Code review | 8 min 22 s | ~8 p.p. |
| Implementacja code review | ~11 min 13 s | ~12 p.p. |
| UX review | 4 min 20 s | ~7 p.p. |
| Implementacja UX | 5 min 48 s | ~8 p.p. |
| **Razem** | **~29 min 43 s** | **~35 p.p.** |

Limit 5-godzinny również obserwowaliśmy, ale nie nadaje się do prostego sumowania, ponieważ w trakcie procesu następowały jego resety.

Sam czas wykonania też nie mówi wszystkiego.

Przykładowo UX implementation trwało krócej niż code review, ale zużyło podobną część tygodniowego limitu.

To pokazuje, że koszt pracy agenta zależy bardziej od:
- liczby plików,
- użycia przeglądarki,
- liczby iteracji,
- buildów i testów,
- zakresu kontekstu

niż od samej liczby minut widocznej w interfejsie.

## Etap 3: Content Review

Po code review i UX review zostało jeszcze 13 artykułów.

Początkowo naturalnym pomysłem było użycie Codex również tutaj.

Po analizie uznaliśmy jednak, że nie ma to większego sensu.

Content review wymagał głównie:
- sprawdzenia poprawności merytorycznej,
- oceny klarowności,
- wykrywania zbyt mocnych uogólnień,
- porównania PL/EN,
- oceny `insights`,
- pilnowania terminologii.

Nie wymagał:
- terminala,
- builda,
- repozytorium,
- przeglądarki,
- modyfikowania aplikacji.

Dlatego content review wykonaliśmy w zwykłym ChatGPT, w trzech partiach.

```text
13 artykułów
   ↓
4 + 4 + 5
   ↓
review merytoryczny
   ↓
ACCEPT NOW
   ↓
punktowe poprawki PL/EN
```

To pozwoliło zachować Codex na zadania, w których jego narzędzia dawały realną przewagę.

## Czego dotyczyły poprawki treści

Content review nie doprowadził do przepisywania artykułów od zera.

Większość zmian była punktowa.

Przykłady:
- rozdzielenie AI od LLM,
- aktualizacja opisu Memory i Temporary Chat,
- sampling vs greedy decoding,
- dokładniejsza definicja embeddings,
- RAG ≠ fine-tuning,
- MCP jako protokół komunikacyjny,
- local/cloud ≠ open/proprietary,
- structured outputs zamiast polegania wyłącznie na `return JSON`,
- ostrożniejsze opisy scheming i alignment,
- ograniczenie zbyt uniwersalnych wniosków z case studies.

Najczęstszy problem nie brzmiał:

> „to jest błędne”

ale raczej:

> **„to jest prawdziwe w tym przykładzie, ale zdanie brzmi jak reguła uniwersalna.”**

To okazało się jednym z najważniejszych rezultatów content review.

## Co dało rozdzielenie review na trzy rodzaje

Każdy reviewer patrzył na projekt pod innym kątem.

Code review pytał:

> **czy projekt jest technicznie poprawny?**

UX review:

> **czy użytkownik może wygodnie z niego korzystać?**

Content review:

> **czy to, co publikujemy, jest precyzyjne i zrozumiałe?**

Żaden z tych etapów nie zastępuje pozostałych.

Można mieć:
- poprawny kod i słabe UX,
- dobre UX i błędną treść,
- świetną treść i problemy techniczne.

Dopiero połączenie tych perspektyw daje bardziej kompletny obraz jakości.

## AI reviewuje AI — ale człowiek steruje procesem

W tym projekcie AI:
- tworzyło kod,
- reviewowało kod,
- testowało UX,
- analizowało treści,
- proponowało poprawki.

To nie oznacza jednak, że człowiek zniknął z procesu.

Wręcz przeciwnie.

Kluczowe decyzje dotyczyły:
- zakresu review,
- wyboru narzędzia,
- wyboru nowej lub tej samej sesji,
- ACCEPT / LATER / REJECT,
- tego, kiedy przerwać dalsze poprawki,
- tego, co ostatecznie trafia do projektu.

Można ten proces uprościć:

```text
AI znajduje
    ↓
AI uzasadnia
    ↓
człowiek wybiera
    ↓
AI wdraża
    ↓
narzędzia weryfikują
    ↓
człowiek akceptuje
```

## Najważniejszy wniosek

Najciekawsze nie było to, że agent potrafił znaleźć błędy.

Najważniejsze było zbudowanie procesu, w którym jego wynik nie był automatycznie uznawany za decyzję.

Review działało najlepiej wtedy, gdy:

1. miało jasno ograniczony zakres,
2. reviewer nie poprawiał niczego przed decyzją,
3. findings były klasyfikowane,
4. człowiek wybierał ACCEPT / LATER / REJECT,
5. implementacja miała osobny prompt,
6. wynik przechodził testy i walidację.

To bardzo dobrze pasuje do szerszej zasady tego projektu:

> **Learn → Build → Share**

Najpierw zbudowaliśmy serwis.

Potem wykorzystaliśmy AI, żeby go krytycznie przejrzeć.

A teraz sam proces review staje się kolejną rzeczą, którą można opisać, zapamiętać i wykorzystać w następnym projekcie.
