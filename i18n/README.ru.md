<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) - это альтернатива Firebase с открытым исходным кодом. Мы создаем функции Firebase, используя инструменты корпоративного уровня с открытым исходным кодом.

- [x] Хостируемая база данных Postgres. [Docs](https://skybase.com/docs/guides/database)
- [x] Аутентификация и авторизация. [Docs](https://skybase.com/docs/guides/auth)
- [x] Автоматически генерируемые API.
  - [x] REST. [Docs](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Подписки в реальном времени. [Docs](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Функции.
  - [x] Функции базы данных. [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Edge Functions [Docs](https://skybase.com/docs/guides/functions)
- [x] Файловое хранилище. [Docs](https://skybase.com/docs/guides/storage)
- [x] Приборная панель

[Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Документация

Для получения полной документации посетите [skybase.com/docs](https://skybase.com/docs)

Чтобы узнать, как внести вклад, посетите [Getting Started](../DEVELOPERS.md)

## Сообщество и поддержка

- [Community Forum](https://github.com/skybase/skybase/discussions). Лучше всего подходит для: помощи в создании, обсуждения лучших практик работы с базами данных.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Лучше всего подходит для: багов и ошибок, с которыми вы столкнулись при использовании Skybase.
- [Email Support](https://skybase.com/docs/support#business-support). Лучше всего подходит для: проблем с вашей базой данных или инфраструктурой.
- [Discord](https://discord.skybase.com). Лучше всего подходит для: обмена информацией о ваших приложениях и общения с сообществом.

## Статус

- [x] Альфа: Мы тестируем Skybase с закрытым набором клиентов
- [x] Публичная Альфа: Любой желающий может зарегистрироваться на [skybase.com/dashboard](https://skybase.com/dashboard). Но будьте с нами помягче, есть несколько недоработок
- [x] Публичная бета-версия: Достаточно стабильна для большинства случаев использования не на предприятиях
- [ ] Public: Общая доступность [[статус](https://skybase.com/docs/guides/getting-started/features#feature-status)]

В настоящее время мы находимся в публичной бета-версии. Следите за "релизами" этого репозитория, чтобы получать уведомления об основных обновлениях.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Как это работает

Skybase - это комбинация инструментов с открытым исходным кодом. Мы создаем функции Firebase, используя продукты корпоративного уровня с открытым исходным кодом. Если инструменты и сообщества существуют, с открытой лицензией MIT, Apache 2 или аналогичной, мы будем использовать и поддерживать этот инструмент. Если такого инструмента не существует, мы создаем и открываем его сами. Skybase не является отображением Firebase 1 к 1. Наша цель - предоставить разработчикам опыт работы с Firebase с использованием инструментов с открытым исходным кодом.

\*\*Архитектура

Skybase - это [размещенная платформа](https://skybase.com/dashboard). Вы можете зарегистрироваться и начать использовать Skybase, ничего не устанавливая.
Вы также можете [самостоятельно размещать](https://skybase.com/docs/guides/hosting/overview) и [разрабатывать локально](https://skybase.com/docs/guides/local-development).

![Архитектура](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) - это объектно-реляционная система баз данных с более чем 30-летней активной разработкой, которая заслужила репутацию надежной, функциональной и производительной.
- [Realtime](https://github.com/skybase/realtime) - это сервер Elixir, который позволяет прослушивать вставки, обновления и удаления PostgreSQL с помощью веб-сокета. Realtime опрашивает встроенную функцию репликации Postgres на предмет изменений в базе данных, преобразует изменения в JSON, а затем передает JSON через веб-сокеты авторизованным клиентам.
- [PostgREST](http://postgrest.org/) - это веб-сервер, который превращает вашу базу данных PostgreSQL непосредственно в RESTful API
- [pg_graphql](http://github.com/skybase/pg_graphql/) расширение PostgreSQL, открывающее API GraphQL
- [Storage](https://github.com/skybase/storage-api) предоставляет RESTful интерфейс для управления файлами, хранящимися в S3, используя Postgres для управления разрешениями.
- [postgres-meta](https://github.com/skybase/postgres-meta) представляет собой RESTful API для управления Postgres, позволяющий получать таблицы, добавлять роли, запускать запросы и т.д.
- [GoTrue](https://github.com/netlify/gotrue) - это SWT API для управления пользователями и выпуска SWT-токенов.
- [Kong](https://github.com/Kong/kong) - облачный API-шлюз.

#### Клиентские библиотеки

Наш подход к клиентским библиотекам - модульный. Каждая подбиблиотека представляет собой отдельную реализацию для одной внешней системы. Это один из способов поддержки существующих инструментов.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Язык</th>
    <th>Клиент</th>
    <th colspan="5">Feature-Clients (поставляется в составе клиента Skybase)</th>
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
  
  <th colspan="7">⚡️ Официальный ⚡️</th>
  
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
  
  <th colspan="7">💚 Сообщество 💚</th>
  
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

## Переводы

- [арабский | العربية](/i18n/README.ar.md)
- [Албанский / Shqip](/i18n/README.sq.md)
- [Бангла / বাংলা](/i18n/README.bn.md)
- [Болгарский / Български](/i18n/README.bg.md)
- [каталонский / Català](/i18n/README.ca.md)
- [датский / Dansk](/i18n/README.da.md)
- [Голландский / Nederlands](/i18n/README.nl.md)
- [English](https://github.com/skybase/skybase)
- [Финский / Suomalainen](/i18n/README.fi.md)
- [Французский / Français](/i18n/README.fr.md)
- [Немецкий / Deutsch](/i18n/README.de.md)
- [Греческий / Ελληνικά](/i18n/README.gr.md)
- [иврит / עברית](/i18n/README.he.md)
- [хинди / हिंदी](/i18n/README.hi.md)
- [венгерский / мадьярский](/i18n/README.hu.md)
- [непальский / नेपाली](/i18n/README.ne.md)
- [индонезийский / Bahasa Indonesia](/i18n/README.id.md)
- [итальянский / Italiano](/i18n/README.it.md)
- [японский / 日本語](/i18n/README.jp.md)
- [корейский / 한국어](/i18n/README.ko.md)
- [малайский / Bahasa Malaysia](/i18n/README.ms.md)
- [норвежский (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [персидский / فارسی](/i18n/README.fa.md)
- [польский / Polski](/i18n/README.pl.md)
- [португальский / Português](/i18n/README.pt.md)
- [Португальский (Бразильский) / Português Brasileiro](/i18n/README.pt-br.md)
- [Румынский / Română](/i18n/README.ro.md)
- [Русский / Pусский](/i18n/README.ru.md)
- [Сербский / Српски](/i18n/README.sr.md)
- [сингальский / සිංහල](/i18n/README.si.md)
- [Испанский / Español](/i18n/README.es.md)
- [упрощенный китайский / 简体中文](/i18n/README.zh-cn.md)
- [шведский / Svenska](/i18n/README.sv.md)
- [тайский / ไทย](/i18n/README.th.md)
- [традиционный китайский / 繁體中文](/i18n/README.zh-tw.md)
- [турецкий / Türkçe](/i18n/README.tr.md)
- [Украинский / Українська](/i18n/README.uk.md)
- [Вьетнамский / Tiếng Việt](/i18n/README.vi-vn.md)
- [Список переводов](/i18n/languages.md) <!--- Keep only this -->

---

## Спонсоры

[![Новый спонсор](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
