import Image from "next/image";
import { urls } from "@/constants/urls";
import { ImageData } from "@/constants/validationSchemas";

import { cn } from "@/lib/cn";

interface ImagePreviewProps {
  image: ImageData;
  className?: string;
}

export function ImagePreview({ image, className }: ImagePreviewProps) {
  return (
    <Image
      src={urls.images.preview({ imageId: image.id })}
      placeholder="blur"
      blurDataURL={image.placeholder}
      width={image.width}
      height={image.height}
      alt=""
      className={cn("h-full w-full rounded-[inherit] object-cover", className)}
    />
  );
}
