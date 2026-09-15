from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Health check payload indicating application and database status."""

    status: str
    database: str
    environment: str
