export const ContentValue = {
  positive: "positive",
  invalid: "invalid",
} as const;

export const contentValues = [
  ContentValue.positive,
  ContentValue.invalid,
] as const;
export type ContentValue = (typeof contentValues)[number];
