.PHONY: help setup dev docker-init docker-first-run test lint typecheck codegen check db-migrate db-seed clean

help:
	@echo "Agent & Developer Command Cheatsheet:"
	@echo "  make setup            - One-step setup: .env, dependencies (uv + npm), and codegen"
	@echo "  make docker-init      - First-time Docker setup: build, wait for DB, migrate, and seed"
	@echo "  make check            - Run all linters, typecheckers, and tests across both stacks"
	@echo "  make codegen          - Export OpenAPI schema from FastAPI and generate TypeScript types"
	@echo "  make test             - Run backend (pytest) and frontend (vitest) test suites"
	@echo "  make lint             - Run backend (ruff) and frontend (eslint) linters"
	@echo "  make typecheck        - Run backend (mypy) and frontend (tsc) static type analysis"
	@echo "  make dev              - Launch development environment using Docker Compose"
	@echo "  make db-migrate       - Apply Alembic migrations to database"
	@echo "  make db-seed          - Seed database with demo items"
	@echo "  make clean            - Clean temporary build artifacts and test caches"

setup:
	@echo "==> Setting up environment files..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✓ Created .env from .env.example"; \
	else \
		echo "✓ .env already exists"; \
	fi
	@echo "==> Installing backend dependencies with uv..."
	cd backend && uv sync
	@echo "==> Installing frontend dependencies with npm..."
	cd frontend && npm install
	@echo "==> Generating initial OpenAPI spec and TypeScript definitions..."
	$(MAKE) codegen
	@echo ""
	@echo "=========================================================="
	@echo "✓ Project setup complete!"
	@echo "  • Run with Docker (first time): make docker-init"
	@echo "  • Or run full verification checks: make check"
	@echo "=========================================================="

dev:
	docker compose up --build

docker-init:
	@echo "==> Ensuring .env exists..."
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✓ Created .env from .env.example"; \
	fi
	@echo "==> Building and starting Docker containers..."
	docker compose up -d --build
	@echo "==> Waiting for database to become healthy..."
	@until docker compose exec -T db pg_isready > /dev/null 2>&1; do \
		sleep 1; \
	done
	@echo "✓ Database is healthy!"
	@echo "==> Running database migrations in backend container..."
	docker compose exec -T backend uv run alembic upgrade head
	@echo "==> Seeding database with initial items..."
	docker compose exec -T backend uv run python -m app.scripts.seed
	@echo ""
	@echo "=========================================================="
	@echo "✓ Docker stack is up and initialized!"
	@echo "  • Frontend:   http://localhost:3000"
	@echo "  • API Docs:   http://localhost:8000/api/v1/docs"
	@echo "  • API Health: http://localhost:8000/api/v1/health"
	@echo ""
	@echo "To view live logs:    docker compose logs -f"
	@echo "To stop containers:   docker compose down"
	@echo "=========================================================="

docker-first-run: docker-init

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
