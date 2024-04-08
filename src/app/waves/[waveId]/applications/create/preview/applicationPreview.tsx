"use client";

import { useRouter } from "next/navigation";
import { urls } from "@/constants/urls";
import { ImageData } from "@/constants/validationSchemas";

import { type Category } from "@/types/Category";
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorage";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageTitle } from "@/components/ui/pageTitle";
import { SaveIcon } from "@/components/icons/saveIcon";

import { createApplicationAction } from "../steps/createApplicationAction";
import { applicationDataSchema, useStepsContext } from "../stepsProvider";

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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={urls.applications.create({ waveId })} />
          <PageTitle>{applicationData.name}</PageTitle>
          <CategoryBadge category={category} />
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">
            Save as draft
            <SaveIcon />
          </Button>
          <Button
            className="px-14"
            onClick={async () => {
              await createApplicationAction(validatedApplicationData, waveId);
              localStorage.removeItem(LOCAL_STORAGE_KEYS.applicationStepsData);
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <ApplicationPreview
        application={{
          ...validatedApplicationData,
          user,
        }}
      />
    </div>
  );
}
