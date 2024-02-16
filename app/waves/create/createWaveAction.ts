"use server";

import { db } from "@/drizzle/db";
import { waves } from "@/drizzle/schema";
import { createWaveSchema } from "./createWaveSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWaveAction(data: createWaveSchema) {
  const wave = await db
    .insert(waves)
    .values({
      name: data.waveName,
      startsAt: data.duration.from,
      endsAt: data.duration.to,
    })
    .returning({ id: waves.id });

  const { id } = wave[0];

  revalidatePath(`/waves/${id}`);
  redirect(`/waves/${id}`);
}
