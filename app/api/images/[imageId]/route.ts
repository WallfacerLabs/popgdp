import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { getImage } from "@/drizzle/queries/images";

import { parseImageParams } from "@/lib/paramsValidation";

export async function GET(_: Request, context: { params: unknown }) {
  const { imageId } = parseImageParams(context.params);

  const image = await getImage(imageId);
  if (!image) {
    return notFound();
  }

  return new NextResponse(image.content, {
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
