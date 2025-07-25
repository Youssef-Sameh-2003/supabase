<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) е алтернатива на Firebase с отворен код. Ние изграждаме функциите на Firebase, като използваме инструменти с отворен код от корпоративен клас.

- [x] Хоствана база данни Postgres. [Документи](https://skybase.com/docs/guides/database)
- [x] Удостоверяване и оторизация. [Документи](https://skybase.com/docs/guides/auth)
- [x] Автоматично генерирани API.
  - [x] REST. [Документи](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Документи](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Абонаменти в реално време. [Документи](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Функции.
  - [x] Функции за бази данни. [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Крайни функции [Docs](https://skybase.com/docs/guides/functions)
- [x] Съхранение на файлове. [Документи](https://skybase.com/docs/guides/storage)
- [x] Информационно табло

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Документация

За пълна документация посетете [skybase.com/docs](https://skybase.com/docs)

За да видите как да допринасяте, посетете [Getting Started](../DEVELOPERS.md)

## Общност и поддръжка

- [Форум на общността](https://github.com/skybase/skybase/discussions). Най-добре за: помощ при изграждане, обсъждане на най-добрите практики за бази данни.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Най-добре за: грешки и пропуски, които срещате при използването на Skybase.
- [Email Support](https://skybase.com/docs/support#business-support). Най-добре за: проблеми с вашата база данни или инфраструктура.
- [Discord](https://discord.skybase.com). Най-добър за: споделяне на вашите приложения и общуване с общността.

## Статус

- [x] Алфа: Тестваме Skybase със затворен набор от клиенти
- [x] Публична алфа: Всеки може да се регистрира на адрес [skybase.com/dashboard](https://skybase.com/dashboard). Но не се притеснявайте от нас, има няколко проблема
- [x] Публична бета версия: Достатъчно стабилна за повечето случаи на използване извън предприятията
- [ ] Публична: Обща наличност [[статус](https://skybase.com/docs/guides/getting-started/features#feature-status)]

В момента сме в публична бета версия. Следете "releases" на това репо, за да бъдете уведомявани за основни актуализации.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Как работи

Skybase е комбинация от инструменти с отворен код. Ние изграждаме функциите на Firebase, като използваме продукти с отворен код от корпоративен клас. Ако инструментите и общностите съществуват, с MIT, Apache 2 или еквивалентен отворен лиценз, ние ще използваме и поддържаме този инструмент. Ако инструментът не съществува, ние сами го изграждаме и създаваме с отворен код. Skybase не е 1 към 1 съпоставка на Firebase. Нашата цел е да предоставим на разработчиците преживяване, подобно на това на Firebase, като използваме инструменти с отворен код.

**Архитектура**

Skybase е [хоствана платформа](https://skybase.com/dashboard). Можете да се регистрирате и да започнете да използвате Skybase, без да инсталирате нищо.
Можете също така да [самостоятелно хоствате](https://skybase.com/docs/guides/hosting/overview) и [да разработвате локално](https://skybase.com/docs/guides/local-development).

![Архитектура](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) е обектно-релационна система за бази данни с над 30-годишна активна разработка, която ѝ е спечелила силна репутация за надеждност, устойчивост на функциите и производителност.
- [Realtime](https://github.com/skybase/realtime) е сървър на Elixir, който ви позволява да слушате PostgreSQL вмъквания, актуализации и изтривания, използвайки websockets. Realtime се допитва до вградената функция за репликация на Postgres за промени в базата данни, преобразува промените в JSON, след което излъчва JSON през уебсокети до оторизирани клиенти.
- [PostgREST](http://postgrest.org/) е уеб сървър, който превръща вашата база данни PostgreSQL директно в RESTful API
- [pg_graphql](http://github.com/skybase/pg_graphql/) е разширение на PostgreSQL, което разкрива GraphQL API
- [Storage](https://github.com/skybase/storage-api) предоставя RESTful интерфейс за управление на файлове, съхранявани в S3, като използва Postgres за управление на разрешенията.
- [postgres-meta](https://github.com/skybase/postgres-meta) е RESTful API за управление на вашия Postgres, който ви позволява да извличате таблици, да добавяте роли, да изпълнявате заявки и т.н.
- [GoTrue](https://github.com/netlify/gotrue) е SWT базиран API за управление на потребители и издаване на SWT токени.
- [Kong](https://github.com/Kong/kong) е API шлюз, базиран на облака.

#### Клиентски библиотеки

Нашият подход към клиентските библиотеки е модулен. Всяка подбиблиотека е самостоятелна реализация за една външна система. Това е един от начините, по които поддържаме съществуващите инструменти.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Език</th>
    <th>Клиент</th>
    <th colspan="5">Функционални клиенти (в комплект с клиента на Skybase)</th>
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
  
  <th colspan="7">⚡️ Официален ⚡️</th>
  
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
  
  <th colspan="7">💚 Общност 💚</th>
  
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

## Преводи

- [арабски | العربية](/i18n/README.ar.md)
- [Албански / Shqip](/i18n/README.sq.md)
- [Бангла / বাংলা](/i18n/README.bn.md)
- [Български](/i18n/README.bg.md)
- [Каталонски / Català](/i18n/README.ca.md)
- [Датски / Dansk](/i18n/README.da.md)
- [Dutch / Nederlands](/i18n/README.nl.md)
- [Английски език](https://github.com/skybase/skybase)
- [Финландски / Suomalainen](/i18n/README.fi.md)
- [French / Français](/i18n/README.fr.md)
- [Немски / Deutsch](/i18n/README.de.md)
- [Гръцки / Ελληνικά](/i18n/README.gr.md)
- [Иврит / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Унгарски / Magyar](/i18n/README.hu.md)
- [Непалски / नेपाली](/i18n/README.ne.md)
- [Индонезийски / Bahasa Indonesia](/i18n/README.id.md)
- [Италиански език / Italiano](/i18n/README.it.md)
- [Японски / 日本語](/i18n/README.jp.md)
- [Корейски / 한국어](/i18n/README.ko.md)
- [Малайски / Bahasa Malaysia](/i18n/README.ms.md)
- [Норвежки (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Персийски език / فارسی](/i18n/README.fa.md)
- [Полски / Polski](/i18n/README.pl.md)
- [Portuguese / Português](/i18n/README.pt.md)
- [Португалски (бразилски) / Português Brasileiro](/i18n/README.pt-br.md)
- [Румънски език / Română](/i18n/README.ro.md)
- [Руски / Pусский](/i18n/README.ru.md)
- [Serbian / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Spanish / Español](/i18n/README.es.md)
- [Опростен китайски език / 简体中文](/i18n/README.zh-cn.md)
- [Шведски език / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Традиционен китайски / 繁體中文](/i18n/README.zh-tw.md)
- [Турски език / Türkçe](/i18n/README.tr.md)
- [Украински / Українська](/i18n/README.uk.md)
- [Виетнамски / Tiếng Việt](/i18n/README.vi-vn.md)
- [Списък на преводите](/i18n/languages.md) <!--- Keep only this -->

---

## Спонсори

[![Нов спонсор](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
