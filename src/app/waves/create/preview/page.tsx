import dynamic from "next/dynamic";

import { auth } from "@/lib/auth";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const WavePreview = dynamic(() => import("./wavePreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return <Unauthenticated />;
  }

  return <WavePreview />;
}
