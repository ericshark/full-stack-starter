from datetime import UTC, datetime

from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel


class ItemBase(SQLModel):
    """Base fields shared across database and API schemas."""

    title: str = Field(min_length=1, max_length=100, index=True)
    description: str | None = Field(default=None, max_length=255)


class Item(ItemBase, table=True):
    """Database table model representing an Item."""

    __tablename__ = "items"

    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )
