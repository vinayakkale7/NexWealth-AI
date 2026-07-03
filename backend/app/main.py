from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.session import engine, Base

# Import all models to ensure they are registered with SQLAlchemy Base before create_all
# from app.models import user, family, holding, goal

# For dev without Alembic (creates tables if they don't exist)
# In production, use Alembic migrations instead of this.
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.PROJECT_NAME}

# API Routers will be included here
from app.api.endpoints import auth, dashboard, portfolio, goals, family
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(portfolio.router, prefix="/api/v1/portfolio", tags=["Portfolio"])
app.include_router(goals.router, prefix="/api/v1/goals", tags=["Goals"])
app.include_router(family.router, prefix="/api/v1/family", tags=["Family"])

