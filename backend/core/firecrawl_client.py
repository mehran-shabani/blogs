"""
?????? Firecrawl ???? ????? ????? ?? ?????
"""
import requests
from typing import Dict, List, Optional, Any
from api.config import settings


class FirecrawlClient:
    """?????? Firecrawl ???? ??????? ?????? ??"""
    
    def __init__(self):
        self.api_key = settings.firecrawl_api_key
        self.base_url = "https://api.firecrawl.dev/v1"
    
    def scrape_url(self, url: str) -> Optional[Dict[str, Any]]:
        """??????? ?????? ?? URL"""
        
        if not self.api_key:
            print("Firecrawl API key not configured")
            return None
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "url": url,
            "formats": ["markdown", "html"],
            "onlyMainContent": True
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/scrape",
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "url": url,
                    "title": data.get("data", {}).get("metadata", {}).get("title", ""),
                    "content": data.get("data", {}).get("markdown", ""),
                    "html": data.get("data", {}).get("html", ""),
                    "metadata": data.get("data", {}).get("metadata", {})
                }
            else:
                print(f"??? ?? Firecrawl: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"??? ?? ????? ?? Firecrawl: {e}")
            return None
    
    def crawl_website(
        self,
        url: str,
        max_pages: int = 10,
        include_paths: Optional[List[str]] = None
    ) -> List[Dict[str, Any]]:
        """????? ????? ???? ?? ?? ???????"""
        
        if not self.api_key:
            print("Firecrawl API key not configured")
            return []
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "url": url,
            "limit": max_pages,
            "scrapeOptions": {
                "formats": ["markdown"],
                "onlyMainContent": True
            }
        }
        
        if include_paths:
            payload["includePaths"] = include_paths
        
        try:
            # ???? ?????
            response = requests.post(
                f"{self.base_url}/crawl",
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                crawl_id = data.get("id")
                
                # ?????? ????? ?????
                status_response = requests.get(
                    f"{self.base_url}/crawl/{crawl_id}",
                    headers=headers,
                    timeout=60
                )
                
                if status_response.status_code == 200:
                    results = status_response.json()
                    return results.get("data", [])
            
            return []
            
        except Exception as e:
            print(f"??? ?? ?????: {e}")
            return []
    
    def search_web(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        """??????? ?? ?? ? ??????? ?????"""
        
        # ???? MVP? ?? Google Search API ?? ???? ????? ??????? ???????
        # ??? ?? ?????????? ???? ???
        
        # ?? ???? ?????? ??????? ?? ?????????? ????? SerpAPI ??????? ???
        search_results = []
        
        # ???? ????? ?? ?? ???? URL ??? ??????? ??????? ???????
        default_persian_sites = [
            f"https://fa.wikipedia.org/wiki/{query}",
            f"https://www.google.com/search?q={query}+site:ir",
        ]
        
        for url in default_persian_sites[:max_results]:
            result = self.scrape_url(url)
            if result:
                search_results.append(result)
        
        return search_results


# ????? ??????
firecrawl_client = FirecrawlClient()
