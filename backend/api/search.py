"""
API Endpoints برای جست‌وجو
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
from core.rag_engine import rag_engine
from api.config import settings, update_openai_config
from core.openai_client import openai_client

router = APIRouter()


class SearchRequest(BaseModel):
    """مدل درخواست جست‌وجو"""
    query: str
    use_web_search: bool = False
    top_k: int = 5


class SearchResponse(BaseModel):
    """مدل پاسخ جست‌وجو"""
    answer: str
    sources: List[str]
    query: str
    search_results: List[Dict[str, Any]]


class IngestURLRequest(BaseModel):
    """مدل درخواست افزودن URL"""
    url: HttpUrl


class ConfigRequest(BaseModel):
    """مدل درخواست تنظیمات"""
    api_key: str
    base_url: str


class ConfigResponse(BaseModel):
    """مدل پاسخ تنظیمات"""
    api_key: str
    base_url: str
    model: str


@router.post("/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    """
    جست‌وجوی هوشمند با RAG
    
    - **query**: پرسش فارسی کاربر
    - **use_web_search**: استفاده از جست‌وجوی وب (پیش‌فرض: False)
    - **top_k**: تعداد نتایج (پیش‌فرض: 5)
    """
    try:
        result = rag_engine.process_query(
            query=request.query,
            use_web_search=request.use_web_search,
            top_k=request.top_k
        )
        return SearchResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در پردازش جست‌وجو: {str(e)}")


@router.post("/ingest-url")
async def ingest_url(request: IngestURLRequest):
    """
    افزودن URL به پایگاه داده
    
    - **url**: آدرس صفحه وب برای کراول و افزودن
    """
    try:
        result = rag_engine.ingest_url(str(request.url))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در افزودن URL: {str(e)}")


@router.get("/config", response_model=ConfigResponse)
async def get_config():
    """
    دریافت تنظیمات فعلی OpenAI
    """
    # نمایش فقط 4 کاراکتر اول API Key
    masked_key = settings.openai_api_key[:10] + "..." if len(settings.openai_api_key) > 10 else "***"
    
    return ConfigResponse(
        api_key=masked_key,
        base_url=settings.openai_base_url,
        model=settings.openai_model
    )


@router.post("/config")
async def update_config(request: ConfigRequest):
    """
    به‌روزرسانی تنظیمات OpenAI
    
    - **api_key**: کلید API جدید
    - **base_url**: آدرس Base URL جدید
    """
    try:
        # به‌روزرسانی تنظیمات
        update_openai_config(request.api_key, request.base_url)
        openai_client.update_config(request.api_key, request.base_url)
        
        return {
            "success": True,
            "message": "✅ تنظیمات با موفقیت به‌روزرسانی شد"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در به‌روزرسانی تنظیمات: {str(e)}")


@router.get("/health")
async def health_check():
    """بررسی سلامت API"""
    return {
        "status": "healthy",
        "message": "🚀 API در حال اجرا است"
    }
