import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_api_v1_health(client: AsyncClient) -> None:
    """Verify that /api/v1/health returns ok status and connected database."""
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["database"] == "connected"


@pytest.mark.asyncio
async def test_root_health_redirect(client: AsyncClient) -> None:
    """Verify that /health fallback works."""
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
