"""
FastAPI Main Application
موتور جست‌وجوی فارسی با هوش مصنوعی
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.search import router as search_router
from api.config import settings
from db.models import init_db

# ایجاد اپلیکیشن FastAPI
app = FastAPI(
    title="🔍 موتور جست‌وجوی فارسی",
    description="موتور جست‌وجوی هوشمند فارسی با RAG و OpenAI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# تنظیمات CORS برای اتصال با Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# اضافه کردن روترها
app.include_router(search_router, prefix="/api", tags=["جست‌وجو"])


@app.on_event("startup")
async def startup_event():
    """رویدادهای هنگام راه‌اندازی"""
    print("🚀 در حال راه‌اندازی موتور جست‌وجوی فارسی...")
    
    # مقداردهی اولیه دیتابیس
    try:
        init_db()
        print("✅ دیتابیس آماده است")
    except Exception as e:
        print(f"⚠️ خطا در مقداردهی دیتابیس: {e}")
    
    print(f"✅ سرور در حال اجرا در: http://{settings.host}:{settings.port}")
    print(f"📚 مستندات API: http://{settings.host}:{settings.port}/docs")


@app.get("/")
async def root():
    """صفحه اصلی API"""
    return {
        "message": "🔍 موتور جست‌وجوی فارسی",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "search": "/api/search",
            "ingest": "/api/ingest-url",
            "config": "/api/config",
            "health": "/api/health"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=True
    )
