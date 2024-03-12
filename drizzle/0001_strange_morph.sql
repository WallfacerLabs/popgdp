CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"applicationId" integer NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "application" DROP CONSTRAINT "application_waveId_wave_id_fk";
--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN IF NOT EXISTS "description" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_waveId_wave_id_fk" FOREIGN KEY ("waveId") REFERENCES "wave"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
