export const categoryColors = ["red", "pink"] as const;
export type CategoryColor = (typeof categoryColors)[number];
