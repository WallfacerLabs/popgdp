"use server";

import { UnauthenticatedError } from "@/constants/errors";
import { insertImage } from "@/drizzle/queries/images";

import { auth } from "@/lib/auth";

export async function uploadImage(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  const image = data.get("image") as File;

  const [{ id }] = await insertImage({
    userId: session.user.id,
    content: Buffer.from(await image.arrayBuffer()),
  });

  return id;
}
