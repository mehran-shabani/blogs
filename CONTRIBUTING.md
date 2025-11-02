# 🤝 راهنمای مشارکت

از اینکه می‌خواهید در این پروژه مشارکت کنید متشکریم! 🎉

## 📋 فرآیند مشارکت

### 1. Fork و Clone

```bash
# Fork کنید در GitHub
# سپس Clone کنید:
git clone https://github.com/your-username/persian-search-engine.git
cd persian-search-engine

```

### 2. ایجاد Branch جدید

```bash
git checkout -b feature/my-new-feature
# یا
git checkout -b fix/bug-description

```

نام‌گذاری Branch:

- `feature/...` برای ویژگی‌های جدید
- `fix/...` برای رفع باگ
- `docs/...` برای تغییرات مستندات
- `refactor/...` برای Refactoring

### 3. توسعه

#### Backend

```bash
cd backend
source venv/bin/activate
# کد خود را بنویسید
python -m pytest  # تست‌ها را اجرا کنید

```

#### Frontend

```bash
cd frontend
npm install
# کد خود را بنویسید
npm run lint  # بررسی Lint
npm run build  # بررسی Build

```

### 4. Commit

از Conventional Commits استفاده کنید:

```bash
git commit -m "feat: افزودن قابلیت جدید X"
git commit -m "fix: رفع باگ Y"
git commit -m "docs: به‌روزرسانی README"

```

انواع Commit:

- `feat`: ویژگی جدید
- `fix`: رفع باگ
- `docs`: تغییرات مستندات
- `style`: تغییرات فرمت (بدون تغییر کد)
- `refactor`: Refactoring کد
- `test`: افزودن تست
- `chore`: تغییرات ابزار و پیکربندی

### 5. Push و Pull Request

```bash
git push origin feature/my-new-feature

```

سپس در GitHub یک Pull Request باز کنید.

## 🎯 راهنمای کدنویسی

### Python (Backend)

```python
# استفاده از Type Hints
def process_query(query: str, top_k: int = 5) -> Dict[str, Any]:
    """
    پردازش پرسش کاربر

    Args:
        query: متن پرسش
        top_k: تعداد نتایج

    Returns:
        Dict شامل پاسخ و منابع
    """
    pass

# استفاده از Docstrings
# PEP 8 Style Guide
# Black formatter

```

### TypeScript (Frontend)

```typescript
// استفاده از TypeScript
interface SearchResult {
  answer: string;
  sources: string[];
  query: string;
}

// Named exports
export function SearchBar({ onSearch }: Props) {
  // ...
}

// Prettier formatter
// ESLint rules

```

### کامنت‌گذاری

```python
# ✅ خوب: توضیح چرایی
# استفاده از Cosine برای دقت بالاتر در فارسی
distance = Distance.COSINE

# ❌ بد: توضیح چیستی (واضح است)
# تنظیم distance به COSINE
distance = Distance.COSINE

```

## 🧪 تست

### Backend

```bash
# تست واحد
pytest tests/unit/

# تست یکپارچه
pytest tests/integration/

# تست با Coverage
pytest --cov=backend tests/

```

### Frontend

```bash
# تست کامپوننت‌ها
npm run test

# تست E2E
npm run test:e2e

```

## 📝 مستندات

- به‌روزرسانی README برای ویژگی‌های جدید
- افزودن Docstrings برای توابع جدید
- به‌روزرسانی CHANGELOG

## 🔍 Code Review

Pull Request شما باید:

- [ ] تست‌های مربوطه را پاس کند
- [ ] مستندات را به‌روزرسانی کند
- [ ] Style Guide را رعایت کند
- [ ] توضیحات کافی داشته باشد

## 💡 ایده‌ها و پیشنهادات

ایده جدید دارید؟
1. ابتدا یک Issue باز کنید
2. طرح خود را شرح دهید
3. منتظر بازخورد باشید
4. سپس شروع به کدنویسی کنید

## 🐛 گزارش باگ

برای گزارش باگ، لطفاً شامل موارد زیر باشید:

- توضیح مشکل
- مراحل بازتولید
- رفتار مورد انتظار
- رفتار واقعی
- Environment (OS, Python version, etc.)
- Screenshots (در صورت امکان)

## ❓ سوالات

سوال دارید؟

- Issue باز کنید با تگ `question`
- یا در Discussions پست کنید

## 📜 کد رفتار (Code of Conduct)

- احترام به دیگران
- پذیرش نقد سازنده
- تمرکز روی بهترین راه‌حل
- کمک به تازه‌واردان

## 🎖️ تشکر

لیست مشارکت‌کنندگان در CONTRIBUTORS.md

---

با تشکر از مشارکت شما! ❤️
