ALTER TABLE "wave" ADD COLUMN IF NOT EXISTS "summary" text NOT NULL;
ALTER TABLE "wave" ADD COLUMN IF NOT EXISTS "openStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN IF NOT EXISTS "denoisingStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN IF NOT EXISTS "assesmentStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN IF NOT EXISTS "closeDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" DROP COLUMN IF EXISTS "startsAt";
ALTER TABLE "wave" DROP COLUMN IF EXISTS "endsAt";