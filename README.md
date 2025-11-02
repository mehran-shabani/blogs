# 🔍 موتور جست‌وجوی فارسی با هوش مصنوعی

موتور جست‌وجوی تمام‌فارسی مبتنی بر هوش مصنوعی که با استفاده از **FastAPI** در بک‌اند و **Next.js 15** در فرانت‌اند ساخته شده است. این موتور قابلیت جست‌وجوی معنایی (Semantic Search)، پاسخ‌گویی هوشمند با RAG، و کراول صفحات فارسی با Firecrawl را دارد.

## ✨ ویژگی‌های اصلی

- 🧠 **جست‌وجوی معنایی هوشمند** با استفاده از Embeddings
- 🤖 **پاسخ‌گویی با RAG** (Retrieval-Augmented Generation)
- 🌐 **کراول وب فارسی** با Firecrawl API
- 🎨 **رابط کاربری فارسی مدرن** با پشتیبانی کامل RTL
- 🌓 **تم تیره و روشن** قابل تغییر
- ⚙️ **پنل مدیریت** برای تنظیمات OpenAI و افزودن محتوا
- 📊 **Vector Store با Qdrant** برای جست‌وجوی سریع
- 🔒 **قابلیت تنظیم API Key و Base URL** سفارشی

## 🏗️ معماری پروژه

```
project_root/
├── backend/                    # Backend FastAPI
│   ├── main.py                # نقطه ورود اصلی
│   ├── api/
│   │   ├── search.py          # API Endpoints
│   │   └── config.py          # تنظیمات و Settings
│   ├── core/
│   │   ├── openai_client.py   # کلاینت OpenAI
│   │   ├── firecrawl_client.py # کلاینت Firecrawl
│   │   └── rag_engine.py      # موتور RAG
│   ├── db/
│   │   ├── models.py          # مدل‌های دیتابیس
│   │   └── vector_store.py    # Vector Store با Qdrant
│   ├── requirements.txt       # وابستگی‌های Python
│   └── .env.example           # نمونه تنظیمات محیطی
│
├── frontend/                   # Frontend Next.js
│   ├── app/
│   │   ├── page.tsx           # صفحه اصلی
│   │   ├── layout.tsx         # Layout کلی
│   │   ├── globals.css        # استایل‌های سراسری
│   │   ├── providers.tsx      # Context Providers
│   │   └── admin/
│   │       └── page.tsx       # پنل مدیریت
│   ├── components/
│   │   ├── SearchBar.tsx      # کامپوننت جست‌وجو
│   │   ├── ResultCard.tsx     # کامپوننت نمایش نتایج
│   │   └── ThemeToggle.tsx    # دکمه تغییر تم
│   ├── package.json           # وابستگی‌های Node.js
│   └── next.config.js         # تنظیمات Next.js
│
└── README.md                   # این فایل
```

## 📋 پیش‌نیازها

### Backend
- Python 3.9 یا بالاتر
- pip (Package Manager)

### Frontend
- Node.js 18 یا بالاتر
- npm یا yarn

### سرویس‌های خارجی (اختیاری)
- **OpenAI API Key** یا API سازگار (مثل GapGPT)
- **Firecrawl API Key** برای کراول وب (اختیاری)

## 🚀 نصب و راه‌اندازی

### 1️⃣ کلون کردن پروژه

```bash
git clone <repository-url>
cd persian-search-engine
```

### 2️⃣ راه‌اندازی Backend

```bash
# رفتن به پوشه backend
cd backend

# ایجاد محیط مجازی Python
python -m venv venv

# فعال‌سازی محیط مجازی
# در لینوکس/Mac:
source venv/bin/activate
# در Windows:
venv\Scripts\activate

# نصب وابستگی‌ها
pip install -r requirements.txt

# کپی کردن فایل تنظیمات
cp .env.example .env

# ویرایش فایل .env و قرار دادن API Keys
# OPENAI_API_KEY=your-api-key
# OPENAI_BASE_URL=https://api.gapgpt.app/v1
# FIRECRAWL_API_KEY=your-firecrawl-key (اختیاری)

# اجرای سرور
python main.py
```

سرور Backend در آدرس `http://localhost:8000` اجرا می‌شود.
مستندات API در `http://localhost:8000/docs` در دسترس است.

### 3️⃣ راه‌اندازی Frontend

در یک ترمینال جدید:

```bash
# رفتن به پوشه frontend
cd frontend

# نصب وابستگی‌ها
npm install

# کپی کردن فایل تنظیمات
cp .env.local.example .env.local

# ویرایش فایل .env.local در صورت نیاز
# NEXT_PUBLIC_API_URL=http://localhost:8000

# اجرای سرور توسعه
npm run dev
```

Frontend در آدرس `http://localhost:3000` اجرا می‌شود.

## 🎯 نحوه استفاده

### 1. تنظیم API Key (اولین بار)

1. به آدرس `http://localhost:3000/admin` بروید
2. API Key و Base URL خود را وارد کنید
3. روی "ذخیره تنظیمات" کلیک کنید

### 2. افزودن محتوا

دو روش برای افزودن محتوا وجود دارد:

#### روش اول: از طریق پنل مدیریت
1. به صفحه Admin بروید
2. در بخش "افزودن محتوا از وب"، URL مورد نظر را وارد کنید
3. روی "افزودن URL" کلیک کنید

#### روش دوم: استفاده از API
```bash
curl -X POST "http://localhost:8000/api/ingest-url" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/article"}'
```

### 3. جست‌وجو

1. به صفحه اصلی (`http://localhost:3000`) بروید
2. سوال خود را به فارسی بپرسید
3. در صورت تمایل، گزینه "جست‌وجو در وب" را فعال کنید
4. پاسخ هوشمند به همراه منابع نمایش داده می‌شود

## 🔌 API Endpoints

### جست‌وجو
```http
POST /api/search
Content-Type: application/json

{
  "query": "تاریخچه هوش مصنوعی چیست؟",
  "use_web_search": false,
  "top_k": 5
}
```

### افزودن URL
```http
POST /api/ingest-url
Content-Type: application/json

{
  "url": "https://example.com/article"
}
```

### دریافت تنظیمات
```http
GET /api/config
```

### به‌روزرسانی تنظیمات
```http
POST /api/config
Content-Type: application/json

{
  "api_key": "sk-xxxxxxx",
  "base_url": "https://api.gapgpt.app/v1"
}
```

### بررسی سلامت
```http
GET /api/health
```

## 🛠️ تنظیمات پیشرفته

### تغییر مدل Embedding

در فایل `backend/api/config.py`:

```python
embedding_model: str = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
```

می‌توانید مدل‌های دیگر مانند:
- `sentence-transformers/LaBSE`
- `HooshvareLab/bert-fa-base-uncased`

### استفاده از Qdrant خارجی

در فایل `backend/.env`:

```env
QDRANT_URL=http://your-qdrant-server:6333
QDRANT_API_KEY=your-api-key
```

در فایل `backend/db/vector_store.py`:

```python
# تغییر این خط
self.client = QdrantClient(":memory:")

# به این
self.client = QdrantClient(
    url=settings.qdrant_url,
    api_key=settings.qdrant_api_key
)
```

### تغییر مدل OpenAI

در فایل `backend/api/config.py`:

```python
openai_model: str = "gpt-4o-mini"  # یا gpt-4، gpt-3.5-turbo
```

## 📊 نمودار جریان داده

```
کاربر → Frontend (Next.js)
           ↓
    POST /api/search
           ↓
    Backend (FastAPI)
           ↓
    ┌──────┴──────┐
    ↓             ↓
Vector Store   Firecrawl
(Semantic)     (Web Search)
    ↓             ↓
    └──────┬──────┘
           ↓
    RAG Engine
           ↓
    OpenAI API
           ↓
    پاسخ هوشمند + منابع
           ↓
       Frontend
```

## 🎨 تم‌سازی

فایل‌های مربوط به استایل:
- `frontend/app/globals.css` - استایل‌های سراسری
- `frontend/tailwind.config.js` - تنظیمات Tailwind
- `frontend/app/providers.tsx` - مدیریت تم

برای سفارشی‌سازی رنگ‌ها، فایل `tailwind.config.js` را ویرایش کنید.

## 🐛 رفع مشکلات رایج

### Backend اجرا نمی‌شود
```bash
# بررسی نصب وابستگی‌ها
pip install -r requirements.txt

# بررسی Python version
python --version  # باید 3.9+ باشد
```

### Frontend اجرا نمی‌شود
```bash
# پاک کردن node_modules و نصب مجدد
rm -rf node_modules package-lock.json
npm install
```

### خطای CORS
مطمئن شوید که Backend در آدرس صحیح در حال اجراست و Frontend به درستی به آن متصل است.

### خطای OpenAI API
- API Key را بررسی کنید
- Base URL را بررسی کنید
- اتصال اینترنت را بررسی کنید

## 🔒 امنیت

⚠️ **هشدارهای امنیتی:**

1. **هرگز** فایل `.env` را commit نکنید
2. API Keyها را در محیط Production از طریق متغیرهای محیطی تنظیم کنید
3. برای محیط Production، احراز هویت به پنل Admin اضافه کنید
4. از HTTPS برای ارتباط Frontend و Backend استفاده کنید

## 📈 بهبودهای آینده

- [ ] احراز هویت کاربران
- [ ] تاریخچه جست‌وجوها
- [ ] پشتیبانی از چند زبان
- [ ] ترجمه خودکار
- [ ] پاسخ صوتی (TTS)
- [ ] آپلود مستقیم فایل PDF
- [ ] داشبورد آماری
- [ ] API Rate Limiting

## 📚 مستندات بیشتر

- 📖 **[README.md](README.md)** - راهنمای کامل (این فایل)
- ⚡ **[QUICKSTART.md](QUICKSTART.md)** - راه‌اندازی در 5 دقیقه
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - معماری فنی و جزئیات
- 🐳 **[DOCKER.md](DOCKER.md)** - استفاده از Docker
- 🧪 **[backend/TESTING.md](backend/TESTING.md)** - تست API
- 📋 **[CHANGELOG.md](CHANGELOG.md)** - تاریخچه تغییرات
- 🤝 **[CONTRIBUTING.md](CONTRIBUTING.md)** - راهنمای مشارکت
- 📊 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - خلاصه پروژه
- 📑 **[INDEX.md](INDEX.md)** - فهرست مستندات

## 🤝 مشارکت

برای مشارکت در این پروژه، لطفاً [CONTRIBUTING.md](CONTRIBUTING.md) را مطالعه کنید.

خلاصه:
1. Fork کنید
2. یک Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به Branch خود Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 👥 سازندگان

ساخته‌شده با ❤️ توسط تیم توسعه فارسی

## 📞 پشتیبانی

برای گزارش باگ یا درخواست ویژگی جدید، لطفاً یک Issue در GitHub باز کنید.

---

**نسخه:** 1.0.0 (MVP)  
**تاریخ:** 2025  
**وضعیت:** ✅ آماده استفاده
