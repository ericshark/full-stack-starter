---
name: add-api-endpoint
description: Step-by-step runbook for adding a new FastAPI endpoint, generating schemas, updating tests, exporting OpenAPI, and generating TypeScript types for Next.js.
---

# Skill: Add API Endpoint & Sync Types

Use this runbook whenever adding a new feature or endpoint to the backend that needs to be consumed by the frontend.

## Step 1: Define Model & Schemas
1. If persisting data, create or update the SQLModel in `backend/app/models/<resource>.py`.
   Make sure it inherits from `SQLModel` with `table=True`.
2. Define request/response DTO schemas in `backend/app/schemas/<resource>.py`:
   - `<Resource>Create`: Request body for creation
   - `<Resource>Update`: Request body for updates
   - `<Resource>Read`: Response model returning serialized data

## Step 2: Implement Endpoint Router
1. Create `backend/app/api/v1/endpoints/<resource>.py`.
2. Inject the async database session:
   ```python
   from fastapi import APIRouter, Depends, HTTPException, status
   from sqlmodel.ext.asyncio.session import AsyncSession
   from app.core.db import get_db

   router = APIRouter()
   ```
3. Register the new router in `backend/app/api/v1/api.py`:
   ```python
   api_router.include_router(<resource>.router, prefix="/<resources>", tags=["<resources>"])
   ```

## Step 3: Write Backend Tests
1. Add an async test in `backend/tests/test_<resource>.py`.
2. Verify all operations with pytest:
   ```bash
   cd backend && uv run pytest tests/test_<resource>.py
   ```

## Step 4: Run OpenAPI Codegen
Export the schema and generate frontend TypeScript definitions:
```bash
make codegen
```
Verify that `frontend/src/lib/types/api.d.ts` has been updated with the new endpoint paths and types.

## Step 5: Consume in Next.js Frontend
Import the typed client and call the endpoint:
```typescript
import { api } from "@/lib/api";

// GET request
const { data, error } = await api.GET("/api/v1/<resources>");

// POST request
const { data, error } = await api.POST("/api/v1/<resources>", {
  body: { ... },
});
```
TypeScript will automatically validate path names, parameters, request body schemas, and response types.

## Step 6: Verify
Run repository verification:
```bash
make check
```
