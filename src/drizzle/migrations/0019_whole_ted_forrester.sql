ALTER TABLE "user" ADD COLUMN "isBlocked" boolean DEFAULT false NOT NULL;
ALTER TABLE "user" ADD COLUMN "isContentHidden" boolean DEFAULT false NOT NULL;