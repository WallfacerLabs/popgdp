ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "user_name_unique";
ALTER TABLE "user" ADD CONSTRAINT "user_name_unique" UNIQUE("name");