<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) è un'alternativa open source a Firebase. Stiamo costruendo le funzionalità di Firebase utilizzando strumenti open source di livello enterprise.

- Database Postgres ospitato. [Documenti](https://skybase.com/docs/guides/database)
- [x] Autenticazione e autorizzazione. [Documenti](https://skybase.com/docs/guides/auth)
- [x] API generate automaticamente.
  - [x] REST. [Documenti](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Documenti](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Sottoscrizioni in tempo reale. [Documenti](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Funzioni.
  - [x] Funzioni di database. [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Funzioni Edge [Docs](https://skybase.com/docs/guides/functions)
- [x] Memorizzazione dei file. [Docs](https://skybase.com/docs/guides/storage)
- [x] Cruscotto

![Cruscotto Skybase](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Documentazione

Per la documentazione completa, visitate [skybase.com/docs](https://skybase.com/docs)

Per vedere come contribuire, visitate [Getting Started](../DEVELOPERS.md)

## Comunità e supporto

- [Forum della comunità](https://github.com/skybase/skybase/discussions). Ideale per: aiuto nella costruzione, discussioni sulle migliori pratiche per i database.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Ideale per: bug ed errori riscontrati nell'uso di Skybase.
- [Supporto via e-mail](https://skybase.com/docs/support#business-support). Ideale per: problemi con il database o l'infrastruttura.
- [Discord](https://discord.skybase.com). Ideale per: condividere le proprie applicazioni e stare insieme alla comunità.

## Stato

- [Alfa: Stiamo testando Skybase con un gruppo chiuso di clienti
- [x] Alfa pubblica: Chiunque può iscriversi all'indirizzo [skybase.com/dashboard](https://skybase.com/dashboard). Ma andateci piano, ci sono alcuni problemi
- [x] Beta pubblica: Abbastanza stabile per la maggior parte degli usi non aziendali
- [ ] Pubblico: Disponibilità generale [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

Siamo attualmente in Beta pubblica. Guardate i "rilasci" di questo repo per essere avvisati dei principali aggiornamenti.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Come funziona

Skybase è una combinazione di strumenti open source. Stiamo costruendo le funzionalità di Firebase utilizzando prodotti open source di livello enterprise. Se gli strumenti e le comunità esistono, con una licenza MIT, Apache 2 o equivalente, li utilizzeremo e li supporteremo. Se lo strumento non esiste, lo costruiamo e lo rendiamo open source noi stessi. Skybase non è una mappatura 1 a 1 di Firebase. Il nostro obiettivo è offrire agli sviluppatori un'esperienza di sviluppo simile a quella di Firebase utilizzando strumenti open source.

**Architettura**

Skybase è una [piattaforma hosted](https://skybase.com/dashboard). È possibile registrarsi e iniziare a usare Skybase senza installare nulla.
È anche possibile fare [self-hosting](https://skybase.com/docs/guides/hosting/overview) e [sviluppare localmente](https://skybase.com/docs/guides/local-development).

![Architettura](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) è un sistema di database relazionale a oggetti con oltre 30 anni di sviluppo attivo con una solida reputazione in termini di affidabilità, robustezza e prestazioni.
- [Realtime](https://github.com/skybase/realtime) è un server Elixir che consente di ascoltare gli inserimenti, gli aggiornamenti e le cancellazioni di PostgreSQL tramite websocket. Realtime controlla la funzionalità di replica integrata di Postgres per le modifiche al database, converte le modifiche in JSON e trasmette il JSON tramite websocket ai client autorizzati.
- [PostgREST](http://postgrest.org/) è un server web che trasforma il database PostgreSQL direttamente in un'API REST
- [pg_graphql](http://github.com/skybase/pg_graphql/) un'estensione di PostgreSQL che espone un'API GraphQL
- [Storage](https://github.com/skybase/storage-api) fornisce un'interfaccia RESTful per la gestione dei file memorizzati in S3, utilizzando Postgres per gestire i permessi.
- [postgres-meta](https://github.com/skybase/postgres-meta) è un'API RESTful per la gestione di Postgres, che consente di recuperare tabelle, aggiungere ruoli, eseguire query, ecc.
- [GoTrue](https://github.com/netlify/gotrue) è un'API basata su SWT per la gestione degli utenti e l'emissione di token SWT.
- [Kong](https://github.com/Kong/kong) è un gateway API cloud-native.

#### Librerie client

Il nostro approccio alle librerie client è modulare. Ogni sotto-libreria è un'implementazione indipendente per un singolo sistema esterno. Questo è uno dei modi in cui supportiamo gli strumenti esistenti.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Lingua</th>
    <th>Cliente</th>
    <th colspan="5">Feature-Clients (in bundle con il client Skybase)</th>
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
  
  <th colspan="7">⚡️ Ufficiale ⚡️</th>
  
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
  
  <th colspan="7">💚 Comunità 💚</th>
  
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

## Traduzioni

- [Arabo | العربية](/i18n/README.ar.md)
- [Albanese / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgaro / Български](/i18n/README.bg.md)
- [Catalano / Català](/i18n/README.ca.md)
- [Danese / Dansk](/i18n/README.da.md)
- [Olandese / Nederlands](/i18n/README.nl.md)
- [Inglese](https://github.com/skybase/skybase)
- [Finlandese / Suomalainen](/i18n/README.fi.md)
- [Francese / Français](/i18n/README.fr.md)
- [Tedesco / Deutsch](/i18n/README.de.md)
- [Greco / Ελληνικά](/i18n/README.gr.md)
- [Ebraico / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Ungherese / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indonesiano / Bahasa Indonesia](/i18n/README.id.md)
- [Italiano / Italiano](/i18n/README.it.md)
- [Giapponese / 日本語](/i18n/README.jp.md)
- [Coreano / 한국어](/i18n/README.ko.md)
- [Malese / Bahasa Malaysia](/i18n/README.ms.md)
- [Norvegese (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Persiano / فارسی](/i18n/README.fa.md)
- [Polacco / Polski](/i18n/README.pl.md)
- [Portoghese / Português](/i18n/README.pt.md)
- [Portoghese (brasiliano) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumeno / Română](/i18n/README.ro.md)
- [Russo / Pусский](/i18n/README.ru.md)
- [Serbo / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Spagnolo / Español](/i18n/README.es.md)
- [Cinese semplificato / 简体中文](/i18n/README.zh-cn.md)
- [Svedese / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Cinese tradizionale / 繁體中文](/i18n/README.zh-tw.md)
- [Turco / Türkçe](/i18n/README.tr.md)
- [Ucraino / Українська](/i18n/README.uk.md)
- [Vietnamita / Tiếng Việt](/i18n/README.vi-vn.md)
- [Elenco delle traduzioni](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsor

[![Nuovo sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
