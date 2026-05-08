from fastapi import FastAPI
from mangum import Mangum

app = FastAPI(
    title="Duoling API",
    description="Backend API for the gamified learning platform",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Duoling API!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Handler for AWS Lambda
handler = Mangum(app)
