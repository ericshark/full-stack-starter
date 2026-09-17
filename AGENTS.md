# Agent Guidelines

This file defines the shared instructions for coding agents working in this repository.

## Project

Full-stack application using:

- Next.js 16 and React 19
- TypeScript and Tailwind CSS v4
- FastAPI and Python 3.12+
- SQLModel, Pydantic, and Alembic
- PostgreSQL
- Vitest, Testing Library, Pytest, Ruff, and Mypy

Important locations:

- `backend/app/api/` — versioned API routes
- `backend/app/models/` — SQLModel database tables
- `backend/app/schemas/` — API request and response schemas
- `backend/app/core/` — settings, security, and database configuration
- `backend/alembic/` — database migrations
- `backend/tests/` — backend tests
- `frontend/src/app/` — App Router routes and layouts
- `frontend/src/components/` — application components
- `frontend/src/lib/` — shared utilities and typed API client
- `frontend/tests/` — frontend tests
- `docs/` — architecture and subsystem documentation

## Commands

Use the Makefile from the repository root as the primary command interface.

- `make setup` — install dependencies, create `.env`, and generate API types
- `make dev` — start the development stack
- `make docker-init` — initialize Docker services, migrations, and seed data
- `make codegen` — regenerate TypeScript types from the backend OpenAPI schema
- `make lint` — run Ruff and ESLint
- `make typecheck` — run Mypy and TypeScript checks
- `make test` — run Pytest and Vitest
- `make check` — run linting, type checking, and tests
- `make db-migrate` — apply pending database migrations
- `make db-seed` — seed demo data

For focused work, use `uv run <tool>` from `backend/` and `npm run <script>` from `frontend/`.

### API and database changes

When changing a FastAPI route, model, or schema, run `make codegen` and use the typed client in `frontend/src/lib/api.ts` rather than handwritten API interfaces or untyped fetch calls.

When changing a database model, create and inspect an Alembic migration before running `make db-migrate`. Keep database models, API schemas, and route responsibilities in their respective directories.

### Frontend components

Reuse existing components and UI primitives before creating new ones. Use the existing `cn(...)` utility for conditional Tailwind class composition.

### Testing

Add or update tests when introducing or changing meaningful behavior. Test observable behavior rather than implementation details. Do not weaken, remove, or bypass tests merely to make verification pass.

## Documentation

Use `docs/` for persistent architectural and subsystem knowledge. Before modifying a subsystem, check for relevant documentation there. When a change materially alters architecture, data flow, public APIs, important invariants, setup, or behavior that future developers or agents need to understand, update the relevant existing documentation. Create a new document only for a substantial new subsystem or concept that does not fit existing documentation. Do not document trivial implementation changes, routine bug fixes, or information already obvious from the code.

## Change tracking

After a non-trivial change (new feature, bug fix, schema change,
or a real design decision — not renames, formatting, or refactors
with no behavior change), append one line to docs/CHANGES.md:

date — summary — files — status — follow-up (if any)

Trivial changes: skip silently, no log, no comment.
