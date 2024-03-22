DROP TABLE "account";
DROP TABLE "session";
DROP TABLE "verificationToken";
ALTER TABLE "user" DROP COLUMN IF EXISTS "email";
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";