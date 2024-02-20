"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { waves } from "@/drizzle/schema";

import { createWaveSchema } from "./createWaveSchema";

export async function createWaveAction(data: createWaveSchema) {
  const [{ id }] = await db
    .insert(waves)
    .values({
      name: data.waveName,
      startsAt: data.duration.from,
      endsAt: data.duration.to,
    })
    .returning({ id: waves.id });

  revalidatePath(`/waves/${id}`);
  redirect(`/waves/${id}`);
}
