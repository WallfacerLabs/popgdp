CREATE TABLE IF NOT EXISTS "commentValue" (
	"commentId" uuid NOT NULL,
	"userId" text NOT NULL,
	"value" "contentValue" NOT NULL,
	CONSTRAINT "commentValue_commentId_userId_pk" PRIMARY KEY("commentId","userId")
);

DO $$ BEGIN
 ALTER TABLE "commentValue" ADD CONSTRAINT "commentValue_commentId_comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "commentValue" ADD CONSTRAINT "commentValue_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
