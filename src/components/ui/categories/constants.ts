export const categoryColor = ["red", "pink"] as const;
export type CategoryColor = (typeof categoryColor)[number];
