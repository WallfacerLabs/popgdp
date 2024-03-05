"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

const LOCAL_STORAGE_KEY = "stepsState";

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

function localStorageStepsReducer(
  state: StepsState,
  action: StepsAction,
): StepsState {
  const newState = stepsReducer(state, action);

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }

  return newState;
}

function getInitialState(initialArgs: StepsState) {
  try {
    const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
  } catch (error) {
    console.error("Error reading from local storage", error);
  }

  return initialArgs;
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
  const [state, dispatch] = useReducer(
    localStorageStepsReducer,
    { currentStep: 0 },
    getInitialState,
  );

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
