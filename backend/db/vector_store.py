"""
Vector Store ???? ????? ? ???????? Embeddings ?? Qdrant
"""
from typing import List, Dict, Any, Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from sentence_transformers import SentenceTransformer
import hashlib
from api.config import settings


class VectorStore:
    """???? Vector Store ???? ?????? Embeddings"""
    
    def __init__(self):
        self.collection_name = settings.qdrant_collection_name
        self.embedding_model = SentenceTransformer(settings.embedding_model)
        self.embedding_dim = self.embedding_model.get_sentence_embedding_dimension()
        
        # ????? ?? Qdrant (???? in-memory ???? MVP)
        self.client = QdrantClient(":memory:")  # ?? ?? settings.qdrant_url ??????? ????
        
        # ????? ?????? ?? ???? ??? ????
        self._init_collection()
    
    def _init_collection(self):
        """????? ?????? ?? ???? ??? ????"""
        try:
            self.client.get_collection(self.collection_name)
            print(f"? ?????? {self.collection_name} ?? ??? ????? ???")
        except:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=self.embedding_dim,
                    distance=Distance.COSINE
                )
            )
            print(f"? ?????? {self.collection_name} ????? ??")
    
    def _generate_id(self, text: str) -> str:
        """????? ID ???? ???? ???"""
        return hashlib.md5(text.encode()).hexdigest()
    
    def add_documents(
        self,
        texts: List[str],
        metadatas: Optional[List[Dict[str, Any]]] = None
    ) -> List[str]:
        """?????? ????? ?? Vector Store"""
        
        if metadatas is None:
            metadatas = [{}] * len(texts)
        
        # ????? Embeddings
        embeddings = self.embedding_model.encode(texts, show_progress_bar=True)
        
        # ????? IDs
        ids = [self._generate_id(text) for text in texts]
        
        # ????? Points
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
        
        # ?????? ?? Qdrant
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        
        print(f"? {len(texts)} ??? ?? Vector Store ????? ??")
        return ids
    
    def search(
        self,
        query: str,
        top_k: int = 5,
        score_threshold: float = 0.5
    ) -> List[Dict[str, Any]]:
        """???????? ?????? ?? Vector Store"""
        
        # ????? Embedding ???? query
        query_embedding = self.embedding_model.encode([query])[0]
        
        # ??????? ?? Qdrant
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding.tolist(),
            limit=top_k,
            score_threshold=score_threshold
        )
        
        # ????? ?????
        documents = []
        for result in results:
            documents.append({
                "text": result.payload.get("text", ""),
                "score": result.score,
                "metadata": {k: v for k, v in result.payload.items() if k != "text"}
            })
        
        return documents
    
    def delete_collection(self):
        """??? ??????"""
        self.client.delete_collection(self.collection_name)
        print(f"? ?????? {self.collection_name} ??? ??")


# ????? ??????
vector_store = VectorStore()
