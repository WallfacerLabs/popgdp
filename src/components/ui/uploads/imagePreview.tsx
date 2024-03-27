import Image from "next/image";
import { urls } from "@/constants/urls";
import { z } from "zod";

import { cn } from "@/lib/cn";

export const imageSchema = z.object({
  id: z.string(),
  placeholder: z.string(),
  width: z.number(),
  height: z.number(),
});

export type ImageData = z.infer<typeof imageSchema>;

interface ImagePreviewProps {
  image: ImageData;
  className?: string;
}

export function ImagePreview({ image, className }: ImagePreviewProps) {
  return (
    <Image
      src={urls.image.preview(image.id)}
      placeholder="blur"
      blurDataURL={image.placeholder}
      width={image.width}
      height={image.height}
      alt=""
      className={cn("h-full w-full rounded-[inherit] object-cover", className)}
    />
  );
}
