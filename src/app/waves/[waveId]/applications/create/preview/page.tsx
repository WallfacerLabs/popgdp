"use client";

import { useSession } from "next-auth/react";

import { useWaveParams } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";
import { SaveIcon } from "@/components/icons/saveIcon";

import { createApplicationAction } from "../steps/createApplicationAction";
import {
  applicationDataSchema,
  useStepsContext,
  useStepsDispatchContext,
} from "../stepsProvider";

export default function PreviewApplication() {
  const { waveId } = useWaveParams();
  const { data: session } = useSession();

  const { applicationData } = useStepsContext();
  const validatedApplicationData = applicationDataSchema.parse(applicationData);
  const dispatch = useStepsDispatchContext();
  if (!session?.user) {
    return <Unauthenticated />;
  }

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
              dispatch({ type: "RESET_STEPS" });
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
            image: session.user.image,
            name: session.user.name,
          },
        }}
      />
    </div>
  );
}
