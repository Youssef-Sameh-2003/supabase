<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) යනු විවෘත පරිශීලක Firebase වෙනුවට ආදේශකයකි.අපි Firebase වල ඇති පහසුකම් enterprise-grade විවෘත පරිශීලක මෘදුකාංග භාවිතා කරමින් නිපදවනු ලබයි.

- [x] Hosted Postgres Database
- [x] Realtime subscriptions
- [x] Authentication and authorization
- [x] Auto-generated APIs
- [x] Dashboard
- [x] Storage
- [x] Functions

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## ප්‍රලේඛනය

සම්පූර්ණ විස්තරය කියවන්න ,මෙතනින් [skybase.com/docs](https://skybase.com/docs)

## Community එක හා සහයෝගය ගැනීමට

- [Community Forum](https://github.com/skybase/skybase/discussions). වඩාත්ම සුදුසු: දේවල් සෑදීමට උදව් ගැනීම.database best practices පිළිබඳ සාකච්ඡා කිරීමට.
- [GitHub Issues](https://github.com/skybase/skybase/issues). වඩාත්ම සුදුසු: Skybase භාවිතා කිරීමේදී ඔබට හමුවන වැරදී හා ප්‍රශ්න.
- [Email Support](https://skybase.com/docs/support#business-support). වඩාත්ම සුදුසු: database හා infrastructure පිළිබඳ ඔබේ ඇති ප්‍රශ්න.

## තත්ත්වය

- [x] Alpha: අප දැනට Skybase විවෘත නොවන පාරිභෝගිකයන් සමඟ පරීක්ෂා කරනවා
- [x] Public Alpha: ඕනෑම කෙනෙකුට [skybase.com/dashboard](https://skybase.com/dashboard) මඟින් සම්බන්ධ විය හැකිය.නමුත් හෙමිහිට පරීක්ෂා කරන්න, දැනට kinks කිහිපයක් පමණයි ඇත්තේ
- [x] Public Beta: non-enterprise භාවිතයන් ගොඩකට ස්ථාවරයි
- [ ] Public: භාවිතා කිරීම සඳහා සූදානම්

අප දැනට පොදු beta තත්වයේ සිටින්නෙ. ප්‍රධාන නිකුත්කිරීම් හා දැනුවත් වීම් සඳහා "releases" පිළිබඳව අවධානයෙන් සිටින්න.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## කොහොමද මෙය වැඩකරන්නෙ

Skybase යනු විවෘත පරිශීලක උපාංග කිහිපයක එකතුවකි.අප Firebase වල ඇති පහසුකම් enterprise-grade, විවෘත පරිශීලක උපාංග භාවිතා කරමින් නිපදවයි.උපාංග හා communities ඇත්නම්,ඒවා MIT,Apache 2, හෝ ඒ ආකාරයේ open license නම් අප ඒවා භාවිතා කර සහයෝගය දක්වනවා.එවැනි උපාංග නොමැතිනම්,අප ඒවා විවෘත පරිශීලක විදියට නිපදවනවා.Skybase යනු 1-ට-1 Firebase වලට සමාන දෙයක් නොවේ.අපේ අරමුණ developers ලට Firebase වැනි අත්දැකීමක් විවෘත පරිශීලක උපාංග මඟින් ලබාදීමයි.

**Current architecture**

Skybase යනු [hosted platform](https://skybase.com/dashboard) එකකි.ඔබට දැන් සම්බන්ධ වී කිසිම දෙයක් install නොකර Skybase භාවිත කල හැකිය.අප තවමත් local development අත්දැකීම සාදමින් සිටියි- මෙය තමයි අපේ දැනට ප්‍රධාන අරමුණ,platform එකේ ස්ථාවර බව සමඟ.

![Architecture](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) යනු අවුරුදු 30 වඩා කාලයක් ක්‍රියාත්මක වෙමින් පවතින object-relational database system එකක් වන අතර එය විශ්වාසනීයත්වයට,ක්‍රියාකාරීත්වයට හා feature robustness බවට කීර්තියක් අත්පත්කරගෙන සිටියි
- [Realtime](https://github.com/skybase/realtime) is an Elixir server that allows you to listen to PostgreSQL inserts, updates, and deletes using websockets. Skybase listens to Postgres' built-in replication functionality, converts the replication byte stream into JSON, then broadcasts the JSON over websockets.
- [PostgREST](http://postgrest.org/) යනු PostgreSQL database කෙලින්ම RESTful API එකක් බවට පරිවර්තනය කරන web server එකකි.
- [Storage](https://github.com/skybase/storage-api) pS3 වල ගබඩා කර ඇති files හසුරවන්න RESTful interface එකක් ලබාදීම, Postgres භාවිත කරමින් අවසරයන් හැසිරවීමට
- [postgres-meta](https://github.com/skybase/postgres-meta) Postgres හැසිරවීමට RESTful API එකක් ලබාදෙන අතර table වල දත්ත ලබාගැනීමට,roles add කිරීමට හා queries run කිරීම කර දෙයි
- [GoTrue](https://github.com/netlify/gotrue) SWT tokens භාවිත කරන්නන්ව හැසිරවීමට SWT ආශ්‍රිත APi එකකි/
- [Kong](https://github.com/Kong/kong) is a cloud-native API gateway.

#### Client libraries

Our client library is modular. Each sub-library is a standalone implementation for a single external system. This is one of the ways we support existing tools.

- **`skybase-{lang}`**: Combines libraries and adds enrichments.
  - `postgrest-{lang}`: Client library to work with [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: Client library to work with [Realtime](https://github.com/skybase/realtime)
  - `gotrue-{lang}`: Client library to work with [GoTrue](https://github.com/netlify/gotrue)

| Repo                  | Official                                         | Community                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`skybase-{lang}`** | [`JS`](https://github.com/skybase/skybase-js)  | [`C#`](https://github.com/skybase/skybase-csharp) \| [`Flutter`](https://github.com/skybase/skybase-flutter) \| [`Python`](https://github.com/skybase/skybase-py) \| `Rust` \| [`Ruby`](https://github.com/skybase/skybase-rb) \| `Go`                                                                                       |
| `postgrest-{lang}`    | [`JS`](https://github.com/skybase/postgrest-js) | [`C#`](https://github.com/skybase/postgrest-csharp) \| [`Dart`](https://github.com/skybase/postgrest-dart) \| [`Python`](https://github.com/skybase/postgrest-py) \| [`Rust`](https://github.com/skybase/postgrest-rs) \| [`Ruby`](https://github.com/skybase/postgrest-rb) \| [`Go`](https://github.com/skybase/postgrest-go) |
| `realtime-{lang}`     | [`JS`](https://github.com/skybase/realtime-js)  | [`C#`](https://github.com/skybase/realtime-csharp) \| [`Dart`](https://github.com/skybase/realtime-dart) \| [`Python`](https://github.com/skybase/realtime-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                        |
| `gotrue-{lang}`       | [`JS`](https://github.com/skybase/gotrue-js)    | [`C#`](https://github.com/skybase/gotrue-csharp) \| [`Dart`](https://github.com/skybase/gotrue-dart) \| [`Python`](https://github.com/skybase/gotrue-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                              |

<!--- Remove this list if you're traslating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Translations

- [List of translations](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsors

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
