import Link from "next/link";
import { urls } from "@/constants/urls";

import { UserId } from "@/types/User";
import { WaveWithApplications } from "@/types/Wave";
import { canAddSubmission } from "@/config/actionPermissions";
import { getUserId } from "@/lib/auth";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { ErrorTooltip } from "@/components/ui/tooltip";

import { Submissions } from "./submissions";

interface SubmissionsProps {
  wave: WaveWithApplications;
  searchParams: unknown;
}

export async function SubmissionsSection({
  wave,
  searchParams,
}: SubmissionsProps) {
  const userId = await getUserId();

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>Submissions</PageTitle>
        <ApplyForGrantButton waveId={wave.id} userId={userId} />
      </div>

      <Submissions wave={wave} searchParams={searchParams} userId={userId} />
    </>
  );
}

async function ApplyForGrantButton({
  waveId,
  userId,
}: WaveParamsSchema & { userId: UserId | undefined }) {
  const { validationErrorMessage } = await canAddSubmission({ waveId });

  if (!userId) {
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
