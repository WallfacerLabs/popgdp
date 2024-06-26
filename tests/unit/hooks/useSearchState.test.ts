import { describe, expect, test, vi } from "vitest";

import { useSearchState } from "@/hooks/useSearchState";

let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: (url: string) => {
        const [pathname, search] = url.split("?");
        mockSearchParams = new URLSearchParams(search);
      },
    })),
    useSearchParams: vi.fn(() => mockSearchParams),
    usePathname: vi.fn(() => "/"),
  };
});

describe("hooks/useSearchState", () => {
  test("returns correct default search params", () => {
    const { searchParams } = useSearchState();
    expect(searchParams.toString()).toBe("");
  });

  test("updates single search param correctly", () => {
    const { updateSearchParams } = useSearchState();
    updateSearchParams(["testParam", "test"]);
    const { searchParams } = useSearchState();
    expect(searchParams.get("testParam")).toBe("test");
  });

  test("updates multiple search params correctly", () => {
    const { updateSearchParams } = useSearchState();
    updateSearchParams(
      ["firstParam", "firstValue"],
      ["secondParam", "secondValue"],
    );
    const { searchParams } = useSearchState();
    expect(searchParams.get("firstParam")).toBe("firstValue");
    expect(searchParams.get("secondParam")).toBe("secondValue");
  });
});
