# 🏗️ معماری فنی موتور جست‌وجوی فارسی

## نمای کلی

این سند معماری فنی سیستم را به تفصیل شرح می‌دهد.

## 📐 لایه‌های معماری

### 1. لایه ارائه (Presentation Layer)
**تکنولوژی:** Next.js 15 + React 18 + TypeScript

- **App Router:** استفاده از App Directory جدید Next.js
- **Server Components:** برای بهینه‌سازی عملکرد
- **Client Components:** برای تعاملات کاربری
- **RTL Support:** پشتیبانی کامل از راست‌به‌چپ
- **Dark Mode:** با Context API و Tailwind
- **Responsive Design:** طراحی واکنش‌گرا

#### کامپوننت‌های اصلی:
```
SearchBar: ورودی جست‌وجو + تنظیمات
ResultCard: نمایش پاسخ + منابع
ThemeToggle: تغییر تم تیره/روشن
AdminPanel: مدیریت تنظیمات
```

### 2. لایه API (API Layer)
**تکنولوژی:** FastAPI + Pydantic

#### Endpoints:

**POST /api/search**
- ورودی: query, use_web_search, top_k
- خروجی: answer, sources, search_results
- فرآیند: Query → Embedding → Search → RAG → Response

**POST /api/ingest-url**
- ورودی: URL
- خروجی: success, message, chunks_count
- فرآیند: Scrape → Normalize → Chunk → Embed → Store

**GET/POST /api/config**
- مدیریت تنظیمات OpenAI

**GET /api/health**
- Health Check

### 3. لایه منطق کسب‌وکار (Business Logic Layer)

#### RAG Engine
**فایل:** `backend/core/rag_engine.py`

Pipeline جست‌وجو:
```
1. نرمال‌سازی پرسش (با Hazm)
   ↓
2. تولید Embedding
   ↓
3. جست‌وجوی معنایی در Vector Store
   ↓
4. اگر نتیجه < threshold:
   - جست‌وجو در وب با Firecrawl
   - Ingestion محتوای جدید
   - جست‌وجوی مجدد
   ↓
5. تولید Context از نتایج
   ↓
6. ارسال به OpenAI با RAG Prompt
   ↓
7. برگرداندن پاسخ + منابع
```

#### OpenAI Client
**فایل:** `backend/core/openai_client.py`

ویژگی‌ها:
- پشتیبانی از Custom Base URL
- Dynamic API Key
- Chat Completion
- Embeddings
- RAG Prompt Engineering

#### Firecrawl Client
**فایل:** `backend/core/firecrawl_client.py`

قابلیت‌ها:
- Scrape تک URL
- Crawl چند صفحه
- استخراج Markdown
- Web Search (برای آینده)

### 4. لایه داده (Data Layer)

#### Vector Store (Qdrant)
**فایل:** `backend/db/vector_store.py`

```python
Collection: persian_documents
Vectors: 768-dimensional (multilingual-mpnet)
Distance: Cosine Similarity
Storage: In-memory (MVP) / Persistent (Production)
```

عملیات:
- `add_documents()`: افزودن Embeddings
- `search()`: جست‌وجوی معنایی
- `delete_collection()`: پاک‌سازی

#### Database Models (SQLAlchemy)
**فایل:** `backend/db/models.py`

**Document:**
- url, title, content, metadata
- timestamps

**DocumentChunk:**
- document_id, chunk_text, chunk_index
- embedding_vector (fallback)

**SearchHistory:**
- query, response, sources
- search_type, timestamp

### 5. لایه پردازش زبان (NLP Layer)

#### Text Normalization
**کتابخانه:** Hazm

عملیات:
- حذف کاراکترهای اضافی
- نرمال‌سازی فارسی
- Tokenization

#### Text Chunking
استراتژی:
- Sliding Window
- Size: 500 tokens
- Overlap: 50 tokens
- حفظ معنا

#### Embedding Model
**مدل پیش‌فرض:**
```
sentence-transformers/paraphrase-multilingual-mpnet-base-v2
Dimension: 768
Languages: 50+ including Farsi
```

**جایگزین‌ها:**
- LaBSE (Google)
- HooshvareLab/bert-fa-base-uncased

## 🔄 جریان داده (Data Flow)

### Scenario 1: جست‌وجوی معمولی

```
User Input
    ↓
Frontend (Next.js)
    ↓
POST /api/search
    ↓
RAG Engine
    ├→ Normalize Query
    ├→ Generate Embedding
    ├→ Search Vector Store
    │   ↓
    │   Found Results
    ├→ Build Context
    ├→ Call OpenAI
    └→ Return Response
    ↓
Frontend Display
```

### Scenario 2: جست‌وجو + Web

```
User Input + Web Search Enabled
    ↓
Frontend (Next.js)
    ↓
POST /api/search (use_web_search=true)
    ↓
RAG Engine
    ├→ Search Vector Store
    │   ↓
    │   Insufficient Results
    ├→ Firecrawl Search
    ├→ Scrape URLs
    ├→ Chunk & Embed
    ├→ Add to Vector Store
    ├→ Search Again
    ├→ Build Context
    ├→ Call OpenAI
    └→ Return Response
```

### Scenario 3: افزودن URL

```
Admin Panel
    ↓
POST /api/ingest-url
    ↓
Firecrawl Client
    ├→ Scrape URL
    ├→ Extract Content
    ↓
RAG Engine
    ├→ Normalize Text
    ├→ Chunk Text
    ├→ Generate Embeddings
    ├→ Store in Qdrant
    └→ Return Success
```

## 🔐 امنیت

### Authentication (Future)
- JWT Tokens
- Role-based Access
- Rate Limiting

### Data Protection
- API Key Masking
- Environment Variables
- HTTPS Only (Production)

### Input Validation
- Pydantic Models
- URL Validation
- Query Sanitization

## ⚡ بهینه‌سازی

### Frontend
- Server-Side Rendering (SSR)
- Static Site Generation (SSG) where possible
- Image Optimization
- Code Splitting
- Lazy Loading

### Backend
- Async/Await Patterns
- Connection Pooling
- Caching (Redis - Future)
- Background Tasks (Celery - Future)

### Database
- Index Optimization
- Vector Compression
- Batch Operations

## 📊 مانیتورینگ (Future)

### Metrics
- Request Latency
- Error Rates
- Token Usage
- Search Quality

### Logging
- Structured Logging
- Log Levels
- Request Tracing

### Alerting
- Error Alerts
- Performance Degradation
- Quota Limits

## 🧪 تست

### Backend
```bash
pytest backend/tests/
```

### Frontend
```bash
npm run test
```

### Integration
```bash
pytest backend/tests/integration/
```

## 🚀 Deployment

### Docker Support

```dockerfile
# Backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]

# Frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Production Considerations

1. **Environment Variables**
   - Separate configs for dev/staging/prod
   - Secret management

2. **Scaling**
   - Horizontal scaling with load balancer
   - Separate Vector Store instance
   - CDN for static assets

3. **Database**
   - PostgreSQL for structured data
   - Qdrant Cloud for vectors
   - Backup strategy

4. **Monitoring**
   - Application Performance Monitoring (APM)
   - Error Tracking (Sentry)
   - Analytics

## 📚 References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Sentence Transformers](https://www.sbert.net/)
- [Hazm Documentation](https://github.com/roshan-research/hazm)
