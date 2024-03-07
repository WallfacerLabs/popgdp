import { type ReactNode } from "react";

import { StepsContextProvider } from "./stepsProvider";

export default function CreateApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <StepsContextProvider>{children}</StepsContextProvider>;
}
