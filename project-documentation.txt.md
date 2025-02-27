# תיעוד פרויקט - מערכת ניהול סיסמאות

## מטרת הכלי ומענה למטרה

### תיאור הכלי
מערכת ניהול סיסמאות מאובטחת המאפשרת למשתמשים לנהל את אמצעי ההזדהות שלהם למערכות שונות באופן מאובטח. המערכת כוללת מנגנוני אבטחה מתקדמים, ניהול משתמשים, ומערכת התראות.

### מענה למטרה
המערכת עונה על המטרה המרכזית באופן מקיף:
- מספקת אחסון מאובטח לסיסמאות
- מאפשרת ניהול נוח של פרטי התחברות למערכות שונות
- כוללת מנגנוני אבטחה חזקים
- מעודדות משתמשים ליצירת סיסמאות חזקות
- מספקת ממשק משתמש ידידותי
- מיישמת מדיניות סיסמאות קפדנית
- כוללת מערכת התראות אוטומטית

## בעיות שנתקלנו בהן

### 1. אתגרי אבטחה
- קושי באיזון בין נוחות המשתמש לבין רמת האבטחה
- התמודדות עם שמירת סיסמאות באופן מאובטח בדאטהבייס
- אתגרים בניהול הרשאות וגישה למידע

### 2. אתגרים טכניים
- אינטגרציה מורכבת עם Firebase
- סנכרון מול שירות האימייל
- טיפול במצבי קצה בתהליך ההתחברות
- כתיבת הפרוייקט ב-typescript, ידע שנרכש תוך כדי העבודה על הפרוייקט.
- עבודה עם Git.

### 3. אתגרי משתמש
- עיצוב ממשק משתמש אינטואיטיבי
- הנגשת מידע על חוזק סיסמאות
- התמודדות עם משתמשים חסומים

## חוזקות וחולשות של הכלי

### חוזקות
1. אבטחה:
   - הצפנת סיסמאות חזקה
   - מדיניות סיסמאות מקיפה
   - מנגנון חסימת משתמשים
   - התראות אבטחה בזמן אמת

2. חווית משתמש:
   - ממשק נוח וידידותי
   - תצוגה ברורה של מידע
   - גנרטור סיסמאות חזקות
   - התראות ברורות למשתמש

3. תכונות טכניות:
   - שימוש בטכנולוגיות מודרניות
   - קוד מאורגן ונקי

### חולשות
1. מגבלות טכניות:
   - תלות בשירותי צד שלישי (Firebase, Gmail)
   - חוסר תמיכה במצב לא מקוון


2. חוויית משתמש:
   - הגבלות על סיסמאות עלולות לתסכל משתמשים
   - חוסר בתמיכה במכשירים ניידים