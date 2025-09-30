from pydantic import BaseModel
from typing import Optional

class HealthResponse(BaseModel):
    status: str
    message: str

class MessageResponse(BaseModel):
    message: str
    
class PaginationQuery(BaseModel):
    skip: int = 0
    limit: int = 20
    
class SearchQuery(PaginationQuery):
    search: Optional[str] = None