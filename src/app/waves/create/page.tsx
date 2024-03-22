import dynamic from "next/dynamic";

import { auth } from "@/lib/auth";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const CreateWaveForm = dynamic(() => import("./createWaveForm"), {
  ssr: false,
});

export default async function CreateWave() {
  const session = await auth();

  if (!session?.user?.id) {
    return <Unauthenticated />;
  }

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href="/" />
        <PageTitle>Create new wave</PageTitle>
      </div>
      <CreateWaveForm />
    </>
  );
}
