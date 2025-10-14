from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ConservationEffortBase(BaseModel):
    title: str
    description: str = None
    organization_name: str = None
    website_url: str = None
    location: str = None
    conservation_problem: str = None
    current_status: str = None
    petition_url: Optional[str] = None
    volunteer_url: Optional[str] = None
    donation_url: Optional[str] = None

class ConservationEffortResponse(ConservationEffortBase):
    id: int
    image_url: str = None
    last_updated: datetime

    class Config:
        from_attributes = True

class ConservationEffortSummary(ConservationEffortBase):
    id: int
    image_url: str = None
    
    class Config:
        from_attributes = True
