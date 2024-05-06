import Link from "next/link";
import { urls } from "@/constants/urls";

import { UserId } from "@/types/User";
import { WaveWithApplications } from "@/types/Wave";
import { canAddSubmission } from "@/config/actionPermissions";
import { getUserId } from "@/lib/auth";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/pageHeader";
import { ErrorTooltip } from "@/components/ui/tooltip";

import { Submissions } from "./submissions";

interface SubmissionsProps {
  wave: WaveWithApplications;
}

export async function SubmissionsSection({ wave }: SubmissionsProps) {
  const userId = await getUserId();

  return (
    <>
      <PageHeader title="Submissions">
        <ApplyForGrantButton waveId={wave.id} userId={userId} />
      </PageHeader>

      <Submissions wave={wave} userId={userId} />
    </>
  );
}

async function ApplyForGrantButton({
  waveId,
  userId,
}: WaveParamsSchema & { userId: UserId | undefined }) {
  const { validationErrorMessage } = await canAddSubmission({ waveId });

  if (typeof validationErrorMessage !== "undefined") {
    return (
      <ErrorTooltip message={validationErrorMessage}>
        <Button disabled>Apply for Grant</Button>
      </ErrorTooltip>
    );
  }

  return (
    <Button asChild>
      <Link href={urls.applications.create({ waveId })}>Apply for Grant</Link>
    </Button>
  );
}
