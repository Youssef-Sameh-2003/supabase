<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) on avatud lähtekoodiga Firebase'i alternatiiv. Me ehitame Firebase'i funktsioonid, kasutades ettevõtlusklassi avatud lähtekoodiga tööriistu.

- [x] Hostitud Postgres andmebaas. [Dokumendid](https://skybase.com/docs/guides/database)
- [x] Autentimine ja autoriseerimine. [Dokumendid](https://skybase.com/docs/guides/auth)
- [x] Automaatselt genereeritud APId.
  - [x] REST. [Dokumendid](https://skybase.com/docs/guides/api#rest-api-overview)
  - [x] GraphQL. [Dokumendid](https://skybase.com/docs/guides/api#graphql-api-overview)
  - [x] Reaalajas toimivad tellimused. [Dokumendid](https://skybase.com/docs/guides/api#realtime-api-overview)
- [x] Funktsioonid.
  - [x] Andmebaasi funktsioonid. [Dokumendid](https://skybase.com/docs/guides/database/functions)
  - [x] Edge Functions [Docs](https://skybase.com/docs/guides/functions)
- [x] Faili salvestamine. [Dokumendid](https://skybase.com/docs/guides/storage)
- [x] Armatuurlaud

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## Dokumentatsioon

Täieliku dokumentatsiooni saamiseks külastage [skybase.com/docs](https://skybase.com/docs)

Et näha, kuidas panustada, külastage [Getting Started](../DEVELOPERS.md)

## Kogukond ja tugi

- [Ühenduse foorum](https://github.com/skybase/skybase/discussions). Parim: abi ehitamisel, arutelu andmebaasi parimate tavade üle.
- [GitHub Issues](https://github.com/skybase/skybase/issues). Parim lahendus: vead ja vead, millega Skybase'i kasutades kokku puutute.
- [E-posti tugi](https://skybase.com/docs/support#business-support). Parim lahendus: probleemid andmebaasi või infrastruktuuriga.
- [Discord](https://discord.skybase.com). Parim: oma rakenduste jagamiseks ja kogukonnaga suhtlemiseks.

## Staatus

- [x] Alpha: Me testime Skybase'i suletud kliendikogumiga
- [x] Avalik Alpha: Igaüks saab registreeruda aadressil [skybase.com/dashboard](https://skybase.com/dashboard). Kuid olge meiega ettevaatlikud, seal on mõned veidrused
- [x] Avalik beeta: Piisavalt stabiilne enamiku mitte-ettevõtluskasutuse jaoks
- [ ] Avalik: Üldine kättesaadavus [[status](https://skybase.com/docs/guides/getting-started/features#feature-status)]

Oleme praegu Public Beta versioonis. Jälgige selle repo "releases", et saada teateid suuremate uuenduste kohta.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## Kuidas see töötab

Skybase on avatud lähtekoodiga tööriistade kombinatsioon. Me ehitame Firebase'i funktsioonid üles, kasutades ettevõtte kvaliteediga avatud lähtekoodiga tooteid. Kui tööriistad ja kogukonnad on olemas MIT, Apache 2 või samaväärse avatud litsentsiga, kasutame ja toetame seda tööriista. Kui tööriista ei ole olemas, siis ehitame selle ise ja kasutame avatud lähtekoodi. Skybase ei ole Firebase'i 1:1 kaardistus. Meie eesmärk on pakkuda arendajatele Firebase'ile sarnast arenduskogemust, kasutades avatud lähtekoodiga tööriistu.

**Arhitektuur**

Skybase on [hostitud platvorm](https://skybase.com/dashboard). Võite registreeruda ja alustada Skybase'i kasutamist ilma midagi installimata.
Võite ka [ise hostida](https://skybase.com/docs/guides/hosting/overview) ja [arendada lokaalselt](https://skybase.com/docs/guides/local-development).

![Arhitektuur](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) on objekt-relatsiooniline andmebaasisüsteem, mille aktiivne arendamine on kestnud üle 30 aasta ja mis on saavutanud hea maine usaldusväärsuse, funktsioonide töökindluse ja jõudluse poolest.
- [Realtime](https://github.com/skybase/realtime) on Elixir server, mis võimaldab kuulata PostgreSQL-i sisestusi, uuendusi ja kustutusi veebisokkide abil. Realtime küsib Postgres'i sisseehitatud replikatsioonifunktsioone andmebaasi muudatuste kohta, konverteerib muudatused JSON-iks ja edastab seejärel JSON-i üle websocketi volitatud klientidele.
- [PostgREST](http://postgrest.org/) on veebiserver, mis muudab teie PostgreSQL andmebaasi otse RESTful API-ks
- [pg_graphql](http://github.com/skybase/pg_graphql/) on PostgreSQLi laiendus, mis avab GraphQL API
- [Storage](https://github.com/skybase/storage-api) pakub RESTful liidest S3-s salvestatud failide haldamiseks, kasutades Postgres'i õiguste haldamiseks.
- [postgres-meta](https://github.com/skybase/postgres-meta) on RESTful API oma Postgres'i haldamiseks, mis võimaldab tabelite hankimist, rollide lisamist ja päringute käivitamist jne.
- [GoTrue](https://github.com/netlify/gotrue) on SWT-põhine API kasutajate haldamiseks ja SWT-tokenite väljastamiseks.
- [Kong](https://github.com/Kong/kong) on pilvepõhine API-värav.

#### Klientide raamatukogud

Meie lähenemine kliendiraamatukogudele on modulaarne. Iga alamraamatukogu on iseseisev implementatsioon ühe välissüsteemi jaoks. See on üks viis, kuidas me toetame olemasolevaid vahendeid.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Keel</th>
    <th>Klient</th>
    <th colspan="5">Funktsioon-kliendid (komplekteeritud Skybase'i kliendiga)</th>
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
  
  <th colspan="7">⚡️ Ametlik ⚡️</th>
  
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
  
  <th colspan="7">💚 Kogukond 💚</th>
  
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

## Tõlked

- [araabia | العربية](/i18n/README.ar.md)
- [Albaania / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [bulgaaria / Български](/i18n/README.bg.md)
- [katalaani / Català](/i18n/README.ca.md)
- [Taani / Dansk](/i18n/README.da.md)
- [Hollandi keel / Nederlands](/i18n/README.nl.md)
- [inglise keel](https://github.com/skybase/skybase)
- [Soome / Suomalainen](/i18n/README.fi.md)
- [Prantsuse / Français](/i18n/README.fr.md)
- [Saksa / Deutsch](/i18n/README.de.md)
- [Kreeka / Ελληνικά](/i18n/README.gr.md)
- [heebrea / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Ungari / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indoneesia / Bahasa Indonesia](/i18n/README.id.md)
- [Itaalia keel / Italiano](/i18n/README.it.md)
- [Jaapani / 日本語](/i18n/README.jp.md)
- [Korea / 한국어](/i18n/README.ko.md)
- [Malai / Bahasa Malaysia](/i18n/README.ms.md)
- [Norra keel (Bokmål) / Norsk (Bokmål)](/i18n/README.nb-no.md)
- [Pärsia keel / فارسی](/i18n/README.fa.md)
- [Poola / Polski](/i18n/README.pl.md)
- [Portugali / Português](/i18n/README.pt.md)
- [Portugali (Brasiilia) / Português Brasileiro](/i18n/README.pt-br.md)
- [Rumeenia / Română](/i18n/README.ro.md)
- [Vene / Pусский](/i18n/README.ru.md)
- [Serbia / Srpski](/i18n/README.sr.md)
- [singhala / සිංහල](/i18n/README.si.md)
- [Hispaania / Español](/i18n/README.es.md)
- [Lihtsustatud hiina keel / 简体中文](/i18n/README.zh-cn.md)
- [Rootsi / Svenska](/i18n/README.sv.md)
- [Tai / ไทย](/i18n/README.th.md)
- [Traditsiooniline hiina keel / 繁體中文](/i18n/README.zh-tw.md)
- [Turkish / Türkçe](/i18n/README.tr.md)
- [Ukraina / Українська](/i18n/README.uk.md)
- [Vietnami keel / Tiếng Việt](/i18n/README.vi-vn.md)
- [Tõlgete loetelu](/i18n/languages.md) <!--- Keep only this -->

---

## Sponsorid

[![Uus sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)
