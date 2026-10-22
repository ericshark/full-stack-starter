# Full-Stack Deployment Guide

This guide describes how to deploy the full-stack application (FastAPI backend, PostgreSQL database, and Next.js frontend).

## Architecture Overview

```
                      Internet
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
┌────────────────────┐      ┌────────────────────┐
│ Next.js Frontend   │ ───► │ FastAPI Backend    │
│ (Vercel / Node)    │      │ (Docker / Cloud)   │
└────────────────────┘      └─────────┬──────────┘
                                      │
                                      ▼
                            ┌────────────────────┐
                            │ PostgreSQL (DB)    │
                            └────────────────────┘
```

## Production Environment Variables

### Backend

- `DATABASE_URL`: `postgresql+asyncpg://<user>:<password>@<db-host>:5432/<dbname>`
- `ENVIRONMENT`: `production`
- `CORS_ORIGINS`: JSON array of allowed origins (e.g. `["https://app.yourdomain.com"]`)

### Frontend

- `NEXT_PUBLIC_API_URL`: Base URL of the backend API (e.g. `https://api.yourdomain.com`)

## Dockerfiles Are Development-Only

`backend/Dockerfile` and `frontend/Dockerfile` are built for local development with `docker compose`: the backend runs `uvicorn --reload` and the frontend runs `next dev`. Do not deploy them as-is. Production images need:

- **Backend**: `uvicorn app.main:app --host 0.0.0.0 --port 8000` without `--reload`, with the source copied into the image instead of bind-mounted.
- **Frontend**: `npm run build` followed by `npm run start` (or Next.js `output: "standalone"`). `NEXT_PUBLIC_API_URL` is inlined at build time, so pass it as a build argument for each environment.

## Deployment Models

### 1. Unified Container Platform (Render, Railway, Fly.io, or AWS ECS)

- Deploy PostgreSQL managed instance.
- Deploy a production backend image with `DATABASE_URL` pointed to managed DB.
- Run database migrations during release:
  ```bash
  uv run alembic upgrade head
  ```
- Deploy a production frontend image built with `NEXT_PUBLIC_API_URL` set to the backend URL.

### 2. Split Hosting (Frontend on Vercel + Backend on Container Host)

- **Frontend**: Connect `frontend/` directory to Vercel. Set `NEXT_PUBLIC_API_URL`.
- **Backend**: Deploy `backend/` container to Fly.io, Railway, or AWS.
- Ensure backend `CORS_ORIGINS` includes the Vercel production and preview domains.
