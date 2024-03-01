import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWaveWithApplications } from "@/drizzle/queries/waves";

import { formatDate } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableLinkRow,
  TableRow,
} from "@/components/ui/table";
import globeImage from "@/app/images/globe.png";

export default async function Wave({ params }: { params: { waveId: string } }) {
  const wave = await getWaveWithApplications(Number(params.waveId));

  if (!wave) {
    return notFound();
  }

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
        <h2 className="text-2xl font-bold">Submissions</h2>
        <Button asChild>
          <Link href={`/waves/${params.waveId}/applications/create`}>
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
          {wave.applications.map((project) => (
            <TableLinkRow
              key={project.id}
              href={`/waves/${params.waveId}/applications/${project.id}`}
            >
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.users.name}</TableCell>
              <TableCell>Entity name</TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
              <TableCell>1,025,000.00 WLD</TableCell>
              <TableCell>Category</TableCell>
            </TableLinkRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
