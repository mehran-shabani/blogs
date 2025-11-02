"""
??????? ? ???????? API
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """??????? ???? ??????"""
    
    # OpenAI Configuration
    openai_api_key: str = "sk-xxxx"
    openai_base_url: str = "https://api.gapgpt.app/v1"
    openai_model: str = "gpt-4o-mini"
    
    # Firecrawl Configuration
    firecrawl_api_key: Optional[str] = None
    
    # Database Configuration
    vector_db_url: str = "sqlite:///db.sqlite3"
    
    # Qdrant Configuration
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: Optional[str] = None
    qdrant_collection_name: str = "persian_documents"
    
    # Embedding Configuration
    embedding_model: str = "sentence-transformers/paraphrase-multilingual-mpnet-base-v2"
    chunk_size: int = 500
    chunk_overlap: int = 50
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# ??????? ??????
settings = Settings()


def update_openai_config(api_key: str, base_url: str):
    """??????????? ??????? OpenAI"""
    settings.openai_api_key = api_key
    settings.openai_base_url = base_url
