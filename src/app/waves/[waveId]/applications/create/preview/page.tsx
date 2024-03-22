import dynamic from "next/dynamic";

import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const PreviewApplication = dynamic(() => import("./applicationPreview"), {
  ssr: false,
});

export default async function PreviewApplicationPage({
  params,
}: {
  params: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  return <PreviewApplication waveId={waveId} />;
}
