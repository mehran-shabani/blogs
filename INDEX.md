# 📑 فهرست مستندات

به مستندات کامل موتور جست‌وجوی فارسی خوش آمدید!

## 🚀 شروع سریع

### برای کاربران جدید

1. **[QUICKSTART.md](QUICKSTART.md)** ← شروع از اینجا! ⚡
   - راه‌اندازی در 5 دقیقه
   - مراحل ساده و سریع

2. **[README.md](README.md)** ← راهنمای کامل 📖
   - توضیحات جامع
   - نصب و راه‌اندازی تفصیلی
   - نمونه‌های کد

### برای توسعه‌دهندگان

1. **[ARCHITECTURE.md](ARCHITECTURE.md)** ← معماری فنی 🏗️
   - ساختار سیستم
   - Data Flow
   - جزئیات پیاده‌سازی

2. **[backend/TESTING.md](backend/TESTING.md)** ← تست و دیباگ 🧪
   - نحوه تست API
   - ابزارها و روش‌ها

3. **[CONTRIBUTING.md](CONTRIBUTING.md)** ← راهنمای مشارکت 🤝
   - نحوه Contribute
   - Code Style
   - Pull Request Process

### برای DevOps

1. **[DOCKER.md](DOCKER.md)** ← استقرار با Docker 🐳
   - docker-compose
   - Production deployment
   - Troubleshooting

### اطلاعات پروژه

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ← خلاصه پروژه 📊
   - آمار و ارقام
   - ویژگی‌ها
   - Roadmap

2. **[CHANGELOG.md](CHANGELOG.md)** ← تاریخچه تغییرات 📋
   - نسخه‌های منتشر شده
   - تغییرات جدید
   - رفع باگ‌ها

---

## 🗂️ ساختار مستندات بر اساس موضوع

### 📥 نصب و راه‌اندازی

- [QUICKSTART.md](QUICKSTART.md) - راه‌اندازی سریع
- [README.md](README.md) - راه‌اندازی کامل
- [DOCKER.md](DOCKER.md) - راه‌اندازی با Docker

### 💻 توسعه

- [ARCHITECTURE.md](ARCHITECTURE.md) - معماری
- [CONTRIBUTING.md](CONTRIBUTING.md) - مشارکت
- [backend/TESTING.md](backend/TESTING.md) - تست

### 📊 مدیریت پروژه

- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - خلاصه
- [CHANGELOG.md](CHANGELOG.md) - تغییرات

---

## 📂 فایل‌های کد

### Backend (Python/FastAPI)

```txt
backend/
├── main.py                    # نقطه ورود
├── api/
│   ├── search.py              # API endpoints
│   └── config.py              # تنظیمات
├── core/
│   ├── openai_client.py       # OpenAI
│   ├── firecrawl_client.py    # Firecrawl
│   └── rag_engine.py          # RAG Engine
└── db/
    ├── models.py              # Models
    └── vector_store.py        # Qdrant

```

### Frontend (Next.js/React)

```txt
frontend/
├── app/
│   ├── page.tsx               # صفحه اصلی
│   ├── layout.tsx             # Layout
│   └── admin/page.tsx         # ادمین
└── components/
    ├── SearchBar.tsx          # جست‌وجو
    ├── ResultCard.tsx         # نتایج
    └── ThemeToggle.tsx        # تم

```

---

## 🔗 لینک‌های مفید

### مستندات رسمی تکنولوژی‌ها

- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/docs)
- [Qdrant](https://qdrant.tech/documentation/)
- [OpenAI API](https://platform.openai.com/docs)

### ابزارها

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>
- Qdrant Dashboard: <http://localhost:6333/dashboard>

---

## 🎯 مسیرهای یادگیری پیشنهادی

### مسیر 1: کاربر نهایی

```txt
QUICKSTART.md → استفاده از برنامه

```

### مسیر 2: توسعه‌دهنده Frontend

```txt
README.md → frontend/ → ARCHITECTURE.md → CONTRIBUTING.md

```

### مسیر 3: توسعه‌دهنده Backend

```txt
README.md → backend/ → ARCHITECTURE.md → TESTING.md → CONTRIBUTING.md

```

### مسیر 4: DevOps Engineer

```txt
README.md → DOCKER.md → Deployment → Monitoring

```

---

## ❓ سوالات متداول

**Q: از کجا شروع کنم؟**
A: [QUICKSTART.md](QUICKSTART.md) را بخوانید و در 5 دقیقه شروع کنید!

**Q: چطور می‌توانم مشارکت کنم؟**
A: [CONTRIBUTING.md](CONTRIBUTING.md) را مطالعه کنید.

**Q: معماری سیستم چگونه است؟**
A: [ARCHITECTURE.md](ARCHITECTURE.md) را ببینید.

**Q: چطور با Docker اجرا کنم؟**
A: [DOCKER.md](DOCKER.md) راهنمای کامل دارد.

**Q: چطور API را تست کنم؟**
A: [backend/TESTING.md](backend/TESTING.md) را بخوانید.

---

## 📞 دریافت کمک

- 🐛 **مشکل فنی:** GitHub Issues
- 💬 **بحث و گفتگو:** GitHub Discussions
- 📧 **تماس مستقیم:** [در اینجا ایمیل خود را قرار دهید]

---

## 📊 آمار پروژه

- **31** فایل
- **1,555** خط کد
- **7** فایل مستندات
- **8** فیچر اصلی
- **100%** کامل!

---

**آخرین به‌روزرسانی:** 2025-11-02
**نسخه:** 1.0.0
**وضعیت:** ✅ Production Ready
