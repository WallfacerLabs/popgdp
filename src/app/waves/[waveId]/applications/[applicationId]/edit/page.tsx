import { urls } from "@/constants/urls";
import { getCategoriesForWave } from "@/drizzle/queries/categories";

import { parseApplicationParams } from "@/lib/paramsValidation";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";

import CreateApplicationForm from "../../create/createApplicationForm";

export default async function EditPage({ params }: { params: unknown }) {
  const { applicationId, waveId } = parseApplicationParams(params);

  const categories = await getCategoriesForWave(waveId);

  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton
          href={urls.applications.preview({ waveId, applicationId })}
        />
        <PageTitle>Apply for the Grant</PageTitle>
      </div>
      <CreateApplicationForm
        categories={categories}
        previewUrl={urls.applications.editPreview({ waveId, applicationId })}
      />
    </>
  );
}
