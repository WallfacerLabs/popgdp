"use client";

import { notFound } from "next/navigation";
import { ImageData } from "@/constants/validationSchemas";

import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";

import {
  applicationDataSchema,
  useStepsContext,
} from "../../../create/stepsProvider";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "@/components/icons/saveIcon";
import { BackButton } from "@/components/ui/backButton";
import { PageTitle } from "@/components/ui/pageTitle";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { urls } from "@/constants/urls";
import { useWaveStepsContext, waveDataSchema } from "@/app/waves/create/stepsProvider";

interface EditPreview {
  user: {
    image: ImageData | null;
    name: string | null;
  };
}

export function EditPreview({ user }: EditPreview) {
  const { applicationData } = useStepsContext();

  const validatedResult = applicationDataSchema.safeParse(applicationData);
  if (!validatedResult.success) {
    throw notFound();
  }
  console.log('edit preview 2')

  return (<>
      <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <BackButton  /> */}
          <PageTitle>{applicationData.name}</PageTitle>
          {/* <CategoryBadge category={waveData.categories} /> */}
        </div>
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => console.log('save as draft')}
        >
          Save as draft
          <SaveIcon />
        </Button>
        <Button
          className="px-14"
          onClick={() => console.log('submit')}
        >
          Submit
        </Button>
      </div>
      </div>
    </div>
    <ApplicationPreview application={{ ...validatedResult.data, user }} /></>);
}
