# Full-Stack Starter

A Next.js 16 + FastAPI + PostgreSQL starter with typed OpenAPI client generation and unified development commands.

## Quick start

Prerequisites: Node.js 20+, Python 3.12+, [`uv`](https://docs.astral.sh/uv/), Docker Compose, and `make`.

```bash
make setup
make docker-init
```

Frontend: [http://localhost:3000](http://localhost:3000)

API docs: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)

Use `make dev` for subsequent development.

## Structure

```text
backend/           FastAPI app, models, schemas, migrations, and tests
frontend/          Next.js app, typed API client, components, and tests
docs/architecture/ Architecture notes
docker-compose.yml Local services
Makefile           Common commands
```

## Commands

| Command | Purpose |
| --- | --- |
| `make setup` | Install dependencies, create `.env`, and generate API types |
| `make docker-init` | Build services, migrate the database, and seed demo data |
| `make dev` | Start the development stack |
| `make check` | Run linting, type checking, and tests |
| `make test` | Run backend and frontend tests |
| `make codegen` | Regenerate TypeScript API types from OpenAPI |
| `make db-migrate` | Apply database migrations |
| `make db-seed` | Seed demo data |
| `make clean` | Remove generated build and cache artifacts |

When backend models, schemas, or routes change, run `make codegen`. Frontend API calls should use `frontend/src/lib/api.ts` rather than handwritten response interfaces.

## Agent instructions

Read [`AGENTS.md`](./AGENTS.md) before making changes. Check the relevant note in [`docs/architecture/`](./docs/architecture/) before changing a subsystem, and run `make check` before completing non-trivial work.

## License

MIT
