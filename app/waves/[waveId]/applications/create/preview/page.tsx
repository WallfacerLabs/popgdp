"use client";

import { useSession } from "next-auth/react";

import { useWaveParams } from "@/lib/paramsValidation";
import { ApplicationPreview } from "@/components/ui/applicationPreview";
import { BackButton } from "@/components/ui/backButton";
import { CategoryBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { createApplicationAction } from "../steps/createApplicationAction";
import { useStepsContext } from "../stepsProvider";

export default function PreviewApplication() {
  const { waveId } = useWaveParams();
  const { data: session } = useSession();

  const { applicationData } = useStepsContext();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href={`/waves/${waveId}/applications/create`} />
          <h2 className="text-2xl font-bold">{applicationData.projectName}</h2>
          <CategoryBadge>Category</CategoryBadge>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Save as draft</Button>
          <Button
            className="px-14"
            onClick={async () => {
              await createApplicationAction(applicationData, waveId);
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
