export const categoryColors = [
  "red",
  "pink",
  "orange",
  "green",
  "blue",
  "purple",
] as const;
export type CategoryColor = (typeof categoryColors)[number];
