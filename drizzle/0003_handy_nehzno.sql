DO $$ BEGIN
 CREATE TYPE "contentValue" AS ENUM('positive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applicationValue" (
	"applicationId" integer NOT NULL,
	"userId" text NOT NULL,
	"value" "contentValue" NOT NULL,
	CONSTRAINT "applicationValue_applicationId_userId_pk" PRIMARY KEY("applicationId","userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicationValue" ADD CONSTRAINT "applicationValue_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applicationValue" ADD CONSTRAINT "applicationValue_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
