import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { getCategoriesForWave } from "@/drizzle/queries/categories";

import { canAddSubmission } from "@/config/actionPermissions";
import { parseWaveParams } from "@/lib/paramsValidation";
import { PageHeader } from "@/components/ui/pageHeader";

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
      <PageHeader
        className="mb-16"
        title="Apply for the Grant"
        backUrl={urls.waves.preview({ waveId })}
      />

      <CreateApplicationForm
        categories={categories}
        previewUrl={urls.applications.createPreview({ waveId })}
      />
    </>
  );
}
