"use client";

import { useRouter } from "next/navigation";
import { User } from "next-auth";

import { LOCAL_STORAGE_KEYS } from "@/lib/localStorage";
import { WaveParamsSchema } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { SaveIcon } from "@/components/icons/saveIcon";

import { createApplicationAction } from "../steps/createApplicationAction";
import { applicationDataSchema, useStepsContext } from "../stepsProvider";

interface PreviewApplicationProps extends WaveParamsSchema {
  user: User;
}

export default function PreviewApplication({
  waveId,
  user,
}: PreviewApplicationProps) {
  const router = useRouter();
  const { applicationData } = useStepsContext();
  const validationResult = applicationDataSchema.safeParse(applicationData);
  if (!validationResult.success) {
    router.replace(`/waves/${waveId}/applications/create`);
    return;
  }
  const validatedApplicationData = validationResult.data;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={`/waves/${waveId}/applications/create`} />
          <PageTitle>{applicationData.name}</PageTitle>
          <CategoryBadge>Category</CategoryBadge>
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
          user: {
            image: user.image,
            name: user.name,
          },
        }}
      />
    </div>
  );
}
