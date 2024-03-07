import { CreateApplicationStepper } from "./stepper";
import { GrantScoping } from "./steps/grantScoping";
import { MainDetails } from "./steps/mainDetails";
import { Resources } from "./steps/resources";
import { Roadmap } from "./steps/roadmap";
import { TeamInformation } from "./steps/teamInformation";

export function Form() {
  return (
    <>
      <CreateApplicationStepper>
        <MainDetails />
        <TeamInformation />
        <GrantScoping />
        <Roadmap />
        <Resources />
      </CreateApplicationStepper>
    </>
  );
}
