from fastapi import FastAPI

app = FastAPI(title="AnimalDex API")

@app.get("/")
def read_root():
    return {"message": "AnimalDex API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}