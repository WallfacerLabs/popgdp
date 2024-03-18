import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";
import globeImage from "@/images/globe.png";
import { z } from "zod";

import { formatDate } from "@/lib/dates";
import { parseWaveParams } from "@/lib/paramsValidation";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/pageTitle";
import { TablePagination } from "@/components/ui/pagination/tablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";
import { WldAmount } from "@/components/ui/wldAmount";

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
      <Card className="relative flex items-center">
        <CardTitle className="px-10 py-6">POPGDP</CardTitle>
        <CardContent className="px-0 py-6 pr-64 text-xs text-muted-foreground">
          POPGDP is <b>Proof of Personhood based Grant Distribution Platform</b>
          . In its first version it is designed to help Worldcoin Foundation
          review and distribute WLD grants to applicants by sourcing additional
          “signal” from World ID holders.
        </CardContent>
        <Image
          src={globeImage}
          alt=""
          className="absolute bottom-0 right-[32px] h-[125px] w-auto"
        />
      </Card>

      <div className="mt-8 flex items-center justify-between">
        <PageTitle>Submissions</PageTitle>
        <Button asChild>
          <Link href={`/waves/${waveId}/applications/create`}>
            Apply for Grant
          </Link>
        </Button>
      </div>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Project name</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Entity name</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Proposed budget</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageApplications.map((project) => (
            <TableLinkRow
              key={project.id}
              href={`/waves/${waveId}/applications/${project.id}`}
            >
              <TableCell>
                <span className="font-bold">{project.name}</span>
              </TableCell>
              <TableCell>{project.users.name}</TableCell>
              <TableCell>Entity name</TableCell>
              <TableCell>
                <span className="opacity-60">
                  {formatDate(project.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <WldAmount amount="1,025,000.00" />
              </TableCell>
              <TableCell>
                <CategoryBadge>Category</CategoryBadge>
              </TableCell>
            </TableLinkRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
