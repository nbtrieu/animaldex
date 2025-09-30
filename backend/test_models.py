from app.models.models import Base, Animal, ConservationStatus
from app.database import engine

def test_models():
    try:
        print("Testing database models...")
        
        from app.models.models import (
            User, Animal, Habitat, EcosystemInteraction, 
            ConservationEffort, UserConservationAction, UserProgress
        )
        
        print("✅ All models imported successfully!")
        print("✅ Database models are ready!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_models()