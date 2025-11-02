# 🐳 راهنمای Docker

این راهنما نحوه استفاده از Docker برای اجرای پروژه را شرح می‌دهد.

## 📋 پیش‌نیازها

- Docker
- Docker Compose

## 🚀 راه‌اندازی سریع

### 1. تنظیم Environment Variables

```bash
# ایجاد فایل .env در root پروژه
cp .env.example .env
# ویرایش و افزودن API Keys

```

نمونه `.env`:

```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_BASE_URL=https://api.gapgpt.app/v1
FIRECRAWL_API_KEY=fc-your-key-here

```

### 2. Build و اجرا

```bash
# Build images
docker-compose build

# اجرای همه سرویس‌ها
docker-compose up

# یا در background
docker-compose up -d

```

## 🔧 دستورات مفید

### مشاهده لاگ‌ها

```bash
# همه سرویس‌ها
docker-compose logs -f

# فقط backend
docker-compose logs -f backend

# فقط frontend
docker-compose logs -f frontend

```

### متوقف کردن

```bash
# متوقف کردن
docker-compose stop

# حذف containers
docker-compose down

# حذف همه چیز (شامل volumes)
docker-compose down -v

```

### Restart

```bash
# Restart یک سرویس
docker-compose restart backend

# Rebuild و restart
docker-compose up -d --build backend

```

## 📊 سرویس‌ها

### Backend
- **Port:** 8000
- **URL:** http://localhost:8000
- **Docs:** http://localhost:8000/docs

### Frontend
- **Port:** 3000
- **URL:** http://localhost:3000

### Qdrant
- **Port:** 6333
- **Dashboard:** http://localhost:6333/dashboard

## 🔍 دیباگ

### دسترسی به shell سرویس

```bash
# Backend
docker-compose exec backend bash

# Frontend
docker-compose exec frontend sh

```

### مشاهده logs خطا

```bash
docker-compose logs --tail=100 backend

```

### بررسی health

```bash
# Backend
curl http://localhost:8000/api/health

# Qdrant
curl http://localhost:6333/

```

## 🏗️ Production Build

برای production، Dockerfile را ویرایش کنید:

### Frontend Dockerfile (Production)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]

```

### Build برای Production

```bash
docker-compose -f docker-compose.prod.yml up -d

```

## 🔒 امنیت

⚠️ **نکات مهم:**

1. **هرگز** API Keys را در Dockerfile قرار ندهید
2. از `.env` برای secrets استفاده کنید
3. `.env` را به `.gitignore` اضافه کنید
4. در production از Docker secrets استفاده کنید

## 📦 Volumes

```bash
# لیست volumes
docker volume ls

# حذف volume خاص
docker volume rm persian-search-engine_qdrant_storage

# Backup volume
docker run --rm -v persian-search-engine_qdrant_storage:/data -v $(pwd):/backup alpine tar czf /backup/qdrant_backup.tar.gz -C /data .

# Restore volume
docker run --rm -v persian-search-engine_qdrant_storage:/data -v $(pwd):/backup alpine tar xzf /backup/qdrant_backup.tar.gz -C /data

```

## 🔄 به‌روزرسانی

```bash
# Pull latest code
git pull

# Rebuild images
docker-compose build --no-cache

# Restart services
docker-compose up -d

```

## 🐛 رفع مشکلات

### Port already in use

```bash
# پیدا کردن process
lsof -i :8000
# یا
sudo netstat -tulpn | grep :8000

# متوقف کردن
docker-compose down

```

### Out of disk space

```bash
# پاکسازی
docker system prune -a
docker volume prune

```

### Image build failed

```bash
# Clear cache
docker builder prune

# Rebuild
docker-compose build --no-cache

```

## 📊 Monitoring (آینده)

```yaml
# docker-compose.yml - افزودن monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"

```

## 🔗 لینک‌های مفید

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
