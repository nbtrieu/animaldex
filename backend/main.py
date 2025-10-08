from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.routers import animals, habitats

from app.database import engine
from app.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AnimalDex API",
    description="Educational wildlife platform API for ecosystem learning and conservation action",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "https://animaldex.vercel.app",  # Production frontend
        "https://*.vercel.app"  # Any Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(animals.router, prefix="/api/animals", tags=["Animals"])
app.include_router(habitats.router, prefix="/api/habitats", tags=["Habitats"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to AnimalDex API!",
        "version": "1.0.0",
        "docs": "/docs",
        "features": [
            "Animal Discovery",
            "Ecosystem Interactions (MS-LS2-2)",
            "Conservation Action Center (MS-LS2-5)",
            "Educational Progress Tracking"
        ]
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "AnimalDex API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)