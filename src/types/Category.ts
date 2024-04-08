import { type getCategoriesForWave } from "@/drizzle/queries/categories";

export type Category = Awaited<ReturnType<typeof getCategoriesForWave>>[number];
