"use server";

import { UnauthenticatedError } from "@/constants/errors";
import { insertImage } from "@/drizzle/queries/images";

import { getUserId } from "@/lib/auth";

export async function uploadImage(data: FormData) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  const image = data.get("image") as File;

  const [{ id }] = await insertImage({
    userId,
    content: Buffer.from(await image.arrayBuffer()),
  });

  return id;
}
