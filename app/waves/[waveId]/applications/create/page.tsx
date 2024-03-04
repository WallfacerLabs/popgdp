import { BackButton } from "@/components/ui/backButton";

import { CreateApplicationStepper } from "./stepper";
import { MainDetails } from "./steps/mainDetails";
import { StepsContextProvider } from "./stepsProvider";

export default function CreateApplication({
  params,
}: {
  params: { waveId: string };
}) {
  return (
    <>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={`/waves/${params.waveId}`} />
        <h2 className="text-2xl font-bold">Apply for the Grant</h2>
      </div>

      <StepsContextProvider>
        <CreateApplicationStepper>
          <MainDetails waveId={params.waveId} />
          <div>Step 2</div>
        </CreateApplicationStepper>
      </StepsContextProvider>
    </>
  );
}
