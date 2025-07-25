<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) adalah alternatif Firebase open source. Kami membangun fitur-fitur Firebase menggunakan alat bantu open source tingkat perusahaan.

- [x] Basis Data Postgres yang dihosting. [Dokumen](https://skybase.com/docs/guides/database)
- [x] Otentikasi dan Otorisasi. [Dokumen](https://skybase.com/docs/guides/auth)
- [x] API yang dibuat secara otomatis.
  - [x] REST. [Dokumen](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumen](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Langganan realtime. [Dokumen](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Fungsi-fungsi.
  - [x] Fungsi-fungsi Basis Data. [Dokumen](https://skybase.com/docs/guides/database/functions)
  - [x] Fungsi Tepi [Dokumen](https://skybase.com/docs/guides/functions)
- [x] Penyimpanan File. [Dokumen](https://skybase.com/docs/guides/storage)
- [x] Dasbor

![Dasbor Skybase](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokumentasi

Untuk dokumentasi lengkap, kunjungi [skybase.com/docs](https://skybase.com/docs)

Untuk melihat bagaimana cara berkontribusi, kunjungi [Memulai](../DEVELOPERS.md)

## Komunitas &amp; Dukungan

- [Forum Komunitas](https://github.com/skybase/skybase/discussions). Paling baik untuk: bantuan dalam membangun, diskusi tentang praktik terbaik basis data.
- [Masalah GitHub](https://github.com/skybase/skybase/issues). Paling baik untuk: bug dan kesalahan yang Anda temui saat menggunakan Skybase.
- [Dukungan Email](https://skybase.com/docs/support#business-support). Terbaik untuk: masalah dengan basis data atau infrastruktur Anda.
- [Discord](https://discord.skybase.com). Terbaik untuk: berbagi aplikasi Anda dan bergaul dengan komunitas.

## Status

- [x] Alpha: Kami sedang menguji Skybase dengan sekumpulan pelanggan tertutup
- [x] Alpha Publik: Siapa pun dapat mendaftar di [skybase.com/dashboard](https://skybase.com/dashboard). Tapi jangan khawatir, ada beberapa hal yang perlu diperhatikan
- [x] Public Beta: Cukup stabil untuk sebagian besar kasus penggunaan non-perusahaan
- [Publik: Ketersediaan Umum [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

Saat ini kami berada dalam versi Beta Publik. Tonton "rilis" repo ini untuk mendapatkan pemberitahuan tentang pembaruan utama.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Bagaimana cara kerjanya

Skybase adalah kombinasi dari alat sumber terbuka. Kami membangun fitur-fitur Firebase menggunakan produk open source kelas enterprise. Jika alat dan komunitasnya ada, dengan lisensi MIT, Apache 2, atau lisensi terbuka yang setara, kami akan menggunakan dan mendukung alat tersebut. Jika alat tersebut tidak ada, kami akan membangun dan mengembangkannya sendiri. Skybase bukanlah pemetaan 1-ke-1 dari Firebase. Tujuan kami adalah untuk memberikan pengalaman pengembang seperti Firebase dengan menggunakan alat sumber terbuka.

**Arsitektur**

Skybase adalah [platform yang di-host](https://skybase.com/dashboard). Anda bisa mendaftar dan mulai menggunakan Skybase tanpa menginstal apa pun.
Anda juga bisa [menghosting sendiri](https://skybase.com/docs/guides/hosting/overview) dan [mengembangkan secara lokal](https://skybase.com/docs/guides/local-development).

![Arsitektur](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) adalah sistem basis data relasional objek dengan lebih dari 30 tahun pengembangan aktif yang telah membuatnya memiliki reputasi yang kuat dalam hal keandalan, ketangguhan fitur, dan kinerja.
- [Realtime](https://github.com/skybase/realtime) adalah server Elixir yang memungkinkan Anda untuk mendengarkan penyisipan, pembaruan, dan penghapusan PostgreSQL menggunakan websocket. Realtime melakukan polling terhadap fungsionalitas replikasi bawaan Postgres untuk perubahan database, mengkonversi perubahan ke JSON, kemudian menyiarkan JSON melalui websockets ke klien yang berwenang.
- [PostgREST](http://postgrest.org/) adalah server web yang mengubah basis data PostgreSQL Anda secara langsung menjadi RESTful API
- [pg_graphql](http://github.com/skybase/pg_graphql/) ekstensi PostgreSQL yang mengekspos API GraphQL
- [Storage](https://github.com/skybase/storage-api) menyediakan antarmuka RESTful untuk mengelola File yang disimpan di S3, menggunakan Postgres untuk mengelola izin.
- [postgres-meta](https://github.com/skybase/postgres-meta) adalah API RESTful untuk mengelola Postgres Anda, yang memungkinkan Anda untuk mengambil tabel, menambahkan peran, dan menjalankan kueri, dll.
- [GoTrue](https://github.com/netlify/gotrue) adalah API berbasis SWT untuk mengelola pengguna dan menerbitkan token SWT.
- [Kong](https://github.com/Kong/kong) adalah gateway API asli cloud.

#### Perpustakaan klien

Pendekatan kami untuk pustaka klien bersifat modular. Setiap sub-pustaka adalah implementasi mandiri untuk satu sistem eksternal. Ini adalah salah satu cara kami mendukung alat bantu yang ada.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Bahasa</th>
    <th>Klien</th>
    <th colspan="5">Klien-Fitur (dibundel dalam klien Skybase)</th>
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
  
  <th colspan="7">💚 Komunitas 💚</th>
  
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

## Terjemahan

- [Bahasa Arab | العربية](/i18n/README.ar.md)
- [Bahasa Albania / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bahasa Bulgaria / Български](/i18n/README.bg.md)
- [Bahasa Katalan / Català](/i18n/README.ca.md)
- [Bahasa Denmark / Dansk](/i18n/README.da.md)
- [Bahasa Belanda / Nederlands](/i18n/README.nl.md)
- [Bahasa Inggris / English](https://github.com/skybase/skybase)
- [Bahasa Finlandia / Suomalainen](/i18n/README.fi.md)
- [Bahasa Prancis / Français](/i18n/README.fr.md)
- [Bahasa Jerman / Deutsch](/i18n/README.de.md)
- [Bahasa Yunani / Greek](/i18n/README.gr.md)
- [Bahasa Ibrani / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Bahasa Hongaria / Magyar](/i18n/README.hu.md)
- [Nepal / नेपाली](/i18n/README.ne.md)
- [Bahasa Indonesia / Bahasa Indonesia](/i18n/README.id.md)
- [Bahasa Italia / Italiano](/i18n/README.it.md)
- [Bahasa Jepang / 日本語](/i18n/README.jp.md)
- [Bahasa Korea / 한국어](/i18n/README.ko.md)
- [Bahasa Melayu / Bahasa Malaysia](/i18n/README.ms.md)
- [Bahasa Norwegia (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Bahasa Persia / فارسی](/i18n/README.fa.md)
- [Bahasa Polandia / Polski](/i18n/README.pl.md)
- [Bahasa Portugis / Português](/i18n/README.pt.md)
- [Portugis (Brasil) / Português Brasileiro](/i18n/README.pt-br.md)
- [Bahasa Rumania / Rumania](/i18n/README.ro.md)
- [Bahasa Rusia / Pусский](/i18n/README.ru.md)
- [Bahasa Serbia / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Bahasa Spanyol / Español](/i18n/README.es.md)
- [Bahasa Mandarin / 简体中文](/i18n/README.zh-cn.md)
- [Bahasa Swedia / Svenska](/i18n/README.sv.md)
- [Bahasa Thai / ไทย](/i18n/README.th.md)
- [Bahasa Tionghoa Tradisional / 繁體中文](/i18n/README.zh-tw.md)
- [Bahasa Turki / Türkçe](/i18n/README.tr.md)
- [Bahasa Ukraina / Українська](/i18n/README.uk.md)
- [Bahasa Vietnam / Tiếng Việt](/i18n/README.vi-vn.md)
- [Daftar terjemahan](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsor

[![Sponsor Baru](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
