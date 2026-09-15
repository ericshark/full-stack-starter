import asyncio

from sqlmodel import select

from app.core.db import async_session_maker
from app.models.item import Item

DEMO_ITEMS = [
    {
        "title": "Welcome to the Agentic Template",
        "description": (
            "This is a pre-seeded item demonstrating end-to-end full-stack integration."
        ),
    },
    {
        "title": "Autonomous Type Sync",
        "description": (
            "FastAPI OpenAPI specs generate TypeScript definitions for Next.js "
            "automatically."
        ),
    },
    {
        "title": "PostgreSQL & SQLModel",
        "description": "Async ORM models powered by SQLAlchemy 2.0 and Pydantic v2.",
    },
]


async def seed() -> None:
    """Seed the database with initial demo records if table is empty."""
    async with async_session_maker() as session:
        result = await session.execute(select(Item).limit(1))
        existing = result.scalars().first()
        
        if existing:
            print("Database already contains items. Skipping seed.")
            return

        print("Seeding database with demo items...")
        for item_data in DEMO_ITEMS:
            item = Item(**item_data)
            session.add(item)

        await session.commit()
        print("✓ Seeding complete!")


if __name__ == "__main__":
    asyncio.run(seed())
