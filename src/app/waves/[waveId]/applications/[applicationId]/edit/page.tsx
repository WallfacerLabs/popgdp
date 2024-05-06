import { urls } from "@/constants/urls";
import { getCategoriesForWave } from "@/drizzle/queries/categories";

import { parseApplicationParams } from "@/lib/paramsValidation";
import { PageHeader } from "@/components/ui/pageHeader";

import CreateApplicationForm from "../../create/createApplicationForm";

export default async function EditPage({ params }: { params: unknown }) {
  const { applicationId, waveId } = parseApplicationParams(params);

  const categories = await getCategoriesForWave(waveId);

  return (
    <>
      <PageHeader
        className="mb-16"
        title="Apply for the Grant"
        backUrl={urls.applications.preview({ waveId, applicationId })}
      />
      <CreateApplicationForm
        categories={categories}
        previewUrl={urls.applications.editPreview({ waveId, applicationId })}
      />
    </>
  );
}
