import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getWaveWithApplications } from "@/drizzle/queries/waves";
import { z } from "zod";

import { type Wave } from "@/types/Wave";
import { canPerformActionByStage, getWaveStage } from "@/config/waveStages";
import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TimelinePreview } from "@/components/ui/wavesTimelinePreview/timelinePreview";

import { WaveBanner } from "./waveBanner";

const PAGE_SIZE = 10;

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  const { waveId } = parseWaveParams(params);
  const wave = await getWaveWithApplications(waveId);
  if (!wave) {
    return {
      title: "Wave",
    };
  }
  return {
    title: wave.name,
  };
}

export default async function WavePage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const { page } = searchParamsSchema.parse(searchParams);

  const wave = await getWaveWithApplications(waveId);

  if (!wave) {
    return notFound();
  }

  const applicationsCount = wave.applications.length;
  const totalPages = Math.ceil(applicationsCount / PAGE_SIZE);

  const currentPageApplications = wave.applications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <>
      <WaveBanner />

      <TimelinePreview wave={wave} className="mt-6" />

      <div className="mt-6 flex items-center justify-between">
        <PageTitle>Submissions</PageTitle>
        <ApplyForGrantButton wave={wave} />
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

interface ApplyForGrantButtonProps {
  wave: Wave;
}

async function ApplyForGrantButton({ wave }: ApplyForGrantButtonProps) {
  const userId = await getUserId();
  const stage = getWaveStage(wave);
  const isCorrectStage = canPerformActionByStage(stage, "submissionAdd");

  if (!isCorrectStage) {
    return null;
  }

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
      <Link href={urls.applications.create({ waveId: wave.id })}>
        Apply for Grant
      </Link>
    </Button>
  );
}
