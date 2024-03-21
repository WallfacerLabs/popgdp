"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertWave } from "@/drizzle/queries/waves";

export async function createWaveAction(data: any) {
  const [{ id }] = await insertWave({
    name: data.waveName,
    startsAt: data.duration.from,
    endsAt: data.duration.to,
  });

  revalidatePath("/");
  redirect(`/waves/${id}`);
}
