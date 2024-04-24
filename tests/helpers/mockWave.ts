import { WaveData } from "@/app/waves/create/stepsProvider";

export const MOCK_WAVE_DATA: Omit<WaveData, "categories"> = {
  name: "Wave",
  summary: "Summary",
  openStartDate: new Date(),
  denoisingStartDate: new Date(),
  assesmentStartDate: new Date(),
  closeDate: new Date(),
};

export const MOCK_WAVE_CATEGORY: Pick<
  WaveData,
  "categories"
>["categories"][number] = {
  color: "blue",
  description: "description",
  name: "name",
};

export const MOCK_WAVE: WaveData = {
  ...MOCK_WAVE_DATA,
  categories: [MOCK_WAVE_CATEGORY],
};
