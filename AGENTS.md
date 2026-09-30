# Agent Guidelines

## Commands

Use the `Makefile` from the repository root as the primary command interface:

- `make check` — Run all verification checks (Ruff, ESLint, Mypy, TypeScript, Pytest, Vitest). Run before completing tasks.
- `make codegen` — Export OpenAPI schema from FastAPI and generate TypeScript definitions
- `make dev` — Start the full-stack development environment
- `make test` — Run backend (Pytest) and frontend (Vitest) test suites
- `make lint` — Run backend (Ruff) and frontend (ESLint) linters
- `make typecheck` — Run backend (Mypy) and frontend (TypeScript) type checks
- `make setup` — Initial setup (.env, dependencies, codegen)

## Architecture & Code Style

- **Structure**:
  - `backend/app/api/` — Versioned FastAPI routes
  - `backend/app/models/` — SQLModel database tables
  - `backend/app/schemas/` — Pydantic request and response schemas
  - `backend/alembic/` — Database migrations
  - `backend/tests/` — Pytest test suite
  - `frontend/src/app/` — Next.js App Router pages and layouts
  - `frontend/src/components/` — Application components
  - `frontend/src/lib/` — Shared utilities (`cn` in `@/lib/utils`, typed client in `@/lib/api`)
  - `frontend/tests/` — Vitest unit and component tests
- **Full-Stack Contracts**: When changing an API route, model, or schema, run `make codegen` and use the typed client in `frontend/src/lib/api.ts` rather than untyped fetch calls.
- **Styling**: Tailwind CSS v4. Use `cn(...)` from `@/lib/utils` for conditional class merging.
- **Testing**: Test observable behavior. Add or update tests when changing behavior, and never bypass tests.
- **Documentation**: Update `docs/architecture/` when changing architecture, data flow, or core design patterns.

## Skills

Reusable procedures are stored in `.agents/skills/`.

When a task matches an existing skill, follow that skill rather than recreating the procedure here.
