# System Architecture Overview

This project is a modern full-stack web application designed for developer agility and AI-agent compatibility. It couples a **Next.js (App Router)** frontend with a **FastAPI** backend and **PostgreSQL 17** persistence.

## System Topology & Ports

| Service | Technology | Port (Host:Container) | Primary Function |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS v4 | `3000:3000` | UI, Server Components, client state |
| **Backend** | FastAPI 0.115+ / Python 3.12+ / uv | `8000:8000` | REST API, OpenAPI docs (`/docs`), business logic |
| **Database** | PostgreSQL 17 (Official image) | `5432:5432` | Relational data store |

## Data Flow & API Boundary

```
[Browser / Client]
       |
       | HTTP / JSON (Typed via openapi-fetch)
       v
[Next.js Server & Client Components]
       |
       | REST requests (`NEXT_PUBLIC_API_URL`)
       v
[FastAPI Backend Router (/api/v1)]
       |
       | SQLModel (Async Engine via asyncpg)
       v
[PostgreSQL Database (port 5432)]
```

## Environment Configuration

Configuration is managed via `.env` at the root of the project:
- `DATABASE_URL`: PostgreSQL connection string with `postgresql+asyncpg://` protocol
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Credentials for the database container
- `NEXT_PUBLIC_API_URL`: Exposed to the frontend client for API calls (default `http://localhost:8000`)
