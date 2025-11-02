"""
موتور RAG برای پردازش جست‌وجو و تولید پاسخ
"""
from typing import List, Dict, Any, Optional
import re
from hazm import Normalizer, word_tokenize
from db.vector_store import vector_store
from core.openai_client import openai_client
from core.firecrawl_client import firecrawl_client


class RAGEngine:
    """موتور RAG برای پردازش سوالات فارسی"""
    
    def __init__(self):
        self.normalizer = Normalizer()
        self.vector_store = vector_store
        self.openai_client = openai_client
        self.firecrawl_client = firecrawl_client
    
    def normalize_text(self, text: str) -> str:
        """نرمال‌سازی متن فارسی"""
        # حذف کاراکترهای اضافی
        text = re.sub(r'\s+', ' ', text)
        text = self.normalizer.normalize(text)
        return text.strip()
    
    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """تقسیم متن به تکه‌های کوچکتر"""
        words = word_tokenize(text)
        chunks = []
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = ' '.join(words[i:i + chunk_size])
            if chunk:
                chunks.append(chunk)
        
        return chunks
    
    def process_query(
        self,
        query: str,
        use_web_search: bool = False,
        top_k: int = 5
    ) -> Dict[str, Any]:
        """
        پردازش پرسش و تولید پاسخ
        
        Pipeline:
        1. نرمال‌سازی پرسش
        2. جست‌وجوی معنایی در Vector Store
        3. در صورت نیاز، جست‌وجو در وب
        4. تولید پاسخ با RAG
        """
        
        # 1. نرمال‌سازی پرسش
        normalized_query = self.normalize_text(query)
        print(f"🔍 پردازش پرسش: {normalized_query}")
        
        # 2. جست‌وجوی معنایی
        search_results = self.vector_store.search(
            query=normalized_query,
            top_k=top_k,
            score_threshold=0.5
        )
        
        print(f"📚 تعداد نتایج یافت‌شده: {len(search_results)}")
        
        # 3. اگر نتیجه کافی نبود و جست‌وجوی وب فعال باشد
        if len(search_results) < 2 and use_web_search:
            print("🌐 جست‌وجو در وب...")
            web_results = self.search_web(normalized_query)
            
            # افزودن نتایج وب به Vector Store
            if web_results:
                texts = [r['content'] for r in web_results]
                metadatas = [{'url': r['url'], 'title': r['title']} for r in web_results]
                self.vector_store.add_documents(texts, metadatas)
                
                # جست‌وجوی مجدد
                search_results = self.vector_store.search(
                    query=normalized_query,
                    top_k=top_k,
                    score_threshold=0.3
                )
        
        # 4. تولید پاسخ
        if not search_results:
            return {
                "answer": "متأسفانه اطلاعاتی برای پاسخ به این سؤال یافت نشد. لطفاً سؤال دیگری بپرسید یا ابتدا URLهای مرتبط را اضافه کنید.",
                "sources": [],
                "query": query,
                "search_results": []
            }
        
        # آماده‌سازی context و منابع
        context = "\n\n".join([
            f"متن {i+1}:\n{result['text'][:1000]}"
            for i, result in enumerate(search_results)
        ])
        
        sources = []
        for result in search_results:
            metadata = result.get('metadata', {})
            source = metadata.get('url', '') or metadata.get('title', 'منبع ناشناس')
            if source and source not in sources:
                sources.append(source)
        
        # تولید پاسخ با OpenAI
        rag_response = self.openai_client.generate_rag_response(
            query=normalized_query,
            context=context,
            sources=sources
        )
        
        return {
            **rag_response,
            "search_results": search_results[:3]  # فقط 3 نتیجه برتر
        }
    
    def search_web(self, query: str, max_results: int = 3) -> List[Dict[str, Any]]:
        """جست‌وجو در وب با Firecrawl"""
        return self.firecrawl_client.search_web(query, max_results)
    
    def ingest_url(self, url: str) -> Dict[str, Any]:
        """افزودن URL به پایگاه داده"""
        print(f"📥 در حال دریافت محتوای: {url}")
        
        # استخراج محتوا با Firecrawl
        scraped_data = self.firecrawl_client.scrape_url(url)
        
        if not scraped_data:
            return {
                "success": False,
                "message": "خطا در دریافت محتوای URL"
            }
        
        # نرمال‌سازی و تقسیم محتوا
        content = scraped_data.get('content', '')
        normalized_content = self.normalize_text(content)
        chunks = self.chunk_text(normalized_content)
        
        print(f"📝 تعداد تکه‌های ایجادشده: {len(chunks)}")
        
        # افزودن به Vector Store
        metadatas = [{
            'url': url,
            'title': scraped_data.get('title', ''),
            'chunk_index': i
        } for i in range(len(chunks))]
        
        self.vector_store.add_documents(chunks, metadatas)
        
        return {
            "success": True,
            "message": f"✅ {len(chunks)} تکه از محتوا با موفقیت اضافه شد",
            "url": url,
            "title": scraped_data.get('title', ''),
            "chunks_count": len(chunks)
        }


# نمونه سراسری
rag_engine = RAGEngine()
