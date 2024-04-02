import Link from "next/link";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getWaveWithApplications } from "@/drizzle/queries/waves";
import { z } from "zod";

import { parseWaveParams } from "@/lib/paramsValidation";
import { ApplicationsTable } from "@/components/ui/applicationsTable/applicationsTable";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { TablePagination } from "@/components/ui/pagination/tablePagination";

import { TimelinePreview } from "./timeline/timelinePreview";
import { WaveBanner } from "./waveBanner";

const PAGE_SIZE = 10;

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export default async function Wave({
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
        <Button asChild>
          <Link href={urls.applications.create({ waveId })}>
            Apply for Grant
          </Link>
        </Button>
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
