import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getCategoriesForWave } from "@/drizzle/queries/categories";

import { canAddSubmission } from "@/config/actionPermissions";
import { parseWaveParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";

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
  const { validationErrorMessage } = await canAddSubmission({ waveId });
  if (typeof validationErrorMessage !== "undefined") {
    throw notFound();
  }

  const categories = await getCategoriesForWave(waveId);

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={urls.waves.preview({ waveId })} />
        <PageTitle>Apply for the Grant</PageTitle>
      </div>

      <CreateApplicationForm
        categories={categories}
        previewUrl={urls.applications.createPreview({ waveId })}
      />
    </>
  );
}
