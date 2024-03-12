import dynamic from "next/dynamic";

import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";

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
        <PageTitle>Apply for the Grant</PageTitle>
      </div>

      <CreateApplicationForm />
    </>
  );
}
