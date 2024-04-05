export const contentValues = ["positive", "spam"] as const;
export type ContentValue = (typeof contentValues)[number];
