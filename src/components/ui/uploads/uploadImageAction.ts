"use server";

import { UnauthenticatedError } from "@/constants/errors";
import { insertImage } from "@/drizzle/queries/images";
import sharp from "sharp";

import { getUserId } from "@/lib/auth";

const RESIDED_IMAGE_SIZE = 10;

export async function uploadImage(data: FormData) {
  const userId = await getUserId();

  if (!userId) {
    throw new UnauthenticatedError();
  }

  const image = data.get("image") as File;
  const imageBuffer = Buffer.from(await image.arrayBuffer());

  const { width, height } = await sharp(imageBuffer)
    .metadata()
    .then(({ width, height }) => {
      if (!width || !height) {
        throw Error("Could not get required image metadata");
      }

      return { width, height };
    });

  const placeholder = await sharp(imageBuffer)
    .resize(RESIDED_IMAGE_SIZE, RESIDED_IMAGE_SIZE, {
      fit: "inside",
    })
    .toFormat("png")
    .modulate({
      brightness: 1,
      saturation: 1.2,
    })
    .normalise()
    .toBuffer({ resolveWithObject: true })
    .then(
      ({ data, info }) =>
        `data:image/${info.format};base64,${data.toString("base64")}`,
    )
    .catch((err) => {
      console.error("base64 generation failed", err);
      throw err;
    });

  const [{ id }] = await insertImage({
    userId,
    content: imageBuffer,
    height,
    width,
    placeholder,
  });

  return {
    id,
    height,
    width,
    placeholder,
  };
}
