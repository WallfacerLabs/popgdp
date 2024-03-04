"use client";

import { createContext, useContext, type ReactNode } from "react";

interface StepsContext {
  currentStep: number;
}

const StepsContext = createContext<StepsContext>({
  currentStep: 0,
});

export function StepsContextProvider({ children }: { children: ReactNode }) {
  return (
    <StepsContext.Provider value={{ currentStep: 0 }}>
      {children}
    </StepsContext.Provider>
  );
}

export function useStepsContext() {
  return useContext(StepsContext);
}
