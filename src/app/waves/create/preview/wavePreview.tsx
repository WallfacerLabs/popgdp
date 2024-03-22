"use client";

import { useRouter } from "next/navigation";

import { formatDate } from "@/lib/dates";
import { BackButton } from "@/components/ui/backButton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTitle } from "@/components/ui/pageTitle";
import { CalendarIcon } from "@/components/icons/calendarIcon";

import {
  useWaveStepsContext,
  useWaveStepsDispatchContext,
  waveDataSchema,
} from "../stepsProvider";

export default function PreviewApplication() {
  const router = useRouter();
  const { waveData } = useWaveStepsContext();
  const dispatch = useWaveStepsDispatchContext();
  const validationResult = waveDataSchema.safeParse(waveData);
  if (!validationResult.success) {
    router.replace("/waves/create");
    return;
  }
  const validatedWaveData = validationResult.data;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton href="/waves/create" />
          <PageTitle>{validatedWaveData.name}</PageTitle>
        </div>
        <Button
          className="px-14"
          onClick={async () => {
            dispatch({ type: "RESET_STEPS" });
          }}
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{validatedWaveData.name}</CardTitle>
          <CardDescription>{validatedWaveData.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-y-8 rounded-2xl border p-6">
            <StagePreview title="Open" date={validatedWaveData.openStartDate} />
            <StagePreview
              title="Denoising"
              date={validatedWaveData.denoisingStartDate}
            />
            <StagePreview
              title="Assessment"
              date={validatedWaveData.assesmentStartDate}
            />
            <StagePreview title="Close" date={validatedWaveData.closeDate} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StagePreviewProps {
  title: string;
  date: Date;
}

function StagePreview({ title, date }: StagePreviewProps) {
  return (
    <div>
      <div className="mb-4 font-bold">{title}</div>
      <div
        className={buttonVariants({
          variant: "outline",
          className: "h-12 w-40 justify-start gap-2 hover:bg-transparent",
        })}
      >
        <CalendarIcon className="h-6 w-6" />
        {formatDate(date)}
      </div>
    </div>
  );
}
