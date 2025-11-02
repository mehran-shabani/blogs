"""
??????? ??????? ???? ????? ????? ? Embeddings
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from datetime import datetime
from api.config import settings

Base = declarative_base()


class Document(Base):
    """??? ??? ???? ????? ?????? ?????????"""
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(500), unique=True, index=True)
    title = Column(String(500))
    content = Column(Text)
    summary = Column(Text, nullable=True)
    metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class DocumentChunk(Base):
    """??? ??????? ??? ???? ????? Embeddings"""
    __tablename__ = "document_chunks"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, index=True)
    chunk_text = Column(Text)
    chunk_index = Column(Integer)
    embedding_vector = Column(JSON, nullable=True)  # ?? ???? ??? ??????? ?? Qdrant
    created_at = Column(DateTime, default=datetime.utcnow)


class SearchHistory(Base):
    """??????? ?????????"""
    __tablename__ = "search_history"
    
    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(500))
    response = Column(Text)
    sources = Column(JSON)
    search_type = Column(String(50))  # semantic, web, hybrid
    created_at = Column(DateTime, default=datetime.utcnow)


# ????? ????? ???????
def get_engine():
    """?????? ????? SQLAlchemy"""
    return create_engine(settings.vector_db_url)


def init_db():
    """???????? ????? ???????"""
    engine = get_engine()
    Base.metadata.create_all(bind=engine)
    print("? ??????? ?? ?????? ????? ??")


if __name__ == "__main__":
    init_db()
