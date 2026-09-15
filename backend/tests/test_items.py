import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_and_list_items(client: AsyncClient) -> None:
    """Test creating an item and listing it."""
    # 1. Initially empty
    list_res = await client.get("/api/v1/items")
    assert list_res.status_code == 200
    assert list_res.json() == []

    # 2. Create item
    payload = {"title": "Test Task", "description": "Agentic full-stack verification"}
    create_res = await client.post("/api/v1/items", json=payload)
    assert create_res.status_code == 201
    created = create_res.json()
    assert created["id"] is not None
    assert created["title"] == "Test Task"
    assert created["description"] == "Agentic full-stack verification"

    # 3. Retrieve by ID
    get_res = await client.get(f"/api/v1/items/{created['id']}")
    assert get_res.status_code == 200
    assert get_res.json()["title"] == "Test Task"

    # 4. List items includes new item
    list_after = await client.get("/api/v1/items")
    assert len(list_after.json()) == 1


@pytest.mark.asyncio
async def test_delete_item(client: AsyncClient) -> None:
    """Test deleting an item."""
    create_res = await client.post(
        "/api/v1/items",
        json={"title": "Item to Delete"},
    )
    item_id = create_res.json()["id"]

    # Delete
    del_res = await client.delete(f"/api/v1/items/{item_id}")
    assert del_res.status_code == 204

    # Verify 404
    get_res = await client.get(f"/api/v1/items/{item_id}")
    assert get_res.status_code == 404


@pytest.mark.asyncio
async def test_get_nonexistent_item(client: AsyncClient) -> None:
    """Test 404 behavior for nonexistent items."""
    get_res = await client.get("/api/v1/items/99999")
    assert get_res.status_code == 404
