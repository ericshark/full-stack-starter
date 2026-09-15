# 🚀 Agentic Full-Stack Template: Next.js 16 + FastAPI + PostgreSQL

An opinionated, production-grade starter template purpose-built for **AI coding agents** (Antigravity, Claude Code, Cursor, Copilot, Devin) and **modern developers**.

This template pairs a **Next.js 16 (App Router)** frontend with a **FastAPI (Python 3.12)** backend and **PostgreSQL 17** persistence, bound together by an **automated compile-time OpenAPI type contract** and **deterministic quality gates**.

---

## 🌟 Why "Agentic"?

Most templates are designed for humans who can tolerate ambiguity and fix manual wiring issues on the fly. 

An **Agentic Template** is engineered so that autonomous AI coding assistants can navigate the codebase, understand architectural boundaries, add full-stack features, and self-verify their work with **zero hallucinations** and **zero contract drift**:

| Agent Challenge | How This Template Solves It |
| :--- | :--- |
| **API Contract Drift** | `make codegen` exports FastAPI's schema headlessly and generates 100% strict TypeScript types for `openapi-fetch`. Agents cannot accidentally mismatch endpoint names, query params, or body payloads. |
| **Dual Schema Duplication** | Uses **SQLModel** (by the author of FastAPI) to define SQLAlchemy 2.0 database tables and Pydantic v2 schemas in a single class definition. |
| **Ambiguous Conventions** | Authoritative [`AGENTS.md`](./AGENTS.md) and [`docs/architecture/`](./docs/architecture/) define exact layering, coding rules, and file patterns. |
| **Multi-Tool Command Guesswork** | A universal [`Makefile`](./Makefile) provides single-command workflows (`make check`, `make codegen`, `make test`, `make migrate`, `make seed`). |
| **Multi-Step Procedures** | Step-by-step runbooks in [`.agents/skills/`](./.agents/skills/) guide agents through adding endpoints, writing migrations, and debugging checks. |

---

## 📐 Architecture & Topology

```
+-----------------------------------------------------------------------------------+
|                                 AGENT STEERING                                    |
|   AGENTS.md | CLAUDE.md | docs/architecture/ | .agents/skills/ (runbooks)         |
+-----------------------------------------+-----------------------------------------+
                                          |
        +---------------------------------+---------------------------------+
        |                                                                   |
        v                                                                   v
+-------------------------------+                         +-------------------------------+
|     BACKEND (FastAPI + uv)    |                         |     FRONTEND (Next.js 16)     |
| - SQLModel (SQLAlchemy 2.0)   |    make codegen         | - App Router + React 19       |
| - Asyncpg + Alembic Migrations| ======================> | - openapi-fetch (Type-safe)   |
| - Pydantic Settings & Env     |   (openapi.json -> TS)  | - Tailwind CSS v4             |
| - Layered Modular Architecture|                         | - Vitest + Testing Library    |
| - Ruff + Mypy + Pytest        |                         | - Live Health & CRUD UI       |
+-------------------------------+                         +-------------------------------+
        |                                                                   |
        +---------------------------------+---------------------------------+
                                          |
                                          v
                  +-----------------------------------------------+
                  |                   DATABASE                    |
                  | - PostgreSQL 17 (Containerized or Local)      |
                  +-----------------------------------------------+
```

### Port Mapping & Services

| Service | Technology | Port (Host:Container) | Function |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS v4 | `3000:3000` | UI, Server Components, client state |
| **Backend** | FastAPI 0.115+ / Python 3.12+ / uv | `8000:8000` | REST API, OpenAPI docs (`/api/v1/docs`) |
| **Database** | PostgreSQL 17 | `5432:5432` | Relational database storage |

---

## 🗂 Project Structure

```
.
├── Makefile                     # Root command orchestration (check, test, codegen, etc.)
├── AGENTS.md                    # Primary AI agent instructions & conventions
├── CLAUDE.md                    # Claude Code instructions pointer
├── docker-compose.yml           # Multi-container orchestration (DB, API, Frontend)
├── .env.example                 # Documented environment variables
├── .github/
│   └── workflows/ci.yml         # GitHub Actions pipeline running make check
├── .agents/
│   └── skills/                  # Specialized agent runbooks
│       ├── add-api-endpoint/    # 6-step endpoint & frontend type sync guide
│       ├── create-db-migration/ # Alembic migration workflow
│       └── full-check/          # Guide for resolving verification failures
├── docs/
│   └── architecture/            # In-depth architectural specifications
│       ├── 01-overview.md       # System topology & ports
│       ├── 02-backend-design.md # FastAPI layered design & DB patterns
│       ├── 03-frontend-design.md# Next.js App Router & client patterns
│       └── 04-api-contracts.md  # Codegen pipeline documentation
├── backend/
│   ├── pyproject.toml           # Python dependencies, Ruff, Mypy, Pytest configs
│   ├── alembic.ini              # Alembic migration configuration
│   ├── alembic/                 # Database migrations (asyncpg + SQLModel)
│   ├── app/
│   │   ├── main.py              # FastAPI application, CORS, lifespan, router mounting
│   │   ├── core/                # Settings (pydantic-settings), DB engine & session
│   │   ├── models/              # SQLModel database tables (e.g. Item)
│   │   ├── schemas/             # Pydantic request/response DTOs
│   │   ├── api/v1/              # Versioned API routes (/health, /items)
│   │   └── scripts/             # export_openapi.py, seed.py
│   └── tests/                   # Pytest suite with async in-memory SQLite fixtures
└── frontend/
    ├── package.json             # Scripts: dev, build, lint, typecheck, codegen, test
    ├── vitest.config.ts         # Vitest test runner configuration
    ├── src/
    │   ├── app/                 # Next.js App Router (layout.tsx, page.tsx, globals.css)
    │   ├── components/          # Reusable UI components (HealthCard, ItemsManager)
    │   └── lib/                 # Typed API client (api.ts), env validation, generated types
    └── tests/                   # Vitest component & unit tests
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: v20+ (Node 24 recommended) & `npm`
- **Python**: 3.12+ & [`uv`](https://docs.astral.sh/uv/)
- **Docker & Docker Compose**: For containerized database and services
- **Make**: Standard build tool

### 1. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

### 2. Install Dependencies & Generate Types
```bash
# Install backend dependencies
cd backend && uv sync && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..

# Generate initial OpenAPI TypeScript types
make codegen
```

### 3. Run the Stack

#### Option A: Docker Compose (All-in-One)
```bash
make dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API Docs: [http://localhost:8000/api/v1/docs](http://localhost:8000/api/v1/docs)
- PostgreSQL: `localhost:5432`

#### Option B: Local Standalone Development
1. Start PostgreSQL:
   ```bash
   docker compose up -d db
   ```
2. Apply database migrations:
   ```bash
   make db-migrate
   ```
3. (Optional) Seed demo data:
   ```bash
   make db-seed
   ```
4. In terminal 1, start the FastAPI backend:
   ```bash
   cd backend && uv run uvicorn app.main:app --reload --port 8000
   ```
5. In terminal 2, start the Next.js frontend:
   ```bash
   cd frontend && npm run dev
   ```

---

## 🛠 Command Cheatsheet (`Makefile`)

All key tasks are unified at the repository root:

| Command | Description |
| :--- | :--- |
| `make check` | **Runs the entire verification suite** (Ruff, ESLint, Mypy, TypeScript, Pytest, Vitest) |
| `make codegen` | Headlessly exports `openapi.json` from FastAPI and generates `api.d.ts` in Next.js |
| `make test` | Runs backend tests (`pytest`) and frontend tests (`vitest`) |
| `make lint` | Runs backend linter (`ruff check`) and frontend linter (`eslint`) |
| `make typecheck` | Runs backend static typecheck (`mypy`) and frontend typecheck (`tsc --noEmit`) |
| `make db-migrate` | Applies pending Alembic migrations (`alembic upgrade head`) |
| `make db-seed` | Populates the database with initial demo records |
| `make dev` | Starts all services via Docker Compose with hot reloading |
| `make clean` | Removes build artifacts, `.next`, and cache directories |

---

## 🔄 End-to-End Type Safety (`make codegen`)

Never write manual TypeScript interfaces for your backend APIs:

```
[FastAPI Python Code] 
        │
        ▼
[backend/app/scripts/export_openapi.py] ──> frontend/src/lib/types/openapi.json
                                                           │
                                                           ▼
[openapi-typescript] ─────────────────────> frontend/src/lib/types/api.d.ts
                                                           │
                                                           ▼
                                      [frontend/src/lib/api.ts (openapi-fetch)]
```

### Consuming the API in Next.js

Import the typed `api` instance anywhere in Next.js (Server or Client components):

```typescript
import { api } from "@/lib/api";

// 100% typed GET request
const { data, error } = await api.GET("/api/v1/items", {
  params: {
    query: { skip: 0, limit: 10 },
  },
});

// 100% typed POST request (payload validated at compile time)
const { data: newItem, error: createError } = await api.POST("/api/v1/items", {
  body: {
    title: "Ship new feature",
    description: "Built autonomously with AI agents",
  },
});
```

---

## 🤖 AI Agent Workflow & Runbooks

Coding agents operate under the instructions specified in [`AGENTS.md`](./AGENTS.md). 

Three built-in agent skills are located in `.agents/skills/`:
1. **[`add-api-endpoint`](./.agents/skills/add-api-endpoint/SKILL.md)**: 
   How to add a SQLModel entity, Pydantic schemas, route handler, pytest test, run `make codegen`, and consume the endpoint in Next.js.
2. **[`create-db-migration`](./.agents/skills/create-db-migration/SKILL.md)**: 
   How to generate (`alembic revision --autogenerate`), inspect, test rollback, and apply database migrations.
3. **[`full-check`](./.agents/skills/full-check/SKILL.md)**: 
   How to interpret and resolve failures across all 6 linters and typecheckers.

---

## 🧪 Testing & Verification

Run the entire suite in seconds:
```bash
make check
```

- **Backend Unit & Integration Tests**: Pytest with `pytest-asyncio` using in-memory SQLite (`aiosqlite`) for zero-dependency test runs.
- **Frontend Component Tests**: Vitest + `@testing-library/react` + `jsdom`.
- **Static Analysis**: Mypy (strict Python typing) + TypeScript (`tsc --noEmit`).
- **Linters**: Ruff (fast Python linting) + ESLint 9 (Next.js + React 19 rules).

---

## 📜 License

MIT License. Free to use as a starting template for personal, open-source, or commercial projects.
