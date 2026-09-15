# End-to-End API Contracts & Codegen

Maintaining full type safety across Python (FastAPI) and TypeScript (Next.js) prevents the most common class of full-stack bugs: field mismatches, missing properties, and invalid endpoints.

## The Codegen Pipeline

```
[FastAPI Python Code]
   │
   ▼
[app.scripts.export_openapi] ──> Generates frontend/src/lib/types/openapi.json
                                                    │
                                                    ▼
[openapi-typescript] ──────────> Generates frontend/src/lib/types/api.d.ts
                                                    │
                                                    ▼
                                 [openapi-fetch in frontend/src/lib/api.ts]
```

## Running Codegen

To update contracts after any change to backend routes or schemas:
```bash
make codegen
```

This single command:
1. Executes `uv run python -m app.scripts.export_openapi` inside `backend`.
2. Executes `npx openapi-typescript` inside `frontend`.
3. Produces fresh TypeScript type definitions in `src/lib/types/api.d.ts`.
