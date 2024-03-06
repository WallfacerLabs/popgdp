import { CreateApplicationStepper } from "./stepper";
import { GrantScoping } from "./steps/grantScoping";
import { MainDetails } from "./steps/mainDetails";
import { Resources } from "./steps/resources";
import { Roadmap } from "./steps/roadmap";
import { TeamInformation } from "./steps/teamInformation";
import { StepsContextProvider } from "./stepsProvider";

export interface CreateApplicationFormProps {
  waveId: number;
}

export function Form({ waveId }: CreateApplicationFormProps) {
  return (
    <StepsContextProvider>
      <CreateApplicationStepper>
        <MainDetails />
        <TeamInformation />
        <GrantScoping />
        <Roadmap />
        <Resources waveId={waveId} />
      </CreateApplicationStepper>
    </StepsContextProvider>
  );
}
