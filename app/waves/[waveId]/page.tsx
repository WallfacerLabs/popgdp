import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/drizzle/db";
import { applications, waves } from "@/drizzle/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Wave({ params }: { params: { waveId: string } }) {
  const [wave, projects] = await Promise.all([
    db.query.waves.findFirst({
      where: eq(waves.id, Number(params.waveId)),
    }),
    db.query.applications.findMany({
      where: eq(applications.waveId, Number(params.waveId)),
      with: { users: { columns: { name: true } } },
    }),
  ]);

  if (!wave) {
    return notFound();
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <div>Wave {wave.id}</div>
          <div>Wave name: {wave.name}</div>
          <div>
            {format(wave.startsAt, "LLL dd, y")} -{" "}
            {format(wave.endsAt, "LLL dd, y")}
          </div>
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
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.users.name}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{format(new Date(), "LLL dd, y")}</TableCell>
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
