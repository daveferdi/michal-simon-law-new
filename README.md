# מיכל סיימון — דף נחיתה (אתר פרודקשן)

אתר סטטי עצמאי. הקובץ `index.html` כולל **הכל** בתוכו — HTML, CSS, JS, גופנים ותמונות (מוטמעים כ‑data‑URI). אין שלב build, אין dependencies, אין צורך ב‑Node. פותחים אותו בדפדפן והוא עובד.

---

## פריסה ל‑Vercel (הדרך המהירה)

### אופציה א' — דרך CLI
```bash
cd production
npx vercel --prod
```
כשנשאל על הגדרות: זה פרויקט סטטי, ללא build command וללא framework (Other). ה‑Output/Root directory הוא התיקייה הזו.

### אופציה ב' — דרך Git + Vercel Dashboard
```bash
cd production
git init
git add .
git commit -m "Michal Simon landing page"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```
ואז ב‑Vercel: **New Project → Import Git Repository** → בחר את הריפו.
הגדרות:
- **Framework Preset:** Other
- **Build Command:** (להשאיר ריק)
- **Output Directory:** `.` (שורש)
- **Install Command:** (להשאיר ריק)

זהו. כל push ל‑`main` יפרוס מחדש אוטומטית.

> אפשר גם פשוט לגרור את התיקייה הזו ל‑https://vercel.com/new (Deploy by drag‑and‑drop).

---

## פריסה לכל הוסטינג סטטי אחר
מכיוון שזה קובץ בודד, הוא עובד גם ב‑Netlify, Cloudflare Pages, GitHub Pages, S3, או כל שרת סטטי — פשוט מגישים את `index.html`.

---

## ארכיטקטורה (אחרי הפירוק)
המקור היה ייצוא "bundle" של Claude Design — קובץ `index.html` יחיד של 3.1MB שדחס את קוד הריצה ב‑gzip ופיענח אותו בצד הלקוח דרך `DecompressionStream`. ה‑API הזה חסר ב‑iOS Safari ישן ובדפדפנים תוך‑אפליקטיביים, ולכן הדף **נכשל בטעינה במובייל**.

הפירוק (`unbundle.mjs`) חילץ את כל הנכסים ל‑`/assets`, פיענח את ה‑JS, וכתב מחדש את `index.html` כך שהוא טוען אותם רגיל. התוצאה: **89KB, טעינה מיידית, ללא `DecompressionStream`, עובד בכל דפדפן** — אותו עיצוב ואותה אינטראקטיביות (מחליף שפות, תחומי עיסוק, טופס).

- `index.html` — האתר עצמו, **ניתן לעריכה ישירה** (HTML + סגנונות inline + רכיב `text/x-dc` מוטמע).
- `assets/` — גופנים (woff2), תמונות (png/jpg), ושני קבצי ה‑runtime של x-dc (js).
- `unbundle.mjs` — כלי הפירוק החד‑פעמי (תיעוד; אין צורך להריץ שוב).

### טוקנים עיקריים
- רקע קרם: `#efe9dd` (כהה יותר לסקשנים: `#e7e1d4`)
- טקסט: `#3a3a53`
- צבע אקסנט (טרקוטה): `#9c5d4e`
- כפתורים כהים: `#3a3a53`
- גופנים: כותרות — *Frank Ruhl Libre* (serif); גוף — *Assistant* (sans). RTL.

### נכסים
תמונת הפורטרט וקו הרקיע מוטמעים בקובץ. אם מחליפים תמונות — לעדכן במקור (`assets/portrait.jpg`, `assets/skyline.png`) ולקמפל מחדש.
