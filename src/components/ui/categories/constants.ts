export const categoryNames = ["red", "pink"] as const;
export type CategoryName = (typeof categoryNames)[number];
