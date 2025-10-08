from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.models import Habitat
from app.schemas.habitat import HabitatSummary

router = APIRouter()

@router.get("/", response_model=List[HabitatSummary])
async def get_habitats(
    db: Session = Depends(get_db)
):
    """Get a list of habitats"""

    habitats = db.query(Habitat).all()
    return habitats
    