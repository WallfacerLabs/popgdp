CREATE TABLE IF NOT EXISTS "review" (
	"commentId" uuid NOT NULL,
	"userId" text NOT NULL,
	"applicationId" uuid NOT NULL,
	CONSTRAINT "review_userId_applicationId_pk" PRIMARY KEY("userId","applicationId")
);

DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_commentId_comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
