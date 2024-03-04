import { BackButton } from "@/components/ui/backButton";

import { CreateApplicationStepper } from "./stepper";
import { GrantScoping } from "./steps/grantScoping";
import { MainDetails } from "./steps/mainDetails";
import { Resources } from "./steps/resources";
import { Roadmap } from "./steps/roadmap";
import { TeamInformation } from "./steps/teamInformation";
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
          <MainDetails />
          <TeamInformation />
          <GrantScoping />
          <Roadmap />
          <Resources />
        </CreateApplicationStepper>
      </StepsContextProvider>
    </>
  );
}
