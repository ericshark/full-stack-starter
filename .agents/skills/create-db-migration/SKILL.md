---
name: create-db-migration
description: Guide for creating, testing, and applying database migrations using Alembic and SQLModel with asyncpg.
---

# Skill: Database Migration Workflow

Use this skill whenever modifying existing SQLModel entities or introducing new tables in `backend/app/models/`.

## Prerequisites
- Docker Compose PostgreSQL container is running (`docker compose up -d db`), or a local database is available at the `DATABASE_URL`.
- Ensure all models are imported into `backend/alembic/env.py` so Alembic can detect metadata changes.

## Step 1: Generate Migration
Run Alembic autogenerate from the backend directory:
```bash
cd backend
uv run alembic revision --autogenerate -m "describe_changes"
```

## Step 2: Inspect Generated Migration
Open the newly created migration file in `backend/alembic/versions/`:
- Verify `upgrade()` contains the expected `op.create_table`, `op.add_column`, etc.
- Verify `downgrade()` reverses the changes cleanly without data loss risks.

## Step 3: Test Apply & Rollback
Verify that both upgrade and downgrade run without error:
```bash
cd backend
# Apply migration
uv run alembic upgrade head

# Rollback 1 step
uv run alembic downgrade -1

# Re-apply to head
uv run alembic upgrade head
```

## Step 4: Validate Models in Tests
Run the backend test suite to ensure the database layer behaves correctly:
```bash
cd backend
uv run pytest
```
