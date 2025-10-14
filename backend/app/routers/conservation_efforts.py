from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.models import ConservationEffort
from app.schemas.conservation_effort import ConservationEffortSummary

router = APIRouter()

@router.get("/", response_model=List[ConservationEffortSummary])
async def get_conservation_efforts(
    db: Session = Depends(get_db)
):
    """Get a list of conservation efforts"""

    conservation_efforts = db.query(ConservationEffort).all()
    return conservation_efforts
