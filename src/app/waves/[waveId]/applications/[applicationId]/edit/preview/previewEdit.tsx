"use client";

import { notFound } from "next/navigation";
import { urls } from "@/constants/urls";
import { ImageData } from "@/constants/validationSchemas";

import { Category } from "@/types/Category";
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorage";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageHeader } from "@/components/ui/pageHeader";
import { SaveIcon } from "@/components/icons/saveIcon";

import {
  applicationDataSchema,
  useStepsContext,
} from "../../../create/stepsProvider";
import { updateDraftAction } from "./updateDraftAction";

interface PreviewEditProps extends WaveParamsSchema {
  applicationId: string;
  user: {
    image: ImageData | null;
    name: string | null;
  };
  categories: Category[];
}

export default function PreviewEdit({
  applicationId,
  waveId,
  user,
  categories,
}: PreviewEditProps) {
  const { applicationData } = useStepsContext();

  const validationResult = applicationDataSchema.safeParse(applicationData);

  if (!validationResult.success) {
    throw notFound();
  }

  const validatedApplicationData = validationResult.data;

  const category = categories.find(
    (category) => category.id === validatedApplicationData.categoryId,
  )!;

  const onApplicationSubmit = async ({ isDraft }: { isDraft: boolean }) => {
    await updateDraftAction(validatedApplicationData, waveId, isDraft);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.applicationStepsData);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        className="mb-8"
        title={applicationData.name ?? "Submission"}
        backUrl={urls.applications.edit({ waveId, applicationId })}
        badges={<CategoryBadge category={category} />}
      >
        <Button
          variant="secondary"
          onClick={() => onApplicationSubmit({ isDraft: true })}
        >
          Save as draft
          <SaveIcon />
        </Button>
        <Button
          className="px-14"
          onClick={() => onApplicationSubmit({ isDraft: false })}
        >
          Submit
        </Button>
      </PageHeader>

      <ApplicationPreview
        application={{
          ...validatedApplicationData,
          user,
        }}
      />
    </div>
  );
}
