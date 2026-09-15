import createClient from "openapi-fetch";
import type { paths } from "./types/api";
import { env } from "./env";

/**
 * Type-safe API client generated from FastAPI OpenAPI specifications.
 * All paths, request parameters, bodies, and response types are strictly validated at compile time.
 */
export const api = createClient<paths>({
  baseUrl: env.NEXT_PUBLIC_API_URL,
});
