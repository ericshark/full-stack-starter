import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("px-2 py-1", "bg-white")).toBe("px-2 py-1 bg-white");
  });

  it("handles conditional classes", () => {
    expect(cn("px-2", false && "py-1", true && "text-sm")).toBe("px-2 text-sm");
  });

  it("resolves Tailwind conflicts cleanly", () => {
    expect(cn("px-2 py-1", "p-4")).toBe("p-4");
  });
});
