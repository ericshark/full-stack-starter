---
name: full-check
description: Runbook for running full repository verification, interpreting failures, and achieving clean checks.
---

# Skill: Full Repository Verification

Use this skill before ending an agent turn or submitting a pull request to ensure that no regressions have been introduced in either the Python or TypeScript workspaces.

## Standard Check Command
From the root directory:
```bash
make check
```

This runs the following 6 verification steps in sequence:
1. `backend ruff`: Linting and formatting checks (`backend/app`, `backend/tests`)
2. `frontend eslint`: Next.js & React ESLint rules
3. `backend mypy`: Static type analysis of FastAPI backend (`backend/app`)
4. `frontend tsc`: TypeScript type-checking without emitting code (`tsc --noEmit`)
5. `backend pytest`: Async and unit test suite
6. `frontend vitest`: Component and unit test suite

---

## Common Failures & How to Fix

### 1. `backend mypy` Type Errors
- **Missing type annotations**: Add explicit function argument and return type annotations.
- **Async generator type**: `get_db` should return `AsyncGenerator[AsyncSession, None]`.
- **Optional fields**: Ensure `None` checks are present before accessing attributes on optional models.

### 2. `frontend tsc` Type Errors
- **Missing OpenAPI types**: Run `make codegen` to refresh `src/lib/types/api.d.ts`.
- **Incorrect fetch parameters**: `openapi-fetch` checks path parameters and bodies strictly. Make sure `params.path` and `body` match schema requirements.

### 3. `pytest` Failures
- **In-memory SQLite vs PostgreSQL**: Test fixtures use `aiosqlite` in memory. If tests fail due to missing tables, ensure `SQLModel.metadata.create_all` is invoked in `conftest.py`.

### 4. `ruff` Lint Failures
- Run `cd backend && uv run ruff check --fix .` to auto-fix import ordering and standard stylistic issues.
- Run `cd backend && uv run ruff format .` to auto-format code.
