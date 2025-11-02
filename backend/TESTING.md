# 🧪 راهنمای تست Backend

## تست دستی API

### 1. بررسی سلامت سرور

```bash
curl http://localhost:8000/api/health
```

انتظار:
```json
{
  "status": "healthy",
  "message": "🚀 API در حال اجرا است"
}
```

### 2. تست افزودن URL

```bash
curl -X POST "http://localhost:8000/api/ingest-url" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://fa.wikipedia.org/wiki/هوش_مصنوعی"
  }'
```

### 3. تست جست‌وجو

```bash
curl -X POST "http://localhost:8000/api/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "هوش مصنوعی چیست؟",
    "use_web_search": false,
    "top_k": 5
  }'
```

### 4. تست تنظیمات

#### دریافت تنظیمات
```bash
curl http://localhost:8000/api/config
```

#### به‌روزرسانی تنظیمات
```bash
curl -X POST "http://localhost:8000/api/config" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "sk-your-new-key",
    "base_url": "https://api.gapgpt.app/v1"
  }'
```

## استفاده از Swagger UI

1. به آدرس http://localhost:8000/docs بروید
2. تمام APIها را به صورت تعاملی تست کنید

## تست با Python

```python
import requests

BASE_URL = "http://localhost:8000"

# تست health
response = requests.get(f"{BASE_URL}/api/health")
print(response.json())

# تست search
response = requests.post(f"{BASE_URL}/api/search", json={
    "query": "تاریخچه ایران",
    "use_web_search": False,
    "top_k": 5
})
print(response.json())
```

## تست واحد (Unit Tests)

```bash
# نصب pytest
pip install pytest pytest-asyncio

# اجرای تست‌ها
pytest tests/ -v
```

## تست بار (Load Testing)

```bash
# نصب locust
pip install locust

# اجرای تست بار
locust -f tests/load_test.py
```

نمونه `load_test.py`:

```python
from locust import HttpUser, task, between

class SearchUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def search(self):
        self.client.post("/api/search", json={
            "query": "تست",
            "use_web_search": False,
            "top_k": 5
        })
```

## لاگ‌ها

```bash
# مشاهده لاگ‌های سرور
tail -f backend.log
```
