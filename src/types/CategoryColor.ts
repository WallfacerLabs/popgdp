export const categoryColors = [
  "red",
  "pink",
  "orange",
  "green",
  "blue",
  "purple",
  "yellow",
  "cyan",
] as const;
export type CategoryColor = (typeof categoryColors)[number];
