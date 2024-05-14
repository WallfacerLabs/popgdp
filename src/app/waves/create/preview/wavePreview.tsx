"use client";

import { useRouter } from "next/navigation";
import { urls } from "@/constants/urls";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import { LOCAL_STORAGE_KEYS } from "@/lib/localStorage";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/categories/categoryBadge";
import { PageHeader } from "@/components/ui/pageHeader";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "@/components/icons/calendarIcon";

import { createWaveAction } from "../createWaveAction";
import { useWaveStepsContext, waveDataSchema } from "../stepsProvider";

export default function PreviewApplication() {
  const router = useRouter();
  const { waveData } = useWaveStepsContext();
  const validationResult = waveDataSchema.safeParse(waveData);
  if (!validationResult.success) {
    router.replace(urls.waves.create);
    return;
  }
  const validatedWaveData = validationResult.data;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={validatedWaveData.name} backUrl={urls.waves.create}>
        <Button
          className="px-14"
          onClick={async () => {
            await createWaveAction(validatedWaveData);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.waveStepsData);
          }}
        >
          Submit
        </Button>
      </PageHeader>
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>{validatedWaveData.name}</CardTitle>
          <CardDescription className="mt-4 text-xs text-primary">
            {validatedWaveData.summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold">Categories:</span>
            <ul className="flex flex-wrap items-center gap-2">
              {validatedWaveData.categories.map((category, index) => (
                <li key={category.name + index}>
                  <CategoryBadge category={category} />
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <ul className="grid grid-cols-4 gap-y-8 rounded-2xl border bg-background">
            <StagePreview
              title="Open"
              date={validatedWaveData.openStartDate}
              className="border-none"
            />
            <StagePreview
              title="Denoising"
              date={validatedWaveData.denoisingStartDate}
            />
            <StagePreview
              title="Assessment"
              date={validatedWaveData.assesmentStartDate}
            />
            <StagePreview title="Close" date={validatedWaveData.closeDate} />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

interface StagePreviewProps {
  title: string;
  date: Date;
  className?: string;
}

function StagePreview({ title, date, className }: StagePreviewProps) {
  return (
    <li className={cn("flex flex-col border-l p-6", className)}>
      <h4 className="mb-4 font-bold">{title}</h4>
      <div
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
          "h-12 w-40 justify-start gap-2 hover:bg-transparent",
        )}
      >
        <CalendarIcon className="h-6 w-6" />
        {formatDate(date)}
      </div>
    </li>
  );
}
