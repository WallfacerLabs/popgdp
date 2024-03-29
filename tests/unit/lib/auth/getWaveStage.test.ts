import { afterEach, describe, expect, test, vi } from "vitest";

import { getWaveStage } from "@/lib/auth";

const initialDate = new Date("2022-01-01 00:00:00");

function createDate(days: number) {
  return new Date(initialDate.getTime() + days * 24 * 60 * 60 * 1000);
}

describe("lib/auth/getWaveStage", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("should return notOpen when current date is before start date", () => {
    vi.useFakeTimers({ now: initialDate });

    const stage = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(stage).toBe("notOpen");
  });

  test("should return open when current date is after start date", () => {
    vi.useFakeTimers({ now: createDate(2) });

    const stage = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(stage).toBe("open");
  });

  test("should return denoising when current date is after denoising start date", () => {
    vi.useFakeTimers({ now: createDate(3) });

    const stage = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(stage).toBe("denoising");
  });

  test("should return assesment when current date is after assesment start date", () => {
    vi.useFakeTimers({ now: createDate(4) });

    const stage = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(stage).toBe("assesment");
  });

  test("should return closed when current date is after close date", () => {
    vi.useFakeTimers({ now: createDate(5) });

    const stage = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(stage).toBe("closed");
  });
});
