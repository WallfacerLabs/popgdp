import dynamic from "next/dynamic";

import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";

const CreateApplicationForm = dynamic(
  () => import("./createApplicationForm").then((mod) => mod.Form),
  {
    ssr: false,
  },
);

export default function CreateApplication({ params }: { params: unknown }) {
  const { waveId } = parseWaveParams(params);

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={`/waves/${waveId}`} />
        <h2 className="text-2xl font-bold">Apply for the Grant</h2>
      </div>

      <CreateApplicationForm waveId={waveId} />
    </>
  );
}
