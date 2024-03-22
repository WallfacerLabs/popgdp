import dynamic from "next/dynamic";

import { getUserId } from "@/lib/auth";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const WavePreview = dynamic(() => import("./wavePreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage() {
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  return <WavePreview />;
}
