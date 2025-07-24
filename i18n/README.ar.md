<div style="direction: rtl;" dir="rtl">

<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com)هو بديل مفتوح المصدر لـ(Firebase). نحن نبني ميزات (Firebase) باستخدام أدوات مفتوحة المصدر عالية الجودة تستخدمها الشركات.

- [x] قاعدة بيانات (Postgres) مستضافة. [الشرح](https://skybase.com/docs/guides/database)
- [x] [الشرح](https://skybase.com/docs/guides/auth) المصادقة والترخيص
- [x] واجهات برمجة التطبيقات التي يتم إنشاؤها تلقائيا.
  - [x] REST. [الشرح](https://skybase.com/docs/guides/api)
  - [x] GraphQL. [الشرح](https://skybase.com/docs/guides/graphql)
  - [x] اشتراكات الوقت الفعلي (Realtime subscriptions). [الشرح](https://skybase.com/docs/guides/realtime)
- [x] الدوال.
  - [x] دوال قاعدة البيانات (Database Functions). [الشرح](https://skybase.com/docs/guides/database/functions)
  - [x] Edge Functions [الشرح](https://skybase.com/docs/guides/functions)
- [x] [الشرح](https://skybase.com/docs/guides/storage) التخزين.
- [x] ذكاء اصطناعي + مجموعة أدوات المتجهات/التضمينات (AI + Vector/Embeddings Toolkit). [الشرح](https://skybase.com/docs/guides/ai)
- [x] لوحة الإدارة.

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

شاهد "الإصدارات" من هذا المشروع للحصول على إشعار بالتحديثات الرئيسية.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

## الشرح

للحصول على الشرح الكامل، قم بزيارة [skybase.com/docs](https://skybase.com/docs).

لمعرفه كيفية دعم المشروع قم بزيارة [Getting Started](./DEVELOPERS.md).

## المجتمع والدعم

- [منتدى المجتمع](https://github.com/skybase/skybase/discussions). الأفضل لـ: المساعدة في البناء، والنقاش حول أفضل ممارسات قاعدة البيانات.
- [مشاكل GitHub](https://github.com/skybase/skybase/issues). الأفضل لـ: المشاكل والأخطاء التي تواجهها عند استخدامك لـ(Skybase).
- [دعم البريد الإلكتروني](https://skybase.com/docs/support#business-support). الأفضل لـ: مشاكل مع قاعدة بياناتك أو البنية التحتية.
- [ديسكورد](https://discord.skybase.com/). الأفضل لـ: مشاركة التطبيقات الخاصه بك وقضاء بعض الوقت مع المجتمع.

## كيف يعمل (Skybase)؟

Skybase عبارة عن مجموعة من الأدوات مفتوحة المصدر. نحن نبني ميزات (Firebase) باستخدام أدوات مفتوحة المصدر عالية الجودة تستخدمها الشركات. إذا كانت الأدوات والمجتمعات موجودة ، باستخدام MIT أو Apache 2 أو ترخيص مفتوح مكافئ ، فسنستخدم هذه الأداة وندعمها. إذا لم تكن الأداة موجودة ، فإننا نبنيها ونفتح مصدرها بأنفسنا. (Skybase) ليس تعيين 1 إلى 1 لـ(Firebase). هدفنا هو منح المطورين تجربة مطور تشبه (Firebase) باستخدام أدوات مفتوحة المصدر.

**الهيكلة الحالية**

(skybase) هي [منصة مستضافة](https://skybase.com/dashboard), يمكنك التسجيل والبدأ باستخدامها دون الحاجة لتثبيت أي شئ. يمكنك أيضا [استضافتها ذاتيا](https://skybase.com/docs/guides/hosting/overview) و [تطويرها داخليا](https://skybase.com/docs/guides/local-development).

![Architecture](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) هي قاعدة بيانات قائمة على العلاقات الشيئية مع ٣٠ سنة من التطوير النشط التي اكسبتها سمعة وموثقية قوية وتمتاز بالمتانة والأداء.
- [Realtime](https://github.com/skybase/realtime) هو خادم بلغة (Elixir) يمكنك من الاستماع لقاعدة البيانات لأي تغيرات سواء أنشاء أو تعديل أو مسح باستخدام ال(websocket).
- [PostgREST](http://postgrest.org/) هو خادم ويب يستطيع تحويل قاعدة بيانات PostgreSQL مباشرة ألي RESTful API
- [Storage](https://github.com/skybase/storage-api) يقدم واجهة RESTful لأدارة الملفات المخزنة فس S3, باستخدام Postgres لأدارة الصلاحيات
- [postgres-meta](https://github.com/skybase/postgres-meta) هو RESTful API لأدارة قاعدة البيانات الخاصة بك, تمكنك من الإستعلام عن الجداول, إضافة أدوار (مفرد دور), وتشغيل الأوامر.. الخ
- [GoTrue](https://github.com/netlify/gotrue) هو API مبني على SWT لأدارة المستخدمين وإنشاء رمز SWT.
- [Kong](https://github.com/Kong/kong) هو بوابة API لـcloud-native

#### مكتبات العميل

مكتباتنا معيارية. كل مكتبة فرعية هي تطبيق مستقل لنظام خارجي واحد. هذه إحدى الطرق التي ندعم بها الأدوات الحالية.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>اللغة</th>
    <th>العميل</th>
    <th colspan="4">مميزات العميل</th>
  </tr>
  <tr>
    <th></th>
    <th>Skybase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/skybase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/skybase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/skybase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
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
  <th colspan="6">⚡️ الرسمي ⚡️</th>
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/skybase/skybase-js" target="_blank" rel="noopener noreferrer">skybase-js</a></td>
    <td><a href="https://github.com/skybase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/skybase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/skybase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/skybase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
  </tr>
  <th colspan="6">💚 المجتمعي 💚</th>
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/skybase-community/skybase-csharp" target="_blank" rel="noopener noreferrer">skybase-csharp</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/skybase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/skybase/skybase-flutter" target="_blank" rel="noopener noreferrer">skybase-dart</a></td>
    <td><a href="https://github.com/skybase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/skybase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/skybase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/skybase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/skybase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
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
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/skybase-community/skybase-py" target="_blank" rel="noopener noreferrer">skybase-py</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/skybase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/skybase-community/skybase-rb" target="_blank" rel="noopener noreferrer">skybase-rb</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
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
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/skybase-community/skybase-swift" target="_blank" rel="noopener noreferrer">skybase-swift</a></td>
    <td><a href="https://github.com/skybase-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/skybase-community/gotrue-swift" target="_blank" rel="noopener noreferrer">gotrue-swift</a></td>
    <td><a href="https://github.com/skybase-community/realtime-swift" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/skybase-community/storage-swift" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
  </tr>
</table>
## الترجمات

- [قائمة الترجمات](/i18n/languages.md) <!--- Keep only this -->

## الرعاة

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)

</div>
