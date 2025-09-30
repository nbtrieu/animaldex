from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database import get_db
from app.models.models import Animal, ConservationStatus
from app.schemas.animal import AnimalCreate, AnimalResponse, AnimalSummary

router = APIRouter()

@router.get("/", response_model=List[AnimalSummary])
async def get_animals(
    skip: int = Query(0, ge=0, description="Number of animals to skip"),
    limit: int = Query(20, ge=1, le=100, description="Number of animals to return"),
    search: Optional[str] = Query(None, description="Search animals by name"),
    conservation_status: Optional[ConservationStatus] = Query(None, description="Filter by conservation status"),
    db: Session = Depends(get_db)
):
    """Get a list of animals with optional filtering"""
    
    query = db.query(Animal)
    
    if search:
        query = query.filter(
            (Animal.name.ilike(f"%{search}%")) |
            (Animal.scientific_name.ilike(f"%{search}%"))
        )
    
    if conservation_status:
        query = query.filter(Animal.conservation_status == conservation_status)
    
    animals = query.offset(skip).limit(limit).all()
    return animals

@router.get("/random", response_model=AnimalResponse)
async def get_random_animal(db: Session = Depends(get_db)):
    """Get a random animal for 'Animal of the Day' feature"""
    
    animal = db.query(Animal).order_by(func.random()).first()
    
    if not animal:
        raise HTTPException(status_code=404, detail="No animals found")
    
    return animal

@router.get("/{animal_id}", response_model=AnimalResponse)
async def get_animal(animal_id: int, db: Session = Depends(get_db)):
    """Get detailed information about a specific animal"""
    
    animal = db.query(Animal).filter(Animal.id == animal_id).first()
    
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")
    
    return animal

@router.get("/{animal_id}/facts", response_model=List[str])
async def get_animal_facts(animal_id: int, db: Session = Depends(get_db)):
    """Get fun facts about a specific animal"""
    
    animal = db.query(Animal).filter(Animal.id == animal_id).first()
    
    if not animal:
        raise HTTPException(status_code=404, detail="Animal not found")
    
    return animal.fun_facts or []

@router.post("/", response_model=AnimalResponse)
async def create_animal(
    animal: AnimalCreate,
    db: Session = Depends(get_db)
):
    """Create a new animal"""
    
    existing = db.query(Animal).filter(
        Animal.scientific_name == animal.scientific_name
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=400, 
            detail="Animal with this scientific name already exists"
        )
    
    db_animal = Animal(**animal.dict())
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    
    return db_animal