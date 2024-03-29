import dynamic from "next/dynamic";
import { urls } from "@/constants/urls";

import { getUserId } from "@/lib/auth";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const CreateWaveForm = dynamic(() => import("./createWaveForm"), {
  ssr: false,
});

export default async function CreateWave() {
  const userId = await getUserId();

  if (!userId) {
    return <Unauthenticated />;
  }

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={urls.root} />
        <PageTitle>Create new wave</PageTitle>
      </div>
      <CreateWaveForm />
    </>
  );
}
