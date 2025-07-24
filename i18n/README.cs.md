<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) je open source alternativa Firebase. Vytváříme funkce Firebase pomocí open source nástrojů podnikové třídy.

- [x] hostovaná databáze Postgres. [Dokumenty](https://skybase.com/docs/guides/database)
- [x] Ověřování a autorizace. [Dokumenty](https://skybase.com/docs/guides/auth)
- [x] Automaticky generované rozhraní API.
  - [x] REST. [Dokumenty](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumenty](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Odběry v reálném čase. [Dokumenty](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Funkce.
  - [x] Databázové funkce. [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Okrajové funkce [Docs](https://skybase.com/docs/guides/functions)
- [x] Ukládání souborů. [Dokumenty](https://skybase.com/docs/guides/storage)
- [x] Přístrojový panel

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokumentace

Úplnou dokumentaci naleznete na adrese [skybase.com/docs](https://skybase.com/docs)

Chcete-li zjistit, jak přispívat, navštivte stránku [Začínáme](../DEVELOPERS.md)

## Komunita a podpora

- [Fórum komunity](https://github.com/skybase/skybase/discussions). Nejlépe pro: pomoc při vytváření, diskuse o osvědčených postupech při práci s databází.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Nejlépe pro: chyby a omyly, na které narazíte při používání databáze Skybase.
- [E-mailová podpora](https://skybase.com/docs/support#business-support). Nejlepší pro: problémy s vaší databází nebo infrastrukturou.
- [Discord](https://discord.skybase.com). Nejlepší pro: sdílení vašich aplikací a setkávání s komunitou.

## Stav

- [x] Alfa: Testujeme Skybase s uzavřenou skupinou zákazníků
- [x] Veřejná alfa: [skybase.com/dashboard](https://skybase.com/dashboard). Ale buďte na nás mírní, je tu několik zádrhelů
- [x] Veřejná beta verze: Dostatečně stabilní pro většinu případů použití mimo podniky
- [ ] Veřejná: Všeobecná dostupnost [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

V současné době jsme ve fázi Public Beta. Sledujte "releases" tohoto repozitáře, abyste byli upozorněni na hlavní aktualizace.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Jak to funguje

Skybase je kombinací nástrojů s otevřeným zdrojovým kódem. Funkce Firebase vytváříme pomocí open source produktů podnikové třídy. Pokud existují nástroje a komunity s otevřenou licencí MIT, Apache 2 nebo ekvivalentní, budeme tento nástroj používat a podporovat. Pokud nástroj neexistuje, vytvoříme jej a použijeme open source sami. Skybase není mapováním Firebase v poměru 1:1. Naším cílem je poskytnout vývojářům vývojářské prostředí podobné Firebase s využitím nástrojů s otevřeným zdrojovým kódem.

**Architektura**

Skybase je [hostovaná platforma](https://skybase.com/dashboard). Můžete se zaregistrovat a začít používat Skybase, aniž byste museli cokoli instalovat.
Můžete také [hostovat sami](https://skybase.com/docs/guides/hosting/overview) a [vyvíjet lokálně](https://skybase.com/docs/guides/local-development).

![Architektura](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) je objektově-relační databázový systém s více než 30 lety aktivního vývoje, který si získal dobrou pověst díky spolehlivosti, robustnosti funkcí a výkonu.
- [Realtime](https://github.com/skybase/realtime) je server v jazyce Elixir, který umožňuje naslouchat vkládání, aktualizacím a mazání dat do PostgreSQL pomocí webových soketů. Realtime zjišťuje změny v databázi pomocí replikačních funkcí Postgresu, převádí změny do JSON a poté vysílá JSON přes webové sockety autorizovaným klientům.
- [PostgREST](http://postgrest.org/) je webový server, který mění databázi PostgreSQL přímo na rozhraní RESTful API
- [pg_graphql](http://github.com/skybase/pg_graphql/) je rozšíření PostgreSQL, které vystavuje rozhraní GraphQL API
- [Storage](https://github.com/skybase/storage-api) poskytuje rozhraní RESTful pro správu souborů uložených v S3, přičemž ke správě oprávnění využívá Postgres.
- [Postgres-meta](https://github.com/skybase/postgres-meta) je rozhraní RESTful API pro správu Postgresu, které umožňuje načítat tabulky, přidávat role, spouštět dotazy atd.
- [GoTrue](https://github.com/netlify/gotrue) je rozhraní API založené na SWT pro správu uživatelů a vydávání tokenů SWT.
- [Kong](https://github.com/Kong/kong) je cloudová brána API.

klientské knihovny ####

Náš přístup ke klientským knihovnám je modulární. Každá dílčí knihovna je samostatnou implementací pro jeden externí systém. Je to jeden ze způsobů, jakým podporujeme stávající nástroje.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Jazyk</th>
    <th>Klient</th>
    <th colspan="5">Feature-Clients (v rámci klienta Skybase)</th>
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
  
  <th colspan="7">⚡️ Oficiální ⚡️</th>
  
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
  
  <th colspan="7">💚 Komunita 💚</th>
  
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

## Překlady

- [Arabština | العربية](/i18n/README.ar.md)
- [Albánština / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulharština / Български](/i18n/README.bg.md)
- [Katalánština / Català](/i18n/README.ca.md)
- [Dánština / Dansk](/i18n/README.da.md)
- [Dutch / Nederlands](/i18n/README.nl.md)
- [Angličtina](https://github.com/skybase/skybase)
- [Finsky / Suomalainen](/i18n/README.fi.md)
- [Francouzština / Français](/i18n/README.fr.md)
- [Němčina / Deutsch](/i18n/README.de.md)
- [Řečtina / Ελληνικά](/i18n/README.gr.md)
- [Hebrejština / עברית](/i18n/README.he.md)
- [Hindština / हिंदी](/i18n/README.hi.md)
- [Maďarština / Magyar](/i18n/README.hu.md)
- [Nepálština / नेपाली](/i18n/README.ne.md)
- [Indonéština / Bahasa Indonesia](/i18n/README.id.md)
- [Italština / Italiano](/i18n/README.it.md)
- [Japonština / 日本語](/i18n/README.jp.md)
- [Korejština / 한국어](/i18n/README.ko.md)
- [Malajština / Bahasa Malaysia](/i18n/README.ms.md)
- [Norština (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Perština / فارسی](/i18n/README.fa.md)
- [Polština / Polski](/i18n/README.pl.md)
- [Portuguese / Português](/i18n/README.pt.md)
- [Portugalština (brazilská) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumunština / Română](/i18n/README.ro.md)
- [Russian / Pусский](/i18n/README.ru.md)
- [srbština / Srpski](/i18n/README.sr.md)
- [Sinhálština / සිංහල](/i18n/README.si.md)
- [Spanish / Español](/i18n/README.es.md)
- [Zjednodušená čínština / 简体中文](/i18n/README.zh-cn.md)
- [Švédština / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Tradiční čínština / 繁體中文](/i18n/README.zh-tw.md)
- [Turečtina / Türkçe](/i18n/README.tr.md)
- [Ukrajinština / Українська](/i18n/README.uk.md)
- [Vietnamština / Tiếng Việt](/i18n/README.vi-vn.md)
- [Seznam překladů](/i18n/languages.md) <!--- Keep only this -->

---

## Sponzoři

[![Nový sponzor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
