"""
Vector Store برای ذخیره و جست‌وجوی Embeddings با Qdrant
"""
from typing import List, Dict, Any, Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from sentence_transformers import SentenceTransformer
import hashlib
from api.config import settings


class VectorStore:
    """کلاس Vector Store برای مدیریت Embeddings"""
    
    def __init__(self):
        self.collection_name = settings.qdrant_collection_name
        self.embedding_model = SentenceTransformer(settings.embedding_model)
        self.embedding_dim = self.embedding_model.get_sentence_embedding_dimension()
        
        # اتصال به Qdrant (حالت in-memory برای MVP)
        self.client = QdrantClient(":memory:")  # یا از settings.qdrant_url استفاده کنید
        
        # ایجاد کالکشن در صورت عدم وجود
        self._init_collection()
    
    def _init_collection(self):
        """ایجاد کالکشن در صورت عدم وجود"""
        try:
            self.client.get_collection(self.collection_name)
            print(f"✅ کالکشن {self.collection_name} از قبل موجود است")
        except:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=self.embedding_dim,
                    distance=Distance.COSINE
                )
            )
            print(f"✅ کالکشن {self.collection_name} ایجاد شد")
    
    def _generate_id(self, text: str) -> str:
        """تولید ID یکتا برای متن"""
        return hashlib.md5(text.encode()).hexdigest()
    
    def add_documents(
        self,
        texts: List[str],
        metadatas: Optional[List[Dict[str, Any]]] = None
    ) -> List[str]:
        """افزودن اسناد به Vector Store"""
        
        if metadatas is None:
            metadatas = [{}] * len(texts)
        
        # تولید Embeddings
        embeddings = self.embedding_model.encode(texts, show_progress_bar=True)
        
        # تولید IDs
        ids = [self._generate_id(text) for text in texts]
        
        # ایجاد Points
        points = []
        for i, (text, embedding, metadata) in enumerate(zip(texts, embeddings, metadatas)):
            point = PointStruct(
                id=ids[i],
                vector=embedding.tolist(),
                payload={
                    "text": text,
                    **metadata
                }
            )
            points.append(point)
        
        # افزودن به Qdrant
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        
        print(f"✅ {len(texts)} سند به Vector Store اضافه شد")
        return ids
    
    def search(
        self,
        query: str,
        top_k: int = 5,
        score_threshold: float = 0.5
    ) -> List[Dict[str, Any]]:
        """جست‌وجوی معنایی در Vector Store"""
        
        # تولید Embedding برای query
        query_embedding = self.embedding_model.encode([query])[0]
        
        # جست‌وجو در Qdrant
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding.tolist(),
            limit=top_k,
            score_threshold=score_threshold
        )
        
        # تبدیل نتایج
        documents = []
        for result in results:
            documents.append({
                "text": result.payload.get("text", ""),
                "score": result.score,
                "metadata": {k: v for k, v in result.payload.items() if k != "text"}
            })
        
        return documents
    
    def delete_collection(self):
        """حذف کالکشن"""
        self.client.delete_collection(self.collection_name)
        print(f"✅ کالکشن {self.collection_name} حذف شد")


# نمونه سراسری
vector_store = VectorStore()
