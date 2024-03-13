"use server";

import { UnauthenticatedError } from "@/constants/errors";
import { insertImage } from "@/drizzle/queries/images";
import { z } from "zod";

import { auth } from "@/lib/auth";

const imageDataSchema = z.object({
  image: z.instanceof(File),
});

export async function uploadImage(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new UnauthenticatedError();
  }

  const { image } = imageDataSchema.parse(Object.fromEntries(data.entries()));

  const [{ id }] = await insertImage({
    userId: session.user.id,
    content: Buffer.from(await image.arrayBuffer()),
  });

  return id;
}
