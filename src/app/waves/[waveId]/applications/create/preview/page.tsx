import dynamic from "next/dynamic";

import { auth } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const PreviewApplication = dynamic(
  () => import("./applicationPreview").then((mod) => mod.PreviewApplication),
  { ssr: false },
);

export default async function PreviewApplicationPage({
  params,
}: {
  params: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const session = await auth();
  if (!session?.user?.id) {
    return <Unauthenticated />;
  }

  return <PreviewApplication waveId={waveId} user={session.user} />;
}
