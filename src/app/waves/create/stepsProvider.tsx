"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { z } from "zod";

import { mainDetailsSchema } from "./steps/mainDetails";
import { timelineSchema } from "./steps/timeline";

const LOCAL_STORAGE_KEY = "waveStepsState";

export const waveDataSchema = mainDetailsSchema.merge(timelineSchema);
export type WaveData = z.infer<typeof waveDataSchema>;

const stepsStateSchema = z.object({
  currentStep: z.number(),
  waveData: waveDataSchema.partial(),
});
type StepsState = z.infer<typeof stepsStateSchema>;

type StepsAction =
  | {
      type: "INCREMENT_STEP";
    }
  | {
      type: "DECREMENT_STEP";
    }
  | {
      type: "UPDATE_WAVE_DATA";
      payload: Partial<WaveData>;
    }
  | {
      type: "RESET_STEPS";
    };

function stepsReducer(state: StepsState, action: StepsAction): StepsState {
  switch (action.type) {
    case "UPDATE_WAVE_DATA": {
      return {
        ...state,
        waveData: {
          ...state.waveData,
          ...action.payload,
        },
      };
    }
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
    case "RESET_STEPS": {
      return initialStepsState;
    }
  }
}

function localStorageStepsReducer(
  state: StepsState,
  action: StepsAction,
): StepsState {
  const newState = stepsReducer(state, action);

  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  }

  return newState;
}

function getInitialState(initialArgs: StepsState): StepsState {
  if (typeof localStorage !== "undefined") {
    try {
      const localStorageValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localStorageValue) {
        return stepsStateSchema.parse(JSON.parse(localStorageValue));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return initialArgs;
}

const initialStepsState: StepsState = {
  currentStep: 0,
  waveData: {} as WaveData,
};

const StepsContext = createContext<StepsState>(initialStepsState);

const StepsDispatchContext = createContext<Dispatch<StepsAction>>(
  null as any as Dispatch<StepsAction>,
);

export function WaveStepsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    localStorageStepsReducer,
    initialStepsState,
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

export function useWaveStepsContext() {
  return useContext(StepsContext);
}

export function useWaveStepsDispatchContext() {
  return useContext(StepsDispatchContext);
}
