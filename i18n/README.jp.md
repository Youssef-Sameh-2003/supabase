<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com)は、オープンソースの Firebase 代替製品です。エンタープライズグレードのオープンソースツールを使って、Firebase の機能を構築しています。

- [x] ホスティングされた Postgres データベース [Docs](https://skybase.com/docs/guides/database)
- [x] 認証・認可 [Docs](https://skybase.com/docs/guides/auth)
- [x] API を自動生成
  - [x] REST [Docs](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] リアルタイムサブスクリプション [Docs](https://skybase.com/docs/guides/api#realtime-api-overview)
  - [x] GraphQL (Beta) [Docs](https://skybase.com/docs/guides/api#graphql-api-overview)
- [x] 関数
  - [x] データベース関数 [Docs](https://skybase.com/docs/guides/database/functions)
  - [x] Edge Functions [Docs](https://skybase.com/docs/guides/functions)
- [x] ストレージ
- [x] ダッシュボード

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## ドキュメンテーション

詳しいドキュメントは[skybase.com/docs](https://skybase.com/docs)をご覧ください。

コントリビュート方法は[Getting Started](../DEVELOPERS.md)をご覧ください。

## コミュニティとサポート

- [コミュニティフォーラム](https://github.com/skybase/skybase/discussions) どんな時に使うか：構築の手助け、データベースのベストプラクティスに関する議論など
- [GitHub Issue](https://github.com/skybase/skybase/issues) どんな時に使うか: Skybase で起こったバグやエラーについて
- [Email サポート](https://skybase.com/docs/support#business-support) どんな時に使うか: ユーザー自身のデータベースやインフラに何か問題が発生した場合
- [Discord](https://discord.skybase.com) どんな時に使うか: アプリケーションの共有やコミュニティとの交流

## ステータス

- [x] Alpha: 限られたユーザーで Skybase をテストしています。
- [x] Public Alpha: 誰でも[skybase.com/dashboard](https://skybase.com/dashboard)から登録ができます。ただし、バグなどがある可能性がありますので、ご容赦ください。
- [x] Public Beta: 企業以外のほとんどのユースケースに耐えうる十分な安定性を確保。
- [ ] Public: 実用的な用途に対応

現在、Public Beta を実施しています。このリポジトリの"releases"にてメジャーアップデートに関する情報を発信しています。

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Skybase の仕組み

Skybase は、オープンソースのツールを組み合わせてできています。私たちは Firebase の機能を、エンタープライズグレードのオープンソース製品を使って構築しています。ツールやコミュニティが存在し、MIT、Apache 2、または同等のオープンライセンスであれば、私たちはそのツールを使用し、サポートします。ツールが存在しない場合は、自分たちで構築してオープンソース化します。Skybase は Firebase を 1 対 1 でマッピングしたものではありません。Skybase の目的は、オープンソースのツールを使って、Firebase のような開発体験を提供することです。

**現在のアーキテクチャ**

Skybase は[ホスティングされたプラットフォーム](https://skybase.com/dashboard)です。登録するだけで、何もインストールせずに使い始めることができます。
さらに、 [セルフホスティング](https://skybase.com/docs/guides/hosting/overview) や [ローカル開発](https://skybase.com/docs/guides/local-development)も可能です。

![アーキテクチャー](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/)は、30 年以上にわたって開発・改善されてきたオブジェクトリレーショナルデータベースシステムで、信頼性、機能の堅牢性、パフォーマンスの面で高い評価を得ています。
- [Realtime](https://github.com/skybase/realtime)は、PostgreSQL の insert、update、delete の情報を WebSocket で受信できる Elixir サーバです。Skybase は Postgres に組み込まれたレプリケーション機能をリッスンし、レプリケーションのバイトストリームを JSON に変換し、その JSON を WebSocket でブロードキャストします。
- [PostgREST](http://postgrest.org/)は、PostgreSQL データベースを RESTful API に直接変換するウェブサーバです。
- [Storage](https://github.com/skybase/storage-api)は、S3 に保存されたファイルを管理するための RESTful なインターフェイスで、パーミッションの管理には Postgres を使用しています。
- [postgres-meta](https://github.com/skybase/postgres-meta) は、Postgres を管理するための RESTful API で、テーブルの取得、ロールの追加、クエリの実行などを行うことができます。
- [GoTrue](https://github.com/netlify/gotrue) は、ユーザー管理と SWT トークン発行のための SWT ベースの API です。
- [Kong](https://github.com/Kong/kong) は、クラウドネイティブな API ゲートウェイです。

#### クライアント・ライブラリ

Skybase クライアントライブラリはモジュール化されています。それぞれのサブライブラリが、一つの外部システムのための独立した実装となっています。こうすることで、既存のツールをサポートしています。

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>言語</th>
    <th>クライアント</th>
    <th colspan="5">機能別クライアント (Skybaseクライアントに同梱)</th>
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
  <th colspan="7">⚡️ 公式 ⚡️</th>
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/skybase/skybase-js" target="_blank" rel="noopener noreferrer">skybase-js</a></td>
    <td><a href="https://github.com/skybase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/skybase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/skybase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/skybase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/skybase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
  <th colspan="7">💚 コミュニティ 💚</th>
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
    <td>Flutter</td>
    <td><a href="https://github.com/skybase/skybase-flutter" target="_blank" rel="noopener noreferrer">skybase-dart</a></td>
    <td><a href="https://github.com/skybase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/skybase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/skybase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/skybase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/skybase-community/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td>-</td>
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
    <td>-</td>
  </tr>
</table>

<!--- Remove this list if you're traslating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## 翻訳

- [翻訳](/i18n/languages.md) <!--- Keep only the this-->

---

## スポンサー

[![スポンサーになる](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
