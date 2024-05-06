"use client";

import { useRouter } from "next/navigation";
import { urls } from "@/constants/urls";
import { ImageData } from "@/constants/validationSchemas";

import { type Category } from "@/types/Category";
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorage";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageHeader } from "@/components/ui/pageHeader";
import { SaveIcon } from "@/components/icons/saveIcon";

import { applicationDataSchema, useStepsContext } from "../stepsProvider";
import { createApplicationAction } from "./createApplicationAction";

interface PreviewApplicationProps extends WaveParamsSchema {
  categories: Array<Category>;
  user: {
    image: ImageData | null;
    name: string | null;
  };
}

export default function PreviewApplication({
  waveId,
  categories,
  user,
}: PreviewApplicationProps) {
  const router = useRouter();
  const { applicationData } = useStepsContext();
  const validationResult = applicationDataSchema.safeParse(applicationData);
  if (!validationResult.success) {
    router.replace(
      urls.applications.create({
        waveId,
      }),
    );
    return;
  }
  const validatedApplicationData = validationResult.data;

  const category = categories.find(
    (category) => category.id === validatedApplicationData.categoryId,
  )!;

  const onApplicationSubmit = async ({ isDraft }: { isDraft: boolean }) => {
    await createApplicationAction(validatedApplicationData, waveId, isDraft);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.applicationStepsData);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={applicationData.name ?? "Submission"}
        backUrl={urls.applications.create({ waveId })}
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
