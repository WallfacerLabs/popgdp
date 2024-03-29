ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "ethereumAddress" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "addressMessageSignature" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "addressMessage" text;