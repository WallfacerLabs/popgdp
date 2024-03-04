"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

interface StepsState {
  currentStep: number;
}

type StepsAction =
  | {
      type: "INCREMENT_STEP";
    }
  | { type: "DECREMENT_STEP" };

function stepsReducer(state: StepsState, action: StepsAction): StepsState {
  switch (action.type) {
    case "INCREMENT_STEP": {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case "DECREMENT_STEP": {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
  }
}

interface StepsContext {
  currentStep: number;
}

const StepsContext = createContext<StepsState>({
  currentStep: 0,
});

const StepsDispatchContext = createContext<Dispatch<StepsAction>>(
  null as any as Dispatch<StepsAction>,
);

export function StepsContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stepsReducer, { currentStep: 0 });

  return (
    <StepsContext.Provider value={state}>
      <StepsDispatchContext.Provider value={dispatch}>
        {children}
      </StepsDispatchContext.Provider>
    </StepsContext.Provider>
  );
}

export function useStepsContext() {
  return useContext(StepsContext);
}

export function useStepsDispatchContext() {
  return useContext(StepsDispatchContext);
}
