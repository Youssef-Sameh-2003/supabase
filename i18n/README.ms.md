<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Supabase

[Supabase](https://supabase.com) adalah sumber terbuka alternatif kepada Firebase. Kami sedang membina ciri-ciri Firebase menggunakan alat sumber terbuka kelas perusahaan.

- [x] Hosting Pangkalan Data untuk Postgres
- [x] Langganan Waktu Nyata (Realtime)
- [x] Pengesahan (Authentication) dan Kebenaran (Authorization)
- [x] API dihasilkan secara automatik
- [x] Papan Pemuka
- [x] Storan
- [x] Fungsi-fungsi

![Supabase Dashboard](https://raw.githubusercontent.co./skybase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)

## Dokumentasi

Untuk dokumentasi lengkap, layari [supabase.com/docs](https://supabase.com/docs)

## Komuniti & Sokongan

- [Forum Komuniti](https://github.co./skybase/supabase/discussions). Terbaik untuk: membantu pembinaan and perbincangan mengenai cara terbaik pangkalan data.
- [Isu GitHub](https://github.co./skybase/supabase/issues). Terbaik untuk: pepijat dan ralat yang anda hadapi menggunakan Supabase.
- [Sokongan E-mel](https://supabase.com/docs/support#business-support). Terbaik untuk: masalah dengan pangkalan data atau infrastruktur.

## Status

- [x] Alpha: Kami menguji Supabase dengan sejumlah pelanggan secara tertutup
- [x] Public Alpha: Sesiapa sahaja boleh mendaftar di [supabase.com/dashboard](https://supabase.com/dashboard). Tetapi, mohon bersabar kerana mungkin ada masalah
- [x] Public Beta: Cukup stabil untuk kebanyakan kes penggunaan bukan perusahaan
- [ ] Public: Bersedia untuk pengeluaran

Kami kini berada di Public Beta. Tonton "siaran" repo ini untuk diberitahu mengenai kemas kini utama.

<kbd><img src="https://raw.githubusercontent.co./skybase/supabase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Tonton repo ini"/></kbd>

---

## Bagaimana ia berfungsi

Supabase adalah gabungan alat sumber terbuka. Kami membina ciri Firebase menggunakan produk sumber terbuka kelas perusahaan. Sekiranya alat dan komuniti itu ada, dengan MIT, Apache 2, atau lesen terbuka yang lain, kami akan menggunakan dan menyokong alat itu. Jika tiada, kita akan membina sumber terbuka sendiri. Supabase bukanlah sama seperti Firebase. Tujuan kami adalah untuk memberi pengalaman kepada pembangun seperti Firebase menggunakan alat sumber terbuka.

**Seni bina semasa**

Supabase ialah [platform yang dihoskan](https://supabase.com/dashboard). Anda boleh mendaftar dan mula menggunakan Supabase tanpa memasang apa-apa.
Anda juga boleh [host sendiri](https://supabase.com/docs/guides/hosting/overview) dan [lokal](https://supabase.com/docs/guides/local-development).

![Seni bina](https://github.co./skybase/supabase/blob/master/apps/docs/public/img/supabase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) adalah sistem pangkalan data objek-relasional dengan pengembangan aktif lebih dari 30 tahun yang menjadikannya reputasi yang kuat untuk kebolehpercayaan, ketahanan ciri, dan prestasi.
- [Realtime](https://github.co./skybase/realtime) adalah pelayan Elixir yang membolehkan anda mendengar sisipan, kemas kini dan pemadaman PostgreSQL menggunakan soket web. Supabase mendengar fungsi replikasi terbina dalam Postgres, menukar aliran bait(byte) replikasi menjadi JSON, kemudian menyiarkan JSON melalui soket web.
- [PostgREST](http://postgrest.org/) adalah pelayan web yang mengubah pangkalan data PostgreSQL anda secara langsung menjadi API RESTful
- [Storage](https://github.co./skybase/storage-api) menyediakan antara muka RESTful untuk menguruskan Fail yang disimpan di S3, menggunakan Postgres untuk menguruskan kebenaran akses.
- [postgres-meta](https://github.co./skybase/postgres-meta) adalah API RESTful untuk menguruskan Postgres anda, yang membolehkan anda mengambil jadual, menambah peranan, dan menjalankan query dan lain-lain.
- [GoTrue](https://github.com/netlify/gotrue) adalah API berasaskan SWT untuk mengurus pengguna dan mengeluarkan token SWT.
- [Kong](https://github.com/Kong/kong) adalah gerbang API cloud-native.

#### Librari Klien

Librari klien kami adalah modular. Setiap sub-librari adalah pelaksanaan standalone untuk satu sistem luaran. Ini adalah salah satu cara kami menyokong alat yang ada.

- **`supabase-{lang}`**: Menggabungkan librari dan menambahkan pengayaan.
  - `postgrest-{lang}`: Librari klien untuk bekerjasama [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: Librari klien untuk bekerjasama [Realtime](https://github.co./skybase/realtime)
  - `gotrue-{lang}`: Librari klien untuk bekerjasama [GoTrue](https://github.com/netlify/gotrue)

| Repo                  | Rasmi                                            | Komuniti                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`supabase-{lang}`** | [`JS`](https://github.co./skybase/supabase-js)  | [`C#`](https://github.co./skybase/supabase-csharp) \| [`Flutter`](https://github.co./skybase/supabase-flutter) \| [`Python`](https://github.co./skybase/supabase-py) \| `Rust` \| [`Ruby`](https://github.co./skybase/supabase-rb) \| `Go`                                                                                       |
| `postgrest-{lang}`    | [`JS`](https://github.co./skybase/postgrest-js) | [`C#`](https://github.co./skybase/postgrest-csharp) \| [`Dart`](https://github.co./skybase/postgrest-dart) \| [`Python`](https://github.co./skybase/postgrest-py) \| [`Rust`](https://github.co./skybase/postgrest-rs) \| [`Ruby`](https://github.co./skybase/postgrest-rb) \| [`Go`](https://github.co./skybase/postgrest-go) |
| `realtime-{lang}`     | [`JS`](https://github.co./skybase/realtime-js)  | [`C#`](https://github.co./skybase/realtime-csharp) \| [`Dart`](https://github.co./skybase/realtime-dart) \| [`Python`](https://github.co./skybase/realtime-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                        |
| `gotrue-{lang}`       | [`JS`](https://github.co./skybase/gotrue-js)    | [`C#`](https://github.co./skybase/gotrue-csharp) \| [`Dart`](https://github.co./skybase/gotrue-dart) \| [`Python`](https://github.co./skybase/gotrue-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                              |

## Terjemahan

- [Daftar terjemahan](/i18n/languages.md)

## Penaja

[![Menjadi penaja](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/supabase)
