ALTER TABLE "wave" ADD COLUMN "summary" text NOT NULL;
ALTER TABLE "wave" ADD COLUMN "openStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN "denoisingStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN "assesmentStartDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" ADD COLUMN "closeDate" timestamp with time zone NOT NULL;
ALTER TABLE "wave" DROP COLUMN IF EXISTS "startsAt";
ALTER TABLE "wave" DROP COLUMN IF EXISTS "endsAt";