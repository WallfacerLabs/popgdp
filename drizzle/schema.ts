import { pgTable, serial, integer } from "drizzle-orm/pg-core";

export const counters = pgTable("counters", {
  id: serial("id").primaryKey(),
  value: integer("value").default(0),
});
