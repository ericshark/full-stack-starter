import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HealthCard } from "@/components/HealthCard";

// Mock the openapi-fetch API client
vi.mock("@/lib/api", () => ({
  api: {
    GET: vi.fn().mockResolvedValue({
      data: {
        status: "ok",
        database: "connected",
        environment: "test",
      },
      error: null,
    }),
  },
}));

describe("HealthCard", () => {
  it("renders the system connectivity header", async () => {
    await act(async () => {
      render(<HealthCard />);
    });

    expect(screen.getByText("System Connectivity")).toBeDefined();
    expect(screen.getByText("FastAPI Backend")).toBeDefined();
    expect(screen.getByText("PostgreSQL 17")).toBeDefined();
  });
});
