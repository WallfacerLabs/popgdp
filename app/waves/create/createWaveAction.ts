"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertWave } from "@/drizzle/queries/waves";

import { createWaveSchema } from "./createWaveSchema";

export async function createWaveAction(data: createWaveSchema) {
  const [{ id }] = await insertWave({
    name: data.waveName,
    startsAt: data.duration.from,
    endsAt: data.duration.to,
  });

  revalidatePath(`/waves/${id}`);
  redirect(`/waves/${id}`);
}
