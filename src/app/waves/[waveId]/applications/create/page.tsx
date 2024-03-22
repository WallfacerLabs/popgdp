import dynamic from "next/dynamic";

import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const CreateApplicationForm = dynamic(() => import("./createApplicationForm"), {
  ssr: false,
});

export default async function CreateApplication({
  params,
}: {
  params: unknown;
}) {
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

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
