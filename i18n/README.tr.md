<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) açık kaynaklı bir Firebase alternatifidir. Kurumsal düzeyde açık kaynak araçları kullanarak Firebase'in özelliklerini geliştiriyoruz.

- [x] Barındırılan Postgres Veritabanı. [Dokümanlar](https://skybase.com/docs/guides/database)
- [x] Kimlik Doğrulama ve Yetkilendirme. [Dokümanlar](https://skybase.com/docs/guides/auth)
- [x] Otomatik oluşturulan API'ler.
  - [x] REST. [Dokümanlar](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Docs](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Gerçek zamanlı abonelikler. [Dokümanlar](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Fonksiyonlar.
  - [x] Veritabanı Fonksiyonları. [Dokümanlar](https://skybase.com/docs/guides/database/functions)
  - [x] Kenar İşlevleri [Dokümanlar](https://skybase.com/docs/guides/functions)
- [x] Dosya Depolama. [Docs](https://skybase.com/docs/guides/storage)
- [x] AI + Vektör / Gömme Araçları. [Dokümanlar](https://skybase.com/docs/guides/ai)
- [x] Gösterge Tablosu

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokümantasyon

Belgelerin tamamı için [skybase.com/docs](https://skybase.com/docs) adresini ziyaret edin

Nasıl Katkıda bulunacağınızı görmek için [Başlarken](../DEVELOPERS.md) adresini ziyaret edin

## Topluluk ve Destek

- [Topluluk Forumu](https://github.com/skybase/skybase/discussions). Şunlar için en iyisi: oluşturma konusunda yardım, veritabanı en iyi uygulamaları hakkında tartışma.
- [GitHub Sorunları](https://github.com/skybase/skybase/issues). Skybase'i kullanırken karşılaştığınız hatalar ve hatalar için en iyisi.
- [E-posta Desteği](https://skybase.com/docs/support#business-support). Veritabanınız veya altyapınızla ilgili sorunlar için en iyisi.
- [Discord](https://discord.skybase.com). Uygulamalarınızı paylaşmak ve toplulukla takılmak için en iyisi.

## Nasıl çalışır

Skybase açık kaynak araçlarının bir birleşimidir. Firebase'in özelliklerini kurumsal düzeyde, açık kaynaklı ürünler kullanarak oluşturuyoruz. Araçlar ve topluluklar MIT, Apache 2 veya eşdeğer bir açık lisansla mevcutsa, bu aracı kullanacak ve destekleyeceğiz. Araç mevcut değilse, kendimiz oluşturur ve açık kaynak kullanırız. Skybase, Firebase'in bire bir eşlemesi değildir. Amacımız, geliştiricilere açık kaynak araçları kullanarak Firebase benzeri bir geliştirici deneyimi sunmaktır.

**Mimari**

Skybase [barındırılan bir platformdur](https://skybase.com/dashboard). Skybase'e kaydolabilir ve hiçbir şey yüklemeden kullanmaya başlayabilirsiniz.
Ayrıca [self-host](https://skybase.com/docs/guides/hosting/overview) ve [yerel olarak geliştirebilirsiniz](https://skybase.com/docs/guides/local-development).

![Mimarlık](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/), 30 yılı aşkın süredir aktif olarak geliştirilmekte olan ve güvenilirlik, özellik sağlamlığı ve performans açısından güçlü bir üne sahip olan nesne ilişkisel bir veritabanı sistemidir.
- [Realtime](https://github.com/skybase/realtime), websockets kullanarak PostgreSQL ekleme, güncelleme ve silme işlemlerini dinlemenizi sağlayan bir Elixir sunucusudur. Realtime, veritabanı değişiklikleri için Postgres'in yerleşik çoğaltma işlevini yoklar, değişiklikleri JSON'a dönüştürür ve ardından JSON'u web soketleri üzerinden yetkili istemcilere yayınlar.
- [PostgREST](http://postgrest.org/), PostgreSQL veritabanınızı doğrudan RESTful API'ye dönüştüren bir web sunucusudur
- [pg_graphql](http://github.com/skybase/pg_graphql/) GraphQL API'si sunan bir PostgreSQL uzantısı
- [Storage](https://github.com/skybase/storage-api), izinleri yönetmek için Postgres kullanarak S3'te depolanan Dosyaları yönetmek için RESTful bir arayüz sağlar.
- [postgres-meta](https://github.com/skybase/postgres-meta) Postgres'inizi yönetmek için RESTful bir API'dir ve tabloları getirmenize, roller eklemenize ve sorgular çalıştırmanıza vb. olanak tanır.
- [GoTrue](https://github.com/netlify/gotrue) kullanıcıları yönetmek ve SWT belirteçleri vermek için SWT tabanlı bir API'dir.
- [Kong](https://github.com/Kong/kong) bulut tabanlı bir API ağ geçididir.

#### İstemci kütüphaneleri

İstemci kütüphaneleri için yaklaşımımız modülerdir. Her bir alt kütüphane, tek bir harici sistem için bağımsız bir uygulamadır. Bu, mevcut araçları destekleme yöntemlerimizden biridir.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Dil</th>
    <th>Müşteri</th>
    <th colspan="5">Özellik İstemcileri (Skybase istemcisinde paketlenmiştir)</th>
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
  
  <th colspan="7">⚡️ Resmi ⚡️</th>
  
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
  
  <th colspan="7">💚 Topluluk 💚</th>
  
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

## Rozetler

![Made with Skybase](../apps/www/public/badge-made-with-skybase.svg)

```md
[![Made with Skybase](https://skybase.com/badge-made-with-skybase.svg)](https://skybase.com)
```

```html
<a href="https://skybase.com">
  <img
    width="168"
    height="30"
    src="https://skybase.com/badge-made-with-skybase.svg"
    alt="Made with Skybase"
  />
</a>
```

![Made with Skybase (dark)](../apps/www/public/badge-made-with-skybase-dark.svg)

```md
[![Made with Skybase](https://skybase.com/badge-made-with-skybase-dark.svg)](https://skybase.com)
```

```html
<a href="https://skybase.com">
  <img
    width="168"
    height="30"
    src="https://skybase.com/badge-made-with-skybase-dark.svg"
    alt="Made with Skybase"
  />
</a>
```

## Çeviriler

- [Arapça | العربية](/i18n/README.ar.md)
- [Arnavutça / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgarca / Български](/i18n/README.bg.md)
- [Katalanca / Català](/i18n/README.ca.md)
- [Danca / Dansk](/i18n/README.da.md)
- [Hollandaca / Nederlands](/i18n/README.nl.md)
- [İngilizce](https://github.com/skybase/skybase)
- [Fince / Suomalainen](/i18n/README.fi.md)
- [Fransızca / Français](/i18n/README.fr.md)
- [Almanca / Deutsch](/i18n/README.de.md)
- [Yunanca / Ελληνικά](/i18n/README.gr.md)
- [İbranice / עברית](/i18n/README.he.md)
- [Hintçe / हिंदी](/i18n/README.hi.md)
- [Macarca / Magyar](/i18n/README.hu.md)
- [Nepalce / नेपाली](/i18n/README.ne.md)
- [Endonezce / Bahasa Endonezya](/i18n/README.id.md)
- [İtalyanca / Italiano](/i18n/README.it.md)
- [Japonca / 日本語](/i18n/README.jp.md)
- [Korece / 한국어](/i18n/README.ko.md)
- [Malayca / Bahasa Malezya](/i18n/README.ms.md)
- [Norveççe (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Farsça / فارسی](/i18n/README.fa.md)
- [Lehçe / Polski](/i18n/README.pl.md)
- [Portekizce / Português](/i18n/README.pt.md)
- [Portekizce (Brezilya) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumence / Română](/i18n/README.ro.md)
- [Rusça / Pусский](/i18n/README.ru.md)
- [Sırpça / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [İspanyolca / Español](/i18n/README.es.md)
- [Basitleştirilmiş Çince / 简体中文](/i18n/README.zh-cn.md)
- [İsveççe / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Geleneksel Çince / 繁體中文](/i18n/README.zh-tw.md)
- [Türkçe / Turkish](/i18n/README.tr.md)
- [Ukraynaca / Українська](/i18n/README.uk.md)
- [Vietnamca / Tiếng Việt](/i18n/README.vi-vn.md)
- [Çevirilerin listesi](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsorlar

[![Yeni Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
