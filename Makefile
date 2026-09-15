.PHONY: help dev test lint typecheck codegen check db-migrate db-seed clean

help:
	@echo "Agent & Developer Command Cheatsheet:"
	@echo "  make check      - Run all linters, typecheckers, and tests across both stacks"
	@echo "  make codegen    - Export OpenAPI schema from FastAPI and generate TypeScript types"
	@echo "  make test       - Run backend (pytest) and frontend (vitest) test suites"
	@echo "  make lint       - Run backend (ruff) and frontend (eslint) linters"
	@echo "  make typecheck  - Run backend (mypy) and frontend (tsc) static type analysis"
	@echo "  make dev        - Launch development environment using Docker Compose"
	@echo "  make db-migrate - Apply Alembic migrations to database"
	@echo "  make db-seed    - Seed database with demo items"
	@echo "  make clean      - Clean temporary build artifacts and test caches"

dev:
	docker compose up --build

codegen:
	cd backend && uv run python -m app.scripts.export_openapi
	cd frontend && npm run codegen

lint:
	cd backend && uv run ruff check .
	cd frontend && npm run lint

typecheck:
	cd backend && uv run mypy app
	cd frontend && npm run typecheck

test:
	cd backend && uv run pytest
	cd frontend && npm run test

check: lint typecheck test
	@echo ""
	@echo "==========================================="
	@echo "✓ All full-stack verification checks passed!"
	@echo "==========================================="

db-migrate:
	cd backend && uv run alembic upgrade head

db-seed:
	cd backend && uv run python -m app.scripts.seed

clean:
	rm -rf backend/.pytest_cache backend/.ruff_cache backend/.mypy_cache
	rm -rf frontend/.next frontend/node_modules/.cache
