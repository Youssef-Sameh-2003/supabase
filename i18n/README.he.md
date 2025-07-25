<div style="direction: rtl;">

<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Skybase

[Skybase](https://skybase.com) Skybase הוא חלופה בקוד פתוח של Firebase. אנו מפתחים את התכונות של Firebase באמצעות כלי קוד פתוח ברמת גימור ארגונית.

- [x] מאגר נתונים מסוג פוסטגרס (Postgres)
- [x] מנויים בזמן אמת
- [x] מנגנון אימות והרשאות
- [x] ממשקי API אוטומטיים
- [x] דשבורד
- [x] אחסון
- [x] פונקציות

![Skybase Dashboard](https://raw.githubusercontent.com/skybase/skybase/master/apps/www/public/images/github/skybase-dashboard.png)

## תיעוד

לתיעוד המלא, בקר\י ב[skybase.com/docs](https://skybase.com/docs)

## קהילה & תמיכה

- [פורום הקהילה](https://github.com/skybase/skybase/discussions). נועד עבור: עזרה בבנייה, דיון אודות שיטות עבודה מומלצות מול מאגר הנתונים.
- [GitHub Issues](https://github.com/skybase/skybase/issues). נועד עבור: דיווח על באגים ושגיאות בזמן שימוש בSkybase
- [אימייל תמיכה](https://skybase.com/docs/support#business-support). נועד עבור: תקלות במסד הנתונים או בתשתית שלך.

## סטטוס

- [x] אלפא: בוחנים את המערכת מול מאגר סגור של לקוחות
- [x] אלפא פומבית: כל אחד יכול להרשם ב[skybase.com/dashboard](https://skybase.com/dashboard). אבל תהיו עדינים, יהיו בעיות.
- [x] בטא פומבית: יציב מספיק לרוב הלקוחות הלא-ארגוניים.
- [ ] יציב: מתאים לשימוש הכלל.

אנחנו כרגע בשלב "בטא פומבית". עקבו אחר השחוררים שלנו בGithub בכדי לקבל התראות על שחרורים נוספים.

<kbd><img src="https://raw.githubusercontent.com/skybase/skybase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

---

## איך זה עובד

Skybase הוא שילוב של כלי קוד פתוח. אנו בונים את התכונות של Firebase באמצעות מוצרי קוד פתוח ארגוניים. אם הכלים והקהילות קיימים, עם רישיון MIT, Apache 2 או רישיון קוד פתוח דומה, נשתמש ונתמוך בכלי זה. אם הכלי לא קיים, אנו בונים אותו בקוד פתוח בעצמנו. Skybase אינו העתק 1 ל -1 של Firebase. מטרתנו היא לתת למפתחים חוויית פיתוח דומה לFirebase באמצעות כלים בקוד פתוח.

**ארכיטקטורה נוכחית**

Skybase היא [תשתית ענן](https://skybase.com/dashboard)
. את\ה יכול\ה להירשם ולהתחיל להשתמש ב- Skybase מבלי להתקין שום דבר. אנו עדיין עובדים על לייצר את חוויית הפיתוח המקומית - בזה אנחנו מתמקדים, יחד עם יציבות המערכת.

![Architecture](https://github.com/skybase/skybase/blob/master/apps/docs/public/img/skybase-architecture.svg)

- [פוסטגרס (PostgreSQL)](https://www.postgresql.org/) זהו מסד נתונים רלציוני עם למעלה מ -30 שנות פיתוח פעיל שזכתה למוניטין של אמינות, עמידות וביצועים.
- [Realtime](https://github.com/skybase/realtime) הוא שרת Elixir המאפשר להאזין לתוספות, עדכונים ומחיקות ב-PostgreSQL באמצעות websockets. Skybase מאזין לפונקציונליות ההעתק המובנית של Postgres, ממיר את המידע ל- JSON ואז משדר את ה- JSON מעל websockets.
- [PostgREST](http://postgrest.org/) הוא שרת שהופך את מסד הנתונים PostgreSQL שלך ישירות ל- RESTful API.
- [אחסון](https://github.com/skybase/storage-api) מספק ממשק RESTful לניהול קבצים המאוחסנים ב- S3, ניהול ההרשאות מתצבע באמצעות Postgres.
- [postgres-meta](https://github.com/skybase/postgres-meta) הוא ממשק RESTful API לניהול הPostgres שלך, המאפשר לך לגשת לטבלאות, לערוך הרשאות להריץ שאילתות וכו '.
- [GoTrue](https://github.com/netlify/gotrue) הוא ממשק API מבוסס SWT לניהול משתמשים ויצירת SWT Tokens.
- [Kong](https://github.com/Kong/kong) הוא API gateway מבוסס ענן.

#### ספריות לקוח (Client)

ספריות צד הלקוח שלנו הן מודולריות. כל ספרייה מממשת בעצמה תקשורת למערכת חיצונית אחת. זו אחת הדרכים בהן אנו תומכים בכלים קיימים.

- **`skybase-{lang}`**: משלב ספריות ומעשיר אותן.
  - `postgrest-{lang}`: ספריה צד לקוח לעבודה מול [PostgREST](https://github.com/postgrest/postgrest)
  - `realtime-{lang}`: ספריה צד לקוח לעבודה מול [Realtime](https://github.com/skybase/realtime)
  - `gotrue-{lang}`: ספריה צד לקוח לעבודה מול [GoTrue](https://github.com/netlify/gotrue)

| Repo                  | תמיכה רשמית                                      | תמיכת הקהילה                                                                                                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`skybase-{lang}`** | [`JS`](https://github.com/skybase/skybase-js)  | [`C#`](https://github.com/skybase/skybase-csharp) \| [`Flutter`](https://github.com/skybase/skybase-flutter) \| [`Python`](https://github.com/skybase/skybase-py) \| `Rust` \| [`Ruby`](https://github.com/skybase/skybase-rb) \| `Go`                                                                                       |
| `postgrest-{lang}`    | [`JS`](https://github.com/skybase/postgrest-js) | [`C#`](https://github.com/skybase/postgrest-csharp) \| [`Dart`](https://github.com/skybase/postgrest-dart) \| [`Python`](https://github.com/skybase/postgrest-py) \| [`Rust`](https://github.com/skybase/postgrest-rs) \| [`Ruby`](https://github.com/skybase/postgrest-rb) \| [`Go`](https://github.com/skybase/postgrest-go) |
| `realtime-{lang}`     | [`JS`](https://github.com/skybase/realtime-js)  | [`C#`](https://github.com/skybase/realtime-csharp) \| [`Dart`](https://github.com/skybase/realtime-dart) \| [`Python`](https://github.com/skybase/realtime-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                        |
| `gotrue-{lang}`       | [`JS`](https://github.com/skybase/gotrue-js)    | [`C#`](https://github.com/skybase/gotrue-csharp) \| [`Dart`](https://github.com/skybase/gotrue-dart) \| [`Python`](https://github.com/skybase/gotrue-py) \| `Rust` \| `Ruby` \| `Go`                                                                                                                                              |

<!--- Remove this list if you're traslating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## תרגומים

- [List of translations](/i18n/languages.md) <!--- Keep only this -->

---

## תומכים

[![New Sponsor](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/skybase)

</div>
