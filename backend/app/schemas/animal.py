from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.models.models import ConservationStatus

class AnimalBase(BaseModel):
    name: str
    scientific_name: str
    common_names: List[str] = []
    conservation_status: Optional[ConservationStatus] = None
    description: Optional[str] = None
    fun_facts: List[str] = []
    diet: Optional[str] = None
    lifespan: Optional[str] = None

class AnimalCreate(AnimalBase):
    pass

class AnimalUpdate(BaseModel):
    name: Optional[str] = None
    scientific_name: Optional[str] = None
    common_names: Optional[List[str]] = None
    conservation_status: Optional[ConservationStatus] = None
    description: Optional[str] = None
    fun_facts: Optional[List[str]] = None
    diet: Optional[str] = None
    lifespan: Optional[str] = None

class AnimalResponse(AnimalBase):
    id: int
    image_urls: List[str] = []
    video_urls: List[str] = []
    audio_urls: List[str] = []
    last_updated: datetime
    
    class Config:
        from_attributes = True

class AnimalSummary(BaseModel):
    id: int
    name: str
    scientific_name: str
    conservation_status: Optional[ConservationStatus] = None
    image_urls: List[str] = []
    diet: Optional[str] = None
    
    class Config:
        from_attributes = True