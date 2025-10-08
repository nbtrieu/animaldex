from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class HabitatBase(BaseModel):
    name: str
    description: str = None
    climate: str = None
    geography: str = None
    key_characteristics: List[str] = []

class HabitatResponse(HabitatBase):
    id: int
    image_url: str = None
    last_updated: datetime

    class Config:
        from_attributes = True

class HabitatSummary(BaseModel):
    id: int
    name: str
    description: str = None
    climate: str = None
    key_characteristics: List[str] = []
    image_url: Optional[str] = None
    
    class Config:
        from_attributes = True