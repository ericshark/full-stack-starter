# Agent & Developer Guidelines: Next.js + FastAPI Full-Stack Template

Welcome to the Next.js + FastAPI Agentic Full-Stack Template. This document is the primary steering guide for AI coding agents (and human developers) working in this repository. Follow these instructions strictly to maintain architectural integrity, end-to-end type safety, and fast automated feedback loops.

---

## 1. System Topology & Monorepo Structure

```
.
├── Makefile                     # Universal command interface for agents & devs
├── docker-compose.yml           # PostgreSQL 17, FastAPI backend, Next.js frontend
├── docs/architecture/           # High-signal architecture specifications
├── .agents/skills/              # Reusable agent runbooks (add endpoint, migrations, check)
├── backend/                     # Python 3.12+ FastAPI backend (managed with uv)
│   ├── pyproject.toml           # Dependencies, tool configs (ruff, mypy, pytest)
│   ├── alembic/                 # Database migrations (async SQLAlchemy/SQLModel)
│   ├── app/
│   │   ├── core/                # Settings (pydantic-settings), DB session & engine
│   │   ├── models/              # SQLModel database tables
│   │   ├── schemas/             # Pydantic request/response validation schemas
│   │   ├── api/v1/              # Versioned API routes
│   │   └── scripts/             # OpenAPI export, seed scripts
│   └── tests/                   # Pytest test suite (unit + async API integration)
└── frontend/                    # Next.js 16 (App Router) + React 19 + Tailwind v4 (npm)
    ├── package.json             # Scripts: dev, build, lint, typecheck, test, codegen
    ├── src/
    │   ├── app/                 # App Router pages and layouts
    │   ├── components/          # Reusable UI & feature components
    │   └── lib/                 # Typed API client (`openapi-fetch`), env validation
    └── tests/                   # Vitest component & unit tests
```

---

## 2. Universal Command Cheatsheet

Always prefer running commands via `make` from the repository root:

| Task | Command | Description |
| :--- | :--- | :--- |
| **One-Step Setup** | `make setup` | Installs dependencies (uv + npm), creates `.env`, runs codegen |
| **First-Time Docker** | `make docker-init` | Builds containers, waits for DB, runs migrations & seeds |
| **Verify All** | `make check` | Runs linting, type-checking, and tests for both stacks |
| **Type Sync** | `make codegen` | Exports OpenAPI schema from FastAPI & generates TypeScript definitions |
| **Run Tests** | `make test` | Executes `backend` pytest and `frontend` vitest |
| **Lint Code** | `make lint` | Runs `ruff check` (Python) and `eslint` (TypeScript) |
| **Type Check** | `make typecheck`| Runs `mypy` (Python) and `tsc --noEmit` (TypeScript) |
| **Apply DB Migrations** | `make db-migrate` | Runs `alembic upgrade head` |
| **Seed DB** | `make db-seed` | Seeds database with demo records |
| **Dev Environment** | `make dev` | Starts Docker Compose (Postgres, backend, frontend) |

If executing inside subdirectories directly:
- **Backend**: `cd backend && uv run <tool>` (e.g., `uv run pytest`, `uv run ruff check .`, `uv run mypy app`)
- **Frontend**: `cd frontend && npm run <script>` (e.g., `npm run test`, `npm run typecheck`, `npm run lint`)

---

## 3. Golden Rules for AI Agents

1. **End-to-End Type Safety (Zero Drift)**:
   - When modifying or adding any FastAPI router, model, or schema, **always run `make codegen`**.
   - Never write loose `fetch("/api/...")` calls or manual TypeScript interfaces for API responses. Use the typed `api` client imported from `@/lib/api`.

2. **Single-Source Data Models with SQLModel**:
   - Define database tables using `SQLModel` with `table=True` in `app/models/`.
   - Define API input/output DTOs using Pydantic / SQLModel schemas in `app/schemas/`.
   - Never use un-annotated types or raw dictionaries in API endpoints.

3. **Database Migrations are Mandatory**:
   - Never modify a model without generating an Alembic migration:
     `cd backend && uv run alembic revision --autogenerate -m "<descriptive_message>"`
   - Always verify the generated migration script in `backend/alembic/versions/` and test `make db-migrate`.

4. **Deterministic Pre-Completion Verification**:
   - Before completing any task or claiming work is done, run `make check`.
   - Ensure `ruff check`, `mypy`, `pytest`, `eslint`, `tsc --noEmit`, and `vitest` all pass with zero errors.

5. **Layered Separation of Concerns**:
   - `app/api/v1/endpoints/`: Routing, HTTP status codes, dependency injection.
   - `app/models/`: Database schema definitions.
   - `app/schemas/`: API contracts, request payloads, response serialization.
   - `app/core/`: Configuration, security, database connectivity.

---

## 4. Progressive Context & Skills

For step-by-step procedures, refer to the specialized agent skills in `.agents/skills/`:
- **`add-api-endpoint`**: Runbook for creating a FastAPI endpoint, testing it, syncing types, and consuming it on the frontend.
- **`create-db-migration`**: Runbook for creating, inspecting, and running Alembic database migrations.
- **`full-check`**: Diagnostic guide for diagnosing and fixing lint, type, or test failures.

## Change tracking

After a non-trivial change (new feature, bug fix, schema change,
or a real design decision — not renames, formatting, or refactors
with no behavior change), append one line to docs/CHANGES.md:

date — summary — files — status — follow-up (if any)

Trivial changes: skip silently, no log, no comment.
