import { afterEach, describe, expect, test, vi } from "vitest";

import { getWaveStage } from "@/config/waveStages";
import { addDays } from "@/lib/dates";

const initialDate = new Date("2022-01-01 00:00:00");

function createDate(days: number) {
  return addDays(initialDate, days);
}

describe("config/waveStages", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("should return notOpen when current date is before start date", () => {
    vi.useFakeTimers({ now: initialDate });

    const { waveStage, nextStageDate } = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(waveStage).toBe("notOpen");
    expect(nextStageDate).toStrictEqual(createDate(1));
  });

  test("should return open when current date is after start date", () => {
    vi.useFakeTimers({ now: createDate(2) });

    const { waveStage, nextStageDate } = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(waveStage).toBe("open");
    expect(nextStageDate).toStrictEqual(createDate(2));
  });

  test("should return denoising when current date is after denoising start date", () => {
    vi.useFakeTimers({ now: createDate(3) });

    const { waveStage, nextStageDate } = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(waveStage).toBe("denoising");
    expect(nextStageDate).toStrictEqual(createDate(3));
  });

  test("should return assesment when current date is after assesment start date", () => {
    vi.useFakeTimers({ now: createDate(4) });

    const { waveStage, nextStageDate } = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(waveStage).toBe("assesment");
    expect(nextStageDate).toStrictEqual(createDate(4));
  });

  test("should return closed when current date is after close date", () => {
    vi.useFakeTimers({ now: createDate(5) });

    const { waveStage, nextStageDate } = getWaveStage({
      openStartDate: createDate(1),
      denoisingStartDate: createDate(2),
      assesmentStartDate: createDate(3),
      closeDate: createDate(4),
    });

    expect(waveStage).toBe("close");
    expect(nextStageDate).toBeUndefined();
  });
});
