ALTER TABLE "user" DROP COLUMN IF EXISTS "image" ;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "imageId" uuid NOT NULL;
ALTER TABLE "application" ADD COLUMN IF NOT EXISTS "category" uuid NOT NULL;
DO $$ BEGIN
 ALTER TABLE "application" ADD CONSTRAINT "application_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
