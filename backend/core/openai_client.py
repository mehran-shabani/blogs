"""
کلاینت OpenAI با پشتیبانی از تنظیمات سفارشی
"""
from openai import OpenAI
from typing import List, Dict, Any
from api.config import settings


class OpenAIClient:
    """کلاینت OpenAI با قابلیت تنظیم API Key و Base URL"""
    
    def __init__(self):
        self.client = None
        self._initialize_client()
    
    def _initialize_client(self):
        """مقداردهی اولیه کلاینت OpenAI"""
        self.client = OpenAI(
            api_key=settings.openai_api_key,
            base_url=settings.openai_base_url
        )
    
    def update_config(self, api_key: str, base_url: str):
        """به‌روزرسانی پیکربندی OpenAI"""
        settings.openai_api_key = api_key
        settings.openai_base_url = base_url
        self._initialize_client()
    
    def get_embedding(self, text: str, model: str = "text-embedding-ada-002") -> List[float]:
        """دریافت embedding برای متن"""
        try:
            response = self.client.embeddings.create(
                model=model,
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            print(f"خطا در دریافت embedding: {e}")
            return []
    
    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> str:
        """ارسال درخواست chat completion"""
        try:
            response = self.client.chat.completions.create(
                model=settings.openai_model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"خطا در chat completion: {e}")
            return f"متأسفانه خطایی رخ داد: {str(e)}"
    
    def generate_rag_response(
        self,
        query: str,
        context: str,
        sources: List[str]
    ) -> Dict[str, Any]:
        """تولید پاسخ RAG با پرامپت فارسی"""
        
        # پرامپت RAG فارسی
        system_prompt = """شما یک دستیار هوشمند فارسی‌زبان هستید که وظیفه دارید به سؤالات کاربران بر اساس اطلاعات موجود پاسخ دهید.

قوانین مهم:
1. فقط از اطلاعات موجود در متن زمینه استفاده کنید
2. اگر پاسخی در متن زمینه نیست، صادقانه بگویید که نمی‌دانید
3. پاسخ‌های کامل، دقیق و قابل فهم ارائه دهید
4. از زبان فارسی رسمی و روان استفاده کنید
5. در صورت امکان، به منابع اشاره کنید

ساختار پاسخ:
- پاسخ اصلی: یک پاراگراف کامل و جامع
- توضیحات تکمیلی: جزئیات بیشتر در صورت نیاز
- منابع: لیست منابع استفاده‌شده"""

        user_prompt = f"""سؤال: {query}

متن زمینه:
{context}

منابع موجود:
{chr(10).join(f'- {source}' for source in sources)}

لطفاً به سؤال پاسخ دهید."""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        answer = self.chat_completion(messages, temperature=0.3)
        
        return {
            "answer": answer,
            "sources": sources,
            "query": query
        }


# نمونه سراسری
openai_client = OpenAIClient()
