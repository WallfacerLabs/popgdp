"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { z } from "zod";

import {
  getLocalStorageValue,
  LOCAL_STORAGE_KEYS,
  saveToLocalStorage,
} from "@/lib/localStorage";

import { mainDetailsSchema } from "./steps/mainDetails.schema";
import { timelineSchema } from "./steps/timeline.schema";

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
  }
}

function localStorageStepsReducer(
  state: StepsState,
  action: StepsAction,
): StepsState {
  const newState = stepsReducer(state, action);
  saveToLocalStorage(LOCAL_STORAGE_KEYS.waveStepsData, newState);
  return newState;
}

function getInitialState(initialArgs: StepsState): StepsState {
  return getLocalStorageValue(
    stepsStateSchema,
    LOCAL_STORAGE_KEYS.waveStepsData,
    initialArgs,
  );
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
