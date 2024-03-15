import { ImageResponse } from "next/og";

import { ProductIcon } from "@/components/icons/productIcon";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<ProductIcon className="h-8 w-8" />, {
    ...size,
  });
}
