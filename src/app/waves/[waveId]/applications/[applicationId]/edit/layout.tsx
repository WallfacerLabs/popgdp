import { type ReactNode } from "react";
import { notFound } from "next/navigation";
import { getApplicationWithComments } from "@/drizzle/queries/applications";

import { ApplicationWithComments } from "@/types/Application";
import { parseApplicationParams } from "@/lib/paramsValidation";

import {
  EditApplicationProvider,
  StepsState,
} from "../../create/stepsProvider";

export default async function EditSubmissionLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: unknown;
}) {
  const { applicationId } = parseApplicationParams(params);

  const application = await getApplicationWithComments(
    applicationId,
    undefined,
  );

  if (!application) {
    throw notFound();
  }

  return (
    <EditApplicationProvider initialState={getInitialState(application)}>
      {children}
    </EditApplicationProvider>
  );
}

function getInitialState(application: ApplicationWithComments): StepsState {
  return {
    currentStep: 0,
    applicationData: {
      budget: application.budget,
      categoryId: application.categoryId,
      duration: Number(application.duration),
      email: application.email,
      entityName: application.entityName,
      image: application.image ?? undefined,
      name: application.name,
      summary: application.summary,
      goals: application.goals,
      idea: application.idea,
      reason: application.reason,
      tbd: application.tbd,
      tbdb: application.tbd,
      requirements: application.requirements,
      state: application.state,
      members: application.members?.map((member) => ({
        name: member.name,
        position: member.position,
        image: member.image ?? undefined,
      })),
      teamSummary: application.teamSummary,
    },
  };
}
