import dynamic from "next/dynamic";

import { auth } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const CreateApplicationForm = dynamic(
  () =>
    import("./createApplicationForm").then((mod) => mod.CreateApplicationForm),
  {
    ssr: false,
  },
);

export default async function CreateApplication({
  params,
}: {
  params: unknown;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return <Unauthenticated />;
  }

  const { waveId } = parseWaveParams(params);

  return (
    <div className="flex flex-col gap-14">
      <div className="flex items-center gap-4">
        <BackButton href={`/waves/${waveId}`} />
        <PageTitle>Apply for the Grant</PageTitle>
      </div>

      <CreateApplicationForm />
    </div>
  );
}
