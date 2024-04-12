import Link from "next/link";
import { urls } from "@/constants/urls";

import { WaveWithApplications } from "@/types/Wave";
import { canAddSubmission } from "@/config/actionPermissions";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Submissions } from "./submissions";

interface SubmissionsProps {
  wave: WaveWithApplications;
  searchParams: unknown;
}

export function SubmissionsSection({ wave, searchParams }: SubmissionsProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>Submissions</PageTitle>
        <ApplyForGrantButton waveId={wave.id} />
      </div>

      <Submissions wave={wave} searchParams={searchParams} />
    </>
  );
}

async function ApplyForGrantButton({ waveId }: WaveParamsSchema) {
  const { validationErrorMessage } = await canAddSubmission({ waveId });

  if (typeof validationErrorMessage !== "undefined") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled>Apply for Grant</Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          You must sign in to apply for a grant
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button asChild>
      <Link href={urls.applications.create({ waveId })}>Apply for Grant</Link>
    </Button>
  );
}
