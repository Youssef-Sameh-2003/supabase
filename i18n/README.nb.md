<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) er et alternativ til Firebase med åpen kildekode. Vi bygger funksjonene i Firebase ved hjelp av åpen kildekode-verktøy for bedrifter.

- [x] Hostet Postgres-database. [Dokumenter](https://skybase.com/docs/guides/database)
- [x] Autentisering og autorisasjon. [Dokumenter](https://skybase.com/docs/guides/auth)
- [x] Autogenererte API-er.
  - [x] REST. [Dokumenter](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumenter](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Sanntidsabonnementer. [Dokumenter](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Funksjoner.
  - [x] Databasefunksjoner. [Dokumenter](https://skybase.com/docs/guides/database/functions)
  - [x] Edge-funksjoner [Dokumenter](https://skybase.com/docs/guides/functions)
- [x] Lagring av filer. [Dokumenter](https://skybase.com/docs/guides/storage)
- [x] Dashbord

skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png) [x] [x] [x] [x][Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokumentasjon

For fullstendig dokumentasjon, besøk [skybase.com/docs](https://skybase.com/docs)

For å se hvordan du kan bidra, gå til [Getting Started](../DEVELOPERS.md)

## Fellesskap og støtte

- [Community Forum](https://github.com/skybase/skybase/discussions). Best for: hjelp med å bygge, diskusjon om beste praksis for databaser.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Best for: feil og feil du støter på ved bruk av Skybase.
- [E-poststøtte](https://skybase.com/docs/support#business-support). Best for: problemer med databasen eller infrastrukturen din.
- [Discord](https://discord.skybase.com). Best for: å dele applikasjonene dine og henge med fellesskapet.

## Status

- [x] Alpha: Vi tester Skybase med en lukket gruppe kunder
- [x] Offentlig Alpha: Alle kan registrere seg på [skybase.com/dashboard](https://skybase.com/dashboard). Men vær snill med oss, det er noen små problemer
- [x] Offentlig beta: Stabilt nok for de fleste brukstilfeller som ikke er for bedrifter
- [ ] Offentlig: Generell tilgjengelighet [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

Vi er for tiden i offentlig betaversjon. Følg med på "utgivelser" av denne repoen for å bli varslet om større oppdateringer.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Slik fungerer det

Skybase er en kombinasjon av verktøy med åpen kildekode. Vi bygger funksjonene i Firebase ved hjelp av åpen kildekode-produkter på bedriftsnivå. Hvis verktøyene og fellesskapene finnes, med en MIT, Apache 2 eller tilsvarende åpen lisens, vil vi bruke og støtte det verktøyet. Hvis verktøyet ikke finnes, bygger vi det selv med åpen kildekode. Skybase er ikke en 1-til-1-kartlegging av Firebase. Målet vårt er å gi utviklere en Firebase-lignende utvikleropplevelse ved hjelp av verktøy med åpen kildekode.

\*\*Arkitektur

Skybase er en [vertsplattform](https://skybase.com/dashboard). Du kan registrere deg og begynne å bruke Skybase uten å installere noe.
Du kan også [selv være vert](https://skybase.com/docs/guides/hosting/overview) og [utvikle lokalt](https://skybase.com/docs/guides/local-development).

![arkitektur](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) er et objektrelasjonsdatabasesystem med over 30 års aktiv utvikling som har gitt det et sterkt rykte for pålitelighet, robusthet og ytelse.
- [Realtime](https://github.com/skybase/realtime) er en Elixir-server som lar deg lytte til PostgreSQL-innlegg, oppdateringer og slettinger ved hjelp av websockets. Realtime polls Postgres' innebygde replikeringsfunksjonalitet for databaseendringer, konverterer endringer til JSON og sender deretter JSON over websockets til autoriserte klienter.
- [PostgREST](http://postgrest.org/) er en webserver som gjør PostgreSQL-databasen din direkte om til et RESTful API
- [pg_graphql](http://github.com/skybase/pg_graphql/) en PostgreSQL-utvidelse som eksponerer et GraphQL API
- [Storage](https://github.com/skybase/storage-api) gir et RESTful-grensesnitt for å administrere filer som er lagret i S3, ved hjelp av Postgres for å administrere tillatelser.
- [postgres-meta](https://github.com/skybase/postgres-meta) er et RESTful API for å administrere Postgres, slik at du kan hente tabeller, legge til roller og kjøre spørringer osv.
- [GoTrue](https://github.com/netlify/gotrue) er et SWT-basert API for administrasjon av brukere og utstedelse av SWT-tokens.
- [Kong](https://github.com/Kong/kong) er en skybasert API-gateway.

#### Klientbiblioteker

Vår tilnærming til klientbiblioteker er modulbasert. Hvert underbibliotek er en frittstående implementering for ett enkelt eksternt system. Dette er en av måtene vi støtter eksisterende verktøy på.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Språk</th>
    <th>Klient</th>
    <th colspan="5">Funksjonsklienter (inkludert i Skybase-klienten)</th>
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
  
  <th colspan="7">⚡️ Offisiell ⚡️</th>
  
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
  
  <th colspan="7">💚 Fellesskap 💚</th>
  
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

## Oversettelser

- [Arabisk | العربية](/i18n/README.ar.md)
- [Albansk / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgarsk / Български](/i18n/README.bg.md)
- [Katalansk / Català](/i18n/README.ca.md)
- [Dansk / Dansk](/i18n/README.da.md) [Norsk / Nederlands](/i18n/README.da.md)
- [nederlandsk / Nederlands](/i18n/README.nl.md)
- [engelsk](https://github.com/skybase/skybase)
- [Finsk / Suomalainen](/i18n/README.fi.md) [Finsk / Suomalainen](/i18n/README.fi.md)
- [Fransk / Français](/i18n/README.fr.md)
- [tysk / Deutsch](/i18n/README.de.md)
- [Gresk / Ελληνικά](/i18n/README.gr.md)
- [Hebraisk / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Ungarsk / Magyar](/i18n/README.hu.md)
- [nepali / नेपाली](/i18n/README.ne.md)
- [Indonesisk / Bahasa Indonesia](/i18n/README.id.md)
- [Italiensk / Italiano](/i18n/README.it.md)
- [Japansk / 日本語](/i18n/README.jp.md)
- [koreansk / 한국어](/i18n/README.ko.md)
- [Malaysisk / Bahasa Malaysia](/i18n/README.ms.md)
- [Norwegian (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Persisk / فارسی](/i18n/README.fa.md)
- [Polsk / Polski](/i18n/README.pl.md)
- [Portugisisk / Português](/i18n/README.pt.md)
- [Portugisisk (brasiliansk) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumensk / Română](/i18n/README.ro.md)
- [Russisk / Pусский](/i18n/README.ru.md)
- [Serbisk / Srpski](/i18n/README.sr.md)
- [Singalesisk / සිංහල](/i18n/README.si.md)
- [Spansk / Español](/i18n/README.es.md)
- [Simplified Chinese / 简体中文](/i18n/README.zh-cn.md) [Forenklet kinesisk / 简体中文](/i18n/README.zh-cn.md)
- [Svensk / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Tradisjonell kinesisk / 繁體中文](/i18n/README.zh-tw.md)
- [Tyrkisk / Türkçe](/i18n/README.tr.md)
- [Ukrainsk / Українська](/i18n/README.uk.md)
- [Vietnamesisk / Tiếng Việt](/i18n/README.vi-vn.md)
- [Liste over oversettelser](/i18n/languages.md) [Vietnamesisk / Tiếng Việt](/i18n/README.vi-vn.md) <!--- Keep only this -->

---

## Sponsorer

[![Ny sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
