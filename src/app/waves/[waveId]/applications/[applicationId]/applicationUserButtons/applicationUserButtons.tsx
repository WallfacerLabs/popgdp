import { ApplicationWithComments } from "@/types/Application";
import { Button } from "@/components/ui/button";

import { publishDraftAction } from "./publishDraftAction";

export function ApplicationUserButtons({
  application,
}: {
  application: ApplicationWithComments;
}) {
  const { draft } = application;

  return draft ? (
    <form
      action={async () => {
        "use server";
        await publishDraftAction({
          applicationId: application.id,
          waveId: application.waveId,
        });
      }}
    >
      <Button> Publish</Button>
    </form>
  ) : (
    <>Your application is public</>
  );
}
