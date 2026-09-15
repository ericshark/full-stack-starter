from datetime import datetime

from sqlmodel import SQLModel

from app.models.item import ItemBase


class ItemCreate(ItemBase):
    """Payload schema for creating a new item."""

    pass


class ItemUpdate(SQLModel):
    """Payload schema for updating an existing item."""

    title: str | None = None
    description: str | None = None


class ItemRead(ItemBase):
    """Response schema representing an item."""

    id: int
    created_at: datetime
