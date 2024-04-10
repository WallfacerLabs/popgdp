import { Metadata } from "next";
import dynamic from "next/dynamic";
import { urls } from "@/constants/urls";
import { getCategoriesForWave } from "@/drizzle/queries/categories";

import { getUserId } from "@/lib/auth";
import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

const CreateApplicationForm = dynamic(() => import("./createApplicationForm"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Add submission",
};

export default async function CreateApplication({
  params,
}: {
  params: unknown;
}) {
  const { waveId } = parseWaveParams(params);
  const userId = await getUserId();
  if (!userId) {
    return <Unauthenticated />;
  }

  const categories = await getCategoriesForWave(waveId);

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={urls.waves.preview({ waveId })} />
        <PageTitle>Apply for the Grant</PageTitle>
      </div>

      <CreateApplicationForm categories={categories} />
    </>
  );
}
