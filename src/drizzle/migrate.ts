import "dotenv/config";

import { connection, db } from "@/drizzle/db";
import { migrate } from "drizzle-orm/postgres-js/migrator";

migrate(db, { migrationsFolder: "src/drizzle/migrations" }).then(() => {
  connection.end();
});
