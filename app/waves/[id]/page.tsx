import { db } from "@/drizzle/db";
import { waves } from "@/drizzle/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Wave({ params }: { params: { id: string } }) {
  const wave = await db.query.waves.findFirst({
    where: eq(waves.id, Number(params.id)),
  });

  if (!wave) {
    return notFound();
  }

  return (
    <div>
      <div>Wave {wave.id}</div>
      <div>Wave name: {wave.name}</div>
      <div>
        {format(wave.startsAt, "LLL dd, y")} -{" "}
        {format(wave.endsAt, "LLL dd, y")}
      </div>
    </div>
  );
}
