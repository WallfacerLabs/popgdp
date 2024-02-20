import { notFound } from "next/navigation";
import { db } from "@/drizzle/db";
import { applications } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function Application({
  params,
}: {
  params: { applicationId: string };
}) {
  const application = await db.query.applications.findFirst({
    where: eq(applications.id, Number(params.applicationId)),
  });

  if (!application) {
    return notFound();
  }

  return (
    <>
      <h2>{application.name}</h2>
    </>
  );
}
