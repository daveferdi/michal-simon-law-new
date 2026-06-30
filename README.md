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

## הערות לפיתוח עתידי
- הקובץ `index.html` הוא **תוצר מקומפל** — אין לערוך אותו ידנית (הוא ממוזער ומוטמע).
- מקור העריכה הוא קובץ ה‑Design Component המקורי בפרויקט (`Michal Simon Hero.dc.html`). שינויים נעשים שם ואז מקמפלים מחדש לקובץ עצמאי.
- אם רוצים לעבור ל‑codebase אמיתי (React/Next על Vercel): יש להתייחס לקובץ ה‑HTML כ‑**רפרנס עיצובי** ולשחזר את ה‑UI בקומפוננטות. הצבעים, הטיפוגרפיה והמרווחים מופיעים בקובץ המקור.

### טוקנים עיקריים
- רקע קרם: `#efe9dd` (כהה יותר לסקשנים: `#e7e1d4`)
- טקסט: `#3a3a53`
- צבע אקסנט (טרקוטה): `#9c5d4e`
- כפתורים כהים: `#3a3a53`
- גופנים: כותרות — *Frank Ruhl Libre* (serif); גוף — *Assistant* (sans). RTL.

### נכסים
תמונת הפורטרט וקו הרקיע מוטמעים בקובץ. אם מחליפים תמונות — לעדכן במקור (`assets/portrait.jpg`, `assets/skyline.png`) ולקמפל מחדש.
