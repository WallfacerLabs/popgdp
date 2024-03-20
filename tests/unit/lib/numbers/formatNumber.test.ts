import { describe, expect, test } from "vitest";

import { formatNumber } from "@/lib/numbers";

describe("utils/formatNumber", () => {
  test("should format number", () => {
    expect(formatNumber(100)).toBe("100");
  });

  test("should format negative number", () => {
    expect(formatNumber(-100)).toBe("-100");
  });

  test("should format zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  test("should format large number", () => {
    expect(formatNumber(1000000)).toBe("1M");
  });

  test("should format small number", () => {
    expect(formatNumber(0.0001234, { maximumFractionDigits: 6 })).toBe(
      "0.000123",
    );
  });

  test("extends decimal places with minimumFractionDigits param", () => {
    expect(formatNumber(100, { minimumFractionDigits: 2 })).toBe("100.00");
  });

  test("trims decimal places with maximumFractionDigits param", () => {
    expect(formatNumber(100.123, { maximumFractionDigits: 2 })).toBe("100.12");
  });

  test("should format number with default config", () => {
    const result = formatNumber(1234.5678);
    expect(result).toBe("1.23K");
  });

  test("should format number with custom maximumFractionDigits", () => {
    const result = formatNumber(1234.5678, { maximumFractionDigits: 3 });
    expect(result).toBe("1.234K");
  });

  test("should format number with custom minimumFractionDigits", () => {
    const result = formatNumber(1234, { minimumFractionDigits: 3 });
    expect(result).toBe("1.234K");
  });

  test("should format number with both custom maximumFractionDigits and minimumFractionDigits", () => {
    const result = formatNumber(1234.5, {
      maximumFractionDigits: 3,
      minimumFractionDigits: 2,
    });
    expect(result).toBe("1.234K");
  });

  test("should format number with zero fraction digits", () => {
    const result = formatNumber(1234.5678, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    expect(result).toBe("1K");
  });
});
