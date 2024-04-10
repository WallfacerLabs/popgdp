import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";

export const metadata: Metadata = {
  title: "Create wave",
};

const CreateWaveForm = dynamic(() => import("./createWaveForm"), {
  ssr: false,
});

export default async function CreateWave() {
  const isModerator = await userHasRole(UserPermission.moderator);
  if (!isModerator) {
    throw notFound();
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
