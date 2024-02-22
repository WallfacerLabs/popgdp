import Link from "next/link";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { formatDate, formatDateRange } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Wave({ params }: { params: { waveId: string } }) {
  const wave = await getWaveWithApplications(Number(params.waveId));

  if (!wave) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <div>Wave {wave.id}</div>
          <div>Wave name: {wave.name}</div>
          <div>{formatDateRange(wave.startsAt, wave.endsAt)}</div>
        </div>
        <Button variant="secondary" asChild>
          <Link href={`/waves/${params.waveId}/applications/create`}>
            Create new application
          </Link>
        </Button>
      </div>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {wave.applications.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.users.name}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell className="text-end">
                <Button variant="secondary">
                  <Link
                    href={`/waves/${params.waveId}/applications/${project.id}`}
                  >
                    Go to
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
