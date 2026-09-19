---
title: "Jak AI pomogło rozbudować statyczny serwis o Firebase"
description: "Praktyczny przykład wykorzystania AI przy rozbudowie aplikacji Astro: analiza architektury, integracja Firebase i Firestore, testy lokalne oraz wdrożenie na GitHub Pages."
date: 2026-09-19
lang: pl
translationKey: firebase-ai-assisted-integration
tags:
  - ai
  - firebase
  - firestore
  - astro
  - github-pages
insights:
  - "AI może wspierać nie tylko generowanie kodu, ale cały proces integracji: analizę architektury, implementację, konfigurację usługi, testy i wdrożenie."
  - "Firebase może dodać dane dynamiczne do statycznego serwisu Astro bez budowania własnego backendu i bez rezygnacji z GitHub Pages."
  - "Najbezpieczniej rozwijać integrację małymi krokami: najpierw licznik odsłon, potem feedback, z testem end-to-end po każdym etapie."
draft: false
---

AI Dev Notes początkowo był serwisem całkowicie statycznym. Artykuły są przechowywane w Markdown, aplikacja jest zbudowana w Astro, a publikacja odbywa się przez GitHub Pages.

To rozwiązanie jest proste, szybkie i praktycznie bezobsługowe. Ma jednak naturalne ograniczenie: statyczna strona nie ma miejsca, w którym mogłaby zapisywać dane zmieniające się w czasie.

Pierwszą taką potrzebą okazały się dwie niewielkie funkcje:

- licznik odsłon każdego artykułu,
- możliwość przekazania prostej informacji zwrotnej: **Pomocny**, **Zbyt rozwlekły**, **Zbyt skomplikowany** lub **Nie pomógł**.

Zamiast budować własny backend, zdecydowałem się wykorzystać **Firebase i Cloud Firestore**. Sam proces integracji był jednocześnie kolejnym eksperymentem z wykorzystaniem AI podczas rozwoju aplikacji.

## Od statycznej strony do aplikacji zapisującej dane

Przed zmianą architektura była bardzo prosta:

```text
Markdown
   ↓
Astro
   ↓
GitHub Pages
```

Nie było backendu, bazy danych ani logowania użytkowników.

Po integracji przepływ wygląda następująco:

```text
Markdown
   ↓
Astro
   ↓
GitHub Pages
   │
   └────→ Firebase / Cloud Firestore
             ├── liczba odsłon
             └── feedback
```

Firebase nie zastąpił GitHub Pages. Został dodany wyłącznie jako niewielka warstwa przechowująca dane dynamiczne.

To było istotne założenie projektu: **nie komplikować architektury bardziej, niż wymaga tego funkcja**.

## Najpierw mały zakres

Jedną z ważniejszych decyzji było podzielenie integracji na etapy.

Pierwsza wersja obejmowała wyłącznie licznik odsłon.

Dopiero po sprawdzeniu całej ścieżki:

```text
Astro
→ Firebase SDK
→ Firestore
→ zapis
→ odczyt
→ test lokalny
→ GitHub Pages
```

został dodany feedback.

Takie podejście ułatwiło diagnozowanie problemów. Gdy licznik działał poprawnie, wiadomo było już, że konfiguracja Firebase, zmienne środowiskowe, Firestore oraz deployment są poprawne.

Druga funkcja była więc rozszerzeniem działającego mechanizmu, a nie kolejną dużą integracją.

## Gdzie w tym procesie pojawiło się AI

AI zostało wykorzystane przede wszystkim do pracy nad istniejącym projektem.

Zamiast przekazywać polecenie w rodzaju:

> Dodaj Firebase.

zadanie zostało opisane wraz z ograniczeniami architektonicznymi.

Między innymi:

- nie zmieniać pojedynczych artykułów Markdown,
- nie dodawać własnego backendu,
- zachować GitHub Pages,
- wykorzystać istniejący sposób identyfikowania artykułów,
- umożliwić testowanie lokalne,
- nie dopuszczać do sytuacji, w której awaria Firebase blokuje wyświetlenie artykułu,
- ograniczyć wielokrotne naliczanie odsłon,
- przygotować reguły bezpieczeństwa Firestore.

To zmienia charakter pracy z AI.

Nie chodzi już tylko o wygenerowanie kodu, ale o przekazanie **celu, kontekstu i ograniczeń**, a następnie ocenę zaproponowanego rozwiązania.

## AI najpierw przeanalizowało istniejącą architekturę

Przed implementacją agent przejrzał strukturę projektu oraz sposób renderowania artykułów.

Okazało się, że zarówno polskie, jak i angielskie artykuły korzystają ze wspólnego `ArticleLayout.astro`.

Dzięki temu nie było potrzeby modyfikowania wielu plików `.md`.

Integracja mogła wyglądać tak:

```text
Markdown
   ↓
ArticleLayout
   ├── ArticleViews
   └── ArticleFeedback
```

Każdy obecny i przyszły artykuł automatycznie otrzymuje więc nowe funkcje.

To drobny przykład pokazujący różnicę między wygenerowaniem działającego kodu a zmianą dopasowaną do istniejącej architektury.

## Jeden artykuł, dwa języki, jeden identyfikator

AI Dev Notes posiada wersję polską i angielską.

Obie wersje tego samego artykułu mają wspólny `translationKey`.

Został on wykorzystany również jako identyfikator dokumentu w Firestore:

```text
articles/{translationKey}
```

Dzięki temu wersja polska i angielska tego samego artykułu korzystają z tych samych statystyk.

Licznik pokazuje popularność samego artykułu, a nie oddzielnie jego dwóch tłumaczeń.

Nie trzeba było dodawać nowego identyfikatora do frontmatter.

## Licznik odsłon

Pierwsza implementowana funkcja była bardzo prosta z punktu widzenia użytkownika:

```text
3 odsłony
```

Za tym prostym napisem znajduje się jednak kilka decyzji.

Licznik jest zwiększany atomowo w Firestore:

```text
views: 3
```

Dodatkowo `sessionStorage` zapamiętuje, że dany artykuł został już otwarty podczas bieżącej sesji.

Przykładowy klucz:

```text
ai-dev-notes:viewed:{slug}
```

Dzięki temu zwykłe odświeżenie strony nie zwiększa licznika po każdym `F5`.

Nie jest to mechanizm analityczny klasy Google Analytics ani zabezpieczenie przed celową manipulacją. Jest to prosty licznik odpowiadający potrzebom niewielkiego serwisu.

## Feedback zamiast klasycznej oceny

Drugim krokiem było dodanie prostego feedbacku.

Zamiast skali:

```text
1 2 3 4 5
```

czytelnik może wskazać:

```text
Pomocny
Zbyt rozwlekły
Zbyt skomplikowany
Nie pomógł
```

Taki wynik jest dla autora bardziej użyteczny.

Ocena `3/5` mówi niewiele.

Natomiast informacja:

> Zbyt skomplikowany

może bezpośrednio wpłynąć na kolejną wersję tekstu.

W Firestore dane wyglądają przykładowo tak:

```text
articles
  └── reviewing-ai-assisted-project
       ├── views: 3
       └── feedback
            └── helpful: 1
```

Pozostałe pola pojawiają się dopiero wtedy, gdy ktoś wybierze daną odpowiedź.

Docelowo dokument może wyglądać na przykład tak:

```text
views: 120

feedback:
  helpful: 31
  tooLong: 4
  tooComplex: 7
  notHelpful: 2
```

## `localStorage` jako proste ograniczenie głosowania

W przypadku feedbacku zastosowany został `localStorage`.

Po poprawnym zapisaniu głosu aplikacja zapamiętuje wybór użytkownika:

```text
ai-dev-notes:feedback:{translationKey}
```

Po ponownym wejściu na artykuł:

- poprzedni wybór pozostaje zaznaczony,
- użytkownik nie może normalnie oddać kolejnego głosu.

To nie jest pełne zabezpieczenie. Użytkownik może wyczyścić pamięć przeglądarki, a odpowiednio przygotowany klient może ominąć frontend.

Celem nie było jednak stworzenie systemu głosowania wymagającego uwierzytelnienia, lecz lekkiego mechanizmu informacji zwrotnej.

## Firestore Security Rules są ważniejsze niż ukrywanie konfiguracji

Jednym z ciekawszych elementów integracji była kwestia konfiguracji Firebase.

Aplikacja korzysta ze zmiennych:

```text
PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID
```

Nazwa `API_KEY` może sugerować sekret podobny do klucza używanego po stronie serwera.

W aplikacji Firebase Web konfiguracja klienta trafia jednak do przeglądarki. Sama jej obecność nie jest mechanizmem zabezpieczającym bazę.

Dlatego znacznie ważniejsze są **Firestore Security Rules**.

W projekcie reguły ograniczają między innymi możliwość:

- dowolnego ustawiania liczby odsłon,
- zmniejszania licznika,
- modyfikowania przypadkowych pól,
- usuwania dokumentów.

Licznik może wzrosnąć tylko o `1`, a głos może zwiększyć tylko jeden z dozwolonych liczników feedbacku.

AI pomogło również przygotować i uszczelnić te reguły.

## Testowanie przed wdrożeniem

Całą integrację można było sprawdzić lokalnie:

```bash
npm run dev
```

Lokalna aplikacja Astro komunikowała się z tym samym Firestore, które później wykorzystuje wersja działająca na GitHub Pages.

Test obejmował między innymi:

```text
wejście na artykuł
→ zwiększenie views

F5
→ views bez ponownego zwiększenia

inny artykuł
→ oddzielny licznik

głos „Pomocny”
→ helpful + 1

ponowne wejście
→ zapamiętany wybór
```

Dodatkowo sprawdzony został build:

```bash
npm run check
npm run build
```

oraz wygląd komponentów w wersji desktopowej i mobilnej.

## AI pomogło również podczas konfiguracji Firebase

Wsparcie nie skończyło się na kodzie.

AI prowadziło również przez konfigurację projektu Firebase:

```text
utworzenie projektu
→ rejestracja aplikacji Web
→ pozostawienie GitHub Pages jako hostingu
→ utworzenie Cloud Firestore
→ konfiguracja .env
→ publikacja Security Rules
→ GitHub Actions Variables
```

Było to szczególnie wygodne, ponieważ konfiguracja usługi zewnętrznej i implementacja kodu mogły być traktowane jako jeden ciągły proces.

Gdy podczas pracy pojawiała się kolejna decyzja, można było od razu skonfrontować ją z kodem projektu.

## AI nie zastąpiło testu działania

Istotnym elementem tego eksperymentu było to, że raport:

> build przechodzi

nie oznacza jeszcze:

> funkcja działa.

Dopiero rzeczywisty test w Firebase Console pokazał dane:

```text
feedback
  helpful: 1

views: 3
```

To potwierdziło cały przepływ end-to-end:

```text
kliknięcie użytkownika
→ kod aplikacji
→ Firebase SDK
→ Security Rules
→ Firestore
→ zapis danych
```

Podobnie po wdrożeniu funkcja została ponownie sprawdzona na GitHub Pages.

AI może przygotować implementację, przeanalizować kod i uruchomić znaczną część testów, ale ostateczna weryfikacja rzeczywistej integracji nadal ma znaczenie.

## Czego nauczył mnie ten etap

Najciekawszy w tej zmianie nie był sam Firebase.

Licznik odsłon i cztery przyciski to niewielkie funkcje.

Znacznie ciekawsze było wykorzystanie AI podczas całego procesu rozwoju istniejącej aplikacji:

```text
pomysł
↓
określenie zakresu
↓
analiza architektury
↓
implementacja
↓
review rozwiązania
↓
konfiguracja usługi zewnętrznej
↓
test lokalny
↓
wdrożenie
↓
test produkcyjny
```

W takim zastosowaniu AI zaczyna pełnić rolę znacznie szerszą niż generator kodu.

Jednocześnie nadal potrzebne są decyzje człowieka: jaki zakres funkcji ma sens, jak bardzo komplikować architekturę, które zabezpieczenia są wystarczające i kiedy rozwiązanie można uznać za gotowe.

W przypadku AI Dev Notes efektem była niewielka, ale kompletna ewolucja projektu:

```text
statyczny serwis
      ↓
statyczny serwis + dane dynamiczne
      ↓
informacja zwrotna od czytelników
```

Firebase został dodany bez zmiany hostingu, bez własnego backendu i bez przebudowy istniejących artykułów.

---

Ten artykuł opisuje rzeczywistą zmianę wykonaną w AI Dev Notes. Co ciekawe, mechanizm feedbacku opisany w tekście jest jednocześnie mechanizmem, przez który możesz ocenić również ten artykuł.
