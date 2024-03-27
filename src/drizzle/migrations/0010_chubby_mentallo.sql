ALTER TABLE "user" RENAME COLUMN "image" TO "imageId";
ALTER TABLE "user" ALTER COLUMN "imageId" SET DATA TYPE uuid;
ALTER TABLE "application" ADD COLUMN "category" uuid NOT NULL;
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
