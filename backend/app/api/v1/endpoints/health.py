from fastapi import APIRouter, Depends
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.core.db import get_db
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def check_health(db: AsyncSession = Depends(get_db)) -> HealthResponse:
    """Check API and database health status."""
    try:
        # Ping the database to verify active connection
        await db.exec(select(1))
        db_status = "connected"
    except Exception as exc:
        db_status = f"unreachable ({type(exc).__name__})"

    return HealthResponse(
        status="ok",
        database=db_status,
        environment=settings.ENVIRONMENT,
    )
