# Testing Strategy

This repository employs a comprehensive testing strategy across both Python (backend) and TypeScript (frontend).

## Verification Command

Run all verification checks across both stacks in one step:

```bash
make check
```

Or test individually:
- `make test`: Runs Pytest (backend) and Vitest (frontend)
- `make lint`: Runs Ruff (backend) and ESLint (frontend)
- `make typecheck`: Runs Mypy (backend) and TypeScript (frontend)

## Backend Testing (Pytest)

- Located in `backend/tests/`.
- Uses `pytest-asyncio` with an in-memory/SQLite async test engine configured in `backend/tests/conftest.py`.
- Tests endpoints via `httpx.AsyncClient` verifying status codes, response schemas, and database persistence.
- Never write tests that mutate development databases; rely on fixture isolation.

## Frontend Testing (Vitest + Testing Library)

- Located in `frontend/tests/`.
- Uses Vitest with React Testing Library and `jsdom`.
- Focuses on user-observable UI behavior, accessibility roles, and handling async data states (loading, error, success).
