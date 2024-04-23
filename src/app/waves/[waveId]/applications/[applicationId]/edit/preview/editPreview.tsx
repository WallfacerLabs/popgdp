"use client";

import { notFound } from "next/navigation";
import { ImageData } from "@/constants/validationSchemas";

import { Category } from "@/types/Category";
import { ApplicationPreview } from "@/components/ui/applicationPreview/applicationPreview";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageTitle } from "@/components/ui/pageTitle";
import { SaveIcon } from "@/components/icons/saveIcon";

import {
  applicationDataSchema,
  useStepsContext,
} from "../../../create/stepsProvider";

interface EditPreview {
  user: {
    image: ImageData | null;
    name: string | null;
  };
  categories: Category[];
}

export function EditPreview({ user, categories }: EditPreview) {
  const { applicationData } = useStepsContext();

  const validationResult = applicationDataSchema.safeParse(applicationData);

  if (!validationResult.success) {
    throw notFound();
  }

  const validatedApplicationData = validationResult.data;

  const category = categories.find(
    (category) => category.id === validatedApplicationData.categoryId,
  )!;

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <BackButton  /> */}
          <PageTitle>{applicationData.name}</PageTitle>
          <CategoryBadge category={category} />
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => console.log("save as draft")}
          >
            Save as draft
            <SaveIcon />
          </Button>
          <Button className="px-14" onClick={() => console.log("submit")}>
            Submit
          </Button>
        </div>
      </div>
      <ApplicationPreview application={{ ...validatedApplicationData, user }} />
    </div>
  );
}
