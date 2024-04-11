import Link from "next/link";
import { urls } from "@/constants/urls";
import { z } from "zod";

import { WaveWithApplications } from "@/types/Wave";
import { getUserId } from "@/lib/auth";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PAGE_SIZE = 10;

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

interface SubmissionsProps {
  wave: WaveWithApplications;
  waveId: number;
  searchParams: unknown;
}

export function Submissions({ wave, waveId, searchParams }: SubmissionsProps) {
  const { page } = searchParamsSchema.parse(searchParams);

  const applicationsCount = wave.applications.length;
  const totalPages = Math.ceil(applicationsCount / PAGE_SIZE);

  const currentPageApplications = wave.applications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <PageTitle>Submissions</PageTitle>
        <ApplyForGrantButton waveId={waveId} />
      </div>

      <ApplicationsTable
        className="mt-8"
        applications={currentPageApplications}
        waveId={waveId}
      />

      {totalPages > 1 && (
        <TablePagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}

async function ApplyForGrantButton({ waveId }: WaveParamsSchema) {
  const userId = await getUserId();

  if (!userId) {
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
