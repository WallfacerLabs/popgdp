import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { formatDate, formatDateRange } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import globeImage from "@/app/images/globe.png";

export default async function Wave({ params }: { params: { waveId: string } }) {
  const wave = await getWaveWithApplications(Number(params.waveId));

  if (!wave) {
    return notFound();
  }

  return (
    <div className="w-full max-w-[1120px]">
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
