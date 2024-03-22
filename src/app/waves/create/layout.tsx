import { type ReactNode } from "react";

import { WaveStepsContextProvider } from "./stepsProvider";

export default function CreateApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <WaveStepsContextProvider>{children}</WaveStepsContextProvider>;
}
