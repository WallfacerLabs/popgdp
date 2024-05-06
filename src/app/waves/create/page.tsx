import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";

import { userHasRole, UserPermission } from "@/config/userPermissions";
import { PageHeader } from "@/components/ui/pageHeader";

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
      <PageHeader
        className="mb-16"
        title="Create New Wave"
        backUrl={urls.root}
      />
      <CreateWaveForm />
    </>
  );
}
