"use client";

import { notFound } from "next/navigation";
import { ImageData } from "@/constants/validationSchemas";

import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";

import {
  applicationDataSchema,
  useStepsContext,
} from "../../../create/stepsProvider";

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

  return <ApplicationPreview application={{ ...validatedResult.data, user }} />;
}
