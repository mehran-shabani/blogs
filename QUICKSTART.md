# ⚡ راهنمای سریع راه‌اندازی

این راهنما شما را در کمتر از 5 دقیقه به راه‌اندازی موتور جست‌وجو می‌رساند.

## 🎯 3 گام ساده

### گام 1: نصب وابستگی‌ها

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # یا در Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend (در ترمینال جدید)
cd frontend
npm install
```

### گام 2: تنظیم API Keys

```bash
# Backend
cd backend
cp .env.example .env
# ویرایش .env و افزودن:
# OPENAI_API_KEY=your-key-here
# OPENAI_BASE_URL=https://api.gapgpt.app/v1

# Frontend
cd frontend
cp .env.local.example .env.local
# معمولاً نیازی به تغییر نیست
```

### گام 3: اجرا!

```bash
# Backend (ترمینال 1)
cd backend
python main.py

# Frontend (ترمینال 2)
cd frontend
npm run dev
```

✅ **تمام!** 

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

## 🔧 یا با اسکریپت‌های خودکار

```bash
# Backend
cd backend
./run.sh

# Frontend
cd frontend
./run.sh
```

## 🎪 تست سریع

1. به http://localhost:3000 بروید
2. به صفحه **تنظیمات** (Admin) بروید
3. API Key خود را وارد کنید
4. یک URL فارسی (مثلاً از ویکی‌پدیا) اضافه کنید
5. به صفحه اصلی برگردید و سوال بپرسید!

## ❓ مشکل دارید؟

### Backend اجرا نمی‌شود
```bash
# بررسی Python version (باید 3.9+ باشد)
python --version

# نصب مجدد
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend اجرا نمی‌شود
```bash
# بررسی Node version (باید 18+ باشد)
node --version

# پاک کردن و نصب مجدد
rm -rf node_modules package-lock.json
npm install
```

### API Key کار نمی‌کند
- مطمئن شوید فایل `.env` در پوشه `backend` وجود دارد
- API Key را از طریق صفحه Admin هم می‌توانید تنظیم کنید
- سرور Backend را restart کنید

## 📚 مراحل بعدی

بعد از راه‌اندازی موفق:

1. ✅ چند URL فارسی اضافه کنید
2. ✅ سوالات مختلف بپرسید
3. ✅ جست‌وجوی وب را امتحان کنید
4. ✅ تم تیره/روشن را تست کنید

برای اطلاعات بیشتر [README.md](README.md) را مطالعه کنید.

---

**نکته مهم:** برای استفاده در Production، حتماً تنظیمات امنیتی و احراز هویت را پیاده‌سازی کنید!
