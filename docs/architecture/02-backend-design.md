# Backend Architecture & Database Design

The backend is built with **FastAPI** on Python 3.12, managed with **uv**. It uses an async SQLModel data layer on top of PostgreSQL.

## Directory Layout

```
backend/
├── pyproject.toml              # Dependencies and tool configurations
├── alembic.ini                 # Migration config
├── alembic/                    # Migration scripts & env runner
└── app/
    ├── main.py                 # FastAPI application factory, CORS, router mounting
    ├── core/
    │   ├── config.py           # Pydantic BaseSettings (validated environment variables)
    │   └── db.py               # Async engine, sessionmaker, and get_db dependency
    ├── models/                 # Database tables defined with SQLModel(table=True)
    ├── schemas/                # Request/Response validation DTOs
    ├── api/v1/
    │   ├── api.py              # Aggregator for v1 routers
    │   └── endpoints/          # Route handlers (health, items, etc.)
    └── scripts/
        ├── export_openapi.py   # Headless OpenAPI export for frontend codegen
        └── seed.py             # Database seeder
```

## Layered Design Guidelines

1. **`app/models/`**:
   - Entities represent database tables.
   - Use `SQLModel` with `table=True`.
   - Fields should specify database column constraints (`primary_key=True`, `index=True`, etc.).

2. **`app/schemas/`**:
   - Request and response schemas ensure API contracts are explicit and decoupled from DB internals.
   - Typical schema sets include `<Entity>Create`, `<Entity>Update`, and `<Entity>Read`.

3. **`app/api/v1/endpoints/`**:
   - Handlers receive request parameters, execute business logic or queries using `AsyncSession`, and return typed Pydantic responses.
   - Handlers must be `async def`.
   - Use `db: AsyncSession = Depends(get_db)` to acquire an isolated database session.

4. **Database Migrations (Alembic)**:
   - All migrations are tracked in `backend/alembic/versions/`.
   - `backend/alembic/env.py` automatically imports `SQLModel.metadata` so autogenerate detects all entity changes.
