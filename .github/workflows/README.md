# 🔄 GitHub Actions Workflows

این پوشه شامل Workflow‌های GitHub Actions برای اتوماسیون فرآیند‌های مختلف پروژه است.

## 📋 لیست Workflow‌ها

### 1. CI Workflow (`ci.yml`)
**هدف:** اجرای تست‌ها و بررسی کیفیت کد

**زمان اجرا:**
- هنگام Push به برنچ `main`
- هنگام ایجاد Pull Request

**وظایف:**
- ✅ تست Backend (Python)
- ✅ Build Frontend (Next.js)
- ✅ بررسی Lint

---

### 2. Release Workflow (`release.yml`)
**هدف:** اتوماسیون Release، Tag گذاری و Build تصاویر Docker

**زمان اجرا:**
- خودکار: هنگام Push به برنچ `main` (به جز تغییرات فایل‌های `.md` و `.github`)
- دستی: از طریق GitHub Actions UI با انتخاب نوع Version Bump

**قابلیت‌های اصلی:**

#### 🏷️ اتو تگ گذاری (Auto Tagging)
- استفاده از Semantic Versioning (`v1.0.0`, `v1.1.0`, `v2.0.0`)
- پشتیبانی از سه نوع Version Bump:
  - `major`: تغییرات بزرگ (breaking changes) - `v1.0.0` → `v2.0.0`
  - `minor`: قابلیت‌های جدید (new features) - `v1.0.0` → `v1.1.0`
  - `patch`: رفع باگ (bug fixes) - `v1.0.0` → `v1.0.1`
- به صورت پیش‌فرض از نوع `patch` استفاده می‌شود
- تگ‌ها به صورت خودکار روی Git Push می‌شوند

#### 🐳 اتو بیلد (Auto Build)
- Build خودکار تصاویر Docker برای:
  - Backend (FastAPI)
  - Frontend (Next.js)
- Push تصاویر به GitHub Container Registry (GHCR)
- پشتیبانی از چند Platform:
  - `linux/amd64`
  - `linux/arm64`
- تگ‌های متعدد برای هر تصویر:
  - Version کامل: `v1.2.3`
  - Major.Minor: `1.2`
  - Major: `1`
  - `latest` (برای برنچ main)
  - SHA برنچ: `main-abc1234`
- استفاده از Cache برای سرعت بالاتر

#### 🚀 اتو ریلیز (Auto Release)
- ایجاد خودکار Release در GitHub
- تولید Changelog از Commit‌های جدید
- شامل اطلاعات:
  - تغییرات (Changelog)
  - دستورات دانلود Docker Images
  - راهنمای Quick Start
  - لینک به مستندات
  - تاریخ و زمان انتشار
- دسترسی به Source Code (ZIP و TAR.GZ)
- به‌روزرسانی تگ `latest`

**Pipeline Jobs:**

```
create-tag (تگ گذاری)
    ↓
build-and-push (بیلد Docker)
    ↓
create-release (ایجاد Release)
    ↓
update-latest (به‌روزرسانی تگ latest)
    ↓
notify (خلاصه نتایج)
```

---

## 🚀 نحوه استفاده

### استفاده خودکار (Automatic)

فقط کافیست تغییرات خود را به برنچ `main` Push کنید:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

Workflow به صورت خودکار:
1. تگ جدید ایجاد می‌کند (با increment نوع `patch`)
2. تصاویر Docker را Build و Push می‌کند
3. Release جدید در GitHub ایجاد می‌کند

### استفاده دستی (Manual)

برای کنترل بیشتر روی نوع Version Bump:

1. به **Actions** در GitHub بروید
2. روی **Release** کلیک کنید
3. روی **Run workflow** کلیک کنید
4. نوع Version Bump را انتخاب کنید:
   - `major` برای تغییرات بزرگ
   - `minor` برای قابلیت‌های جدید
   - `patch` برای رفع باگ
5. روی **Run workflow** کلیک کنید

---

## 🐳 استفاده از Docker Images منتشر شده

پس از اجرای موفق Workflow، می‌توانید از تصاویر Docker استفاده کنید:

### دانلود نسخه خاص:
```bash
# Backend
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO-backend:v1.0.0

# Frontend
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO-frontend:v1.0.0
```

### دانلود آخرین نسخه:
```bash
# Backend
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO-backend:latest

# Frontend
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO-frontend:latest
```

### اجرا با Docker Compose:

فایل `docker-compose.yml` را برای استفاده از تصاویر GHCR تغییر دهید:

```yaml
version: '3.8'

services:
  backend:
    image: ghcr.io/YOUR_USERNAME/YOUR_REPO-backend:latest
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - QDRANT_URL=http://qdrant:6333
    depends_on:
      - qdrant

  frontend:
    image: ghcr.io/YOUR_USERNAME/YOUR_REPO-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_storage:/qdrant/storage

volumes:
  qdrant_storage:
```

سپس اجرا کنید:
```bash
docker-compose up -d
```

---

## 🔐 دسترسی‌ها (Permissions)

Workflow نیاز به Permissions زیر دارد که به صورت خودکار توسط GitHub فراهم می‌شود:

- `contents: write` - برای ایجاد تگ و Release
- `packages: write` - برای Push تصاویر Docker به GHCR

**نکته:** مطمئن شوید که در تنظیمات Repository، گزینه "Allow GitHub Actions to create and approve pull requests" فعال باشد.

---

## 📊 نمایش نتایج

پس از اجرای موفق، خلاصه‌ای شامل موارد زیر نمایش داده می‌شود:

```
✅ Release Successful!

📌 Release Details
- Tag: v1.2.3
- Docker Images: Published to GHCR
- Release: Created on GitHub

🐳 Docker Images
docker pull ghcr.io/username/repo-backend:v1.2.3
docker pull ghcr.io/username/repo-frontend:v1.2.3

🔗 View Release
```

---

## 🐛 رفع مشکلات

### خطای Permission Denied
اگر با خطای دسترسی مواجه شدید:
1. به **Settings** > **Actions** > **General** بروید
2. در بخش **Workflow permissions**، گزینه **Read and write permissions** را انتخاب کنید
3. گزینه **Allow GitHub Actions to create and approve pull requests** را فعال کنید

### تصاویر Docker Push نمی‌شوند
1. مطمئن شوید Package visibility روی Public یا Internal است
2. از Personal Access Token با scope `write:packages` استفاده کنید (اختیاری)

### تگ ایجاد نمی‌شود
1. مطمئن شوید برنچ محافظت شده (protected) نیست
2. History کامل Git را Fetch کنید (`fetch-depth: 0`)

---

## 📚 منابع بیشتر

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Semantic Versioning](https://semver.org/)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Build Push Action](https://github.com/docker/build-push-action)

---

## 🤝 مشارکت

برای بهبود این Workflow‌ها:
1. Fork کنید
2. تغییرات را اعمال کنید
3. Pull Request ایجاد کنید

---

**تاریخ ایجاد:** 2025-11-02  
**نسخه:** 1.0.0  
**وضعیت:** ✅ آماده استفاده
