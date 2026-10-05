# Contributing Guidelines

Thank you for contributing! Follow these procedures to keep the full-stack codebase clean, consistent, and maintainable.

## Development Workflow

1. **Branch Naming**:
   Use structured branch names following `<type>/<name>`:
   - `feat/items-crud`
   - `fix/db-connection-pool`
   - `docs/api-contracts`
   - `refactor/alembic-models`

2. **Worktrees**:
   If using git worktrees, place them in `../<project>-worktrees/<name>`.

3. **Package Managers**:
   - Python Backend: Use `uv` by default.
   - Node Frontend: Use `npm` by default.

4. **API Contracts**:
   Whenever backend endpoints, models, or Pydantic schemas change, always regenerate the frontend OpenAPI types:
   ```bash
   make codegen
   ```

## Verification Checklist

Before committing or completing a task, run the full verification suite across both stacks:

```bash
make check
```

This runs:
- Backend: Ruff lint, Mypy typecheck, Pytest suite
- Frontend: ESLint, TypeScript typecheck, Vitest suite

## Commit Messages

Use clear, imperative commit messages:
- `feat: add items search endpoint and UI filter`
- `fix: handle database connection timeout gracefully`
- `docs: update deployment architecture guide`
