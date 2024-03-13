ALTER TABLE "application" RENAME COLUMN "description" TO "summary";--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "entityName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "duration" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "budget" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "teamSummary" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "idea" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "reason" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "goals" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "requirements" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "tbd" text NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ADD COLUMN "imageId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_imageId_image_id_fk" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
