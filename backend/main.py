from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from .database import engine, Base
from .routes.auth_routes import router as auth_router

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Duoling API",
    description="Backend API for the gamified learning platform",
    version="1.0.0",
)

# CORS — allow mobile app to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Duoling API!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


# Handler for AWS Lambda
handler = Mangum(app)
