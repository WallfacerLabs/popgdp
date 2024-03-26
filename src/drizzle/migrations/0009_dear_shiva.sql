DO $$ BEGIN
 CREATE TYPE "categoryColor" AS ENUM('red', 'pink');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"color" "categoryColor" NOT NULL,
	"waveId" integer NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "category" ADD CONSTRAINT "category_waveId_wave_id_fk" FOREIGN KEY ("waveId") REFERENCES "wave"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
