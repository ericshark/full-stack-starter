# Frontend Architecture Design

The frontend is built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

## Directory Layout

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router layout and pages
│   │   ├── layout.tsx          # Root HTML layout and providers
│   │   ├── page.tsx            # Main dashboard
│   │   └── globals.css         # Tailwind v4 styles
│   ├── components/             # Reusable UI and feature components
│   │   ├── HealthCard.tsx      # System health indicator
│   │   └── ItemsManager.tsx    # Interactive CRUD demo
│   └── lib/
│       ├── env.ts              # Runtime environment variable validation
│       ├── api.ts              # Typed openapi-fetch client
│       └── types/
│           ├── openapi.json    # Exported OpenAPI schema
│           └── api.d.ts        # Generated TypeScript definitions
├── tests/                      # Vitest unit and component tests
└── vitest.config.ts            # Vitest configuration
```

## API Consumption Model

- **Typed Client**: We use `openapi-fetch` imported from `@/lib/api`.
- **Compile-time Safety**: URLs, query parameters, request bodies, and responses are completely type-checked against `src/lib/types/api.d.ts`.
- **Works in Both Contexts**:
  - **Server Components / Route Handlers**: Fetch directly during SSR or server actions.
  - **Client Components**: Fetch inside `useEffect` or event handlers with native promise handling.
