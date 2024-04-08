export const ContentValue = {
  positive: "positive",
  spam: "spam",
} as const;

export const contentValues = [
  ContentValue.positive,
  ContentValue.spam,
] as const;
export type ContentValue = (typeof contentValues)[number];
