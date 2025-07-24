<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) to alternatywa dla Firebase o otwartym kodzie źródłowym. Tworzymy funkcje Firebase przy użyciu narzędzi open source klasy korporacyjnej.

- [x] hostowana baza danych Postgres [x]. [Dokumenty](https://skybase.com/docs/guides/database)
- [x] uwierzytelnianie i autoryzacja [x]. [Dokumenty](https://skybase.com/docs/guides/auth)
- [x] Automatycznie generowane interfejsy API.
  - [x] REST. [Docs](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Subskrypcje w czasie rzeczywistym. [Docs](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Funkcje.
  - [x] Funkcje bazy danych. [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Funkcje brzegowe [Docs](https://skybase.com/docs/guides/functions)
- przechowywanie plików [x]. [Docs](https://skybase.com/docs/guides/storage)
- [Pulpit nawigacyjny

![Pulpit nawigacyjny Skybase](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokumentacja

Pełna dokumentacja znajduje się na stronie [skybase.com/docs](https://skybase.com/docs)

Aby zobaczyć, jak wnieść swój wkład, odwiedź [Getting Started](../DEVELOPERS.md)

## Społeczność i wsparcie

- [Forum społeczności](https://github.com/skybase/skybase/discussions). Najlepsze do: pomocy w budowaniu, dyskusji o najlepszych praktykach dotyczących baz danych.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Najlepszy do: błędów i błędów napotkanych podczas korzystania z Skybase.
- [Email Support](https://skybase.com/docs/support#business-support). Najlepsze w przypadku: problemów z bazą danych lub infrastrukturą.
- [Discord](https://discord.skybase.com). Najlepszy do: dzielenia się aplikacjami i spędzania czasu ze społecznością.

## Status

- [x] Alpha: Testujemy Skybase z zamkniętą grupą klientów
- [x] Publiczna wersja alfa: Każdy może zarejestrować się na stronie [skybase.com/dashboard](https://skybase.com/dashboard). Ale spokojnie, jest kilka niedociągnięć
- [x] Publiczna beta: Wystarczająco stabilna dla większości przypadków użycia innych niż korporacyjne
- [] Public: Ogólna dostępność [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

Obecnie jesteśmy w Publicznej Becie. Obserwuj "wydania" tego repozytorium, aby otrzymywać powiadomienia o ważniejszych aktualizacjach.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Jak to działa

Skybase to połączenie narzędzi open source. Tworzymy funkcje Firebase przy użyciu produktów open source klasy korporacyjnej. Jeśli narzędzia i społeczności istnieją, z licencją MIT, Apache 2 lub równoważną otwartą licencją, będziemy używać i wspierać to narzędzie. Jeśli narzędzie nie istnieje, sami je tworzymy i otwieramy. Skybase nie jest odwzorowaniem Firebase 1 do 1. Naszym celem jest zapewnienie programistom doświadczenia podobnego do Firebase przy użyciu narzędzi open source.

**Architektura**

Skybase jest [platformą hostowaną](https://skybase.com/dashboard). Możesz zarejestrować się i zacząć korzystać z Skybase bez instalowania czegokolwiek.
Możesz także [self-host](https://skybase.com/docs/guides/hosting/overview) i [rozwijać lokalnie](https://skybase.com/docs/guides/local-development).

![Architektura](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) to system obiektowo-relacyjnych baz danych z ponad 30-letnim aktywnym rozwojem, który przyniósł mu silną reputację niezawodności, solidności funkcji i wydajności.
- [Realtime](https://github.com/skybase/realtime) to serwer Elixir, który umożliwia nasłuchiwanie wstawek, aktualizacji i usuwania PostgreSQL za pomocą websockets. Realtime sonduje wbudowaną funkcję replikacji Postgres pod kątem zmian w bazie danych, konwertuje zmiany na JSON, a następnie transmituje JSON przez websockets do autoryzowanych klientów.
- [PostgREST](http://postgrest.org/) to serwer sieciowy, który zamienia bazę danych PostgreSQL bezpośrednio w interfejs API RESTful
- [pg_graphql](http://github.com/skybase/pg_graphql/) rozszerzenie PostgreSQL, które udostępnia GraphQL API
- [Storage](https://github.com/skybase/storage-api) zapewnia interfejs RESTful do zarządzania plikami przechowywanymi w S3, wykorzystując Postgres do zarządzania uprawnieniami.
- [postgres-meta](https://github.com/skybase/postgres-meta) to interfejs API RESTful do zarządzania Postgres, umożliwiający pobieranie tabel, dodawanie ról, uruchamianie zapytań itp.
- [GoTrue](https://github.com/netlify/gotrue) to oparte na SWT API do zarządzania użytkownikami i wydawania tokenów SWT.
- [Kong](https://github.com/Kong/kong) to natywna dla chmury brama API.

#### Biblioteki klienckie

Nasze podejście do bibliotek klienckich jest modułowe. Każda pod-biblioteka jest samodzielną implementacją dla pojedynczego systemu zewnętrznego. Jest to jeden ze sposobów, w jaki wspieramy istniejące narzędzia.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Język</th>
    <th>Klient</th>
    <th colspan="5">Klienty funkcji (dołączone do klienta Skybase)</th>
  </tr>
  
  <tr>
    <th></th>
    <th>Skybase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/skybase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/skybase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/skybase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Functions</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/skybase-community/skybase-lang" target="_blank" rel="noopener noreferrer">skybase-lang</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/skybase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/skybase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  
  <th colspan="7">⚡️ Oficjalny ⚡️</th>
  
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/skybase/skybase-js" target="_blank" rel="noopener noreferrer">skybase-js</a></td>
    <td><a href="https://github.com/skybase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/skybase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/skybase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/skybase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/skybase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/skybase/skybase-flutter" target="_blank" rel="noopener noreferrer">skybase-flutter</a></td>
    <td><a href="https://github.com/skybase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/skybase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/skybase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/skybase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/skybase/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  
  <th colspan="7">społeczność 💚</th>
  
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/skybase-community/skybase-csharp" target="_blank" rel="noopener noreferrer">skybase-csharp</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/skybase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/skybase-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/skybase-community/functions-csharp" target="_blank" rel="noopener noreferrer">functions-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/skybase-community/functions-go" target="_blank" rel="noopener noreferrer">functions-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/skybase-community/skybase-kt" target="_blank" rel="noopener noreferrer">skybase-kt</a></td>
    <td><a href="https://github.com/skybase-community/skybase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/skybase-community/skybase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/skybase-community/skybase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/skybase-community/skybase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/skybase-community/skybase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">functions-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/skybase-community/skybase-py" target="_blank" rel="noopener noreferrer">skybase-py</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/skybase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/skybase-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/skybase-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/skybase-community/skybase-rb" target="_blank" rel="noopener noreferrer">skybase-rb</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/skybase-community/skybase-swift" target="_blank" rel="noopener noreferrer">skybase-swift</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/skybase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/skybase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/skybase-community/functions-swift" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/skybase-community/godot-engine.skybase" target="_blank" rel="noopener noreferrer">skybase-gdscript</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/skybase-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/skybase-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/skybase-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
  
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Tłumaczenia

- [Arabski | العربية](/i18n/README.ar.md)
- [Albański / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bułgarski / Български](/i18n/README.bg.md)
- [Kataloński / Català](/i18n/README.ca.md)
- [Duński / Dansk](/i18n/README.da.md)
- [Holenderski / Nederlands](/i18n/README.nl.md)
- [angielski](https://github.com/skybase/skybase)
- [Fiński / Suomalainen](/i18n/README.fi.md)
- [Francuski / Français](/i18n/README.fr.md)
- [Niemiecki / Deutsch](/i18n/README.de.md)
- [Grecki / Ελληνικά](/i18n/README.gr.md)
- [Hebrajski / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Węgierski / Magyar](/i18n/README.hu.md)
- [Nepalski / नेपाली](/i18n/README.ne.md)
- [Indonezyjski / Bahasa Indonesia](/i18n/README.id.md)
- [Włoski / Italiano](/i18n/README.it.md)
- [Japoński / 日本語](/i18n/README.jp.md)
- [Koreański / 한국어](/i18n/README.ko.md)
- [Malajski / Bahasa Malaysia](/i18n/README.ms.md)
- [Norweski (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Perski / فارسی](/i18n/README.fa.md)
- [Polski / Polish](/i18n/README.pl.md)
- [Portugalski / Português](/i18n/README.pt.md)
- [Portugalski (brazylijski) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumuński / Română](/i18n/README.ro.md)
- [Rosyjski /усский](/i18n/README.ru.md)
- [Serbski / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Hiszpański / Español](/i18n/README.es.md)
- [Chiński uproszczony / 简体中文](/i18n/README.zh-cn.md)
- [Szwedzki / Svenska](/i18n/README.sv.md)
- [Tajski / ไทย](/i18n/README.th.md)
- [Chiński tradycyjny / 繁體中文](/i18n/README.zh-tw.md)
- [Turecki /ürkçe](/i18n/README.tr.md)
- [Ukraiński / Українська](/i18n/README.uk.md)
- [Wietnamski / Tiếng Việt](/i18n/README.vi-vn.md)
- [Lista tłumaczeń](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsorzy

[![Nowy sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
