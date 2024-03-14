"use client";

import { useSession } from "next-auth/react";

import { useWaveParams } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/pageTitle";
import { Unauthenticated } from "@/components/ui/unauthenticated";

import { createApplicationAction } from "../steps/createApplicationAction";
import { useStepsContext, useStepsDispatchContext } from "../stepsProvider";

export default function PreviewApplication() {
  const { waveId } = useWaveParams();
  const { data: session } = useSession();

  const { applicationData } = useStepsContext();
  const dispatch = useStepsDispatchContext();
  if (!session?.user) {
    return <Unauthenticated />;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={`/waves/${waveId}/applications/create`} />
          <PageTitle>{applicationData.name}</PageTitle>
          <CategoryBadge>Category</CategoryBadge>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary">Save as draft</Button>
          <Button
            className="px-14"
            onClick={async () => {
              await createApplicationAction(applicationData, waveId);
              dispatch({ type: "RESET_STEPS" });
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <ApplicationPreview
        application={{
          ...applicationData,
          users: {
            image: session.user.image,
            name: session.user.name,
          },
        }}
      />
    </div>
  );
}
