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

import { grantScopingSchema } from "./steps/grantScoping";
import { mainDetailsSchema } from "./steps/mainDetails";
import { resourcesSchema } from "./steps/resources";
import { roadmapSchema } from "./steps/roadmap";
import { teamInformationSchema } from "./steps/teamInformation/teamInformation";

export const applicationDataSchema = mainDetailsSchema
  .merge(teamInformationSchema)
  .merge(grantScopingSchema)
  .merge(roadmapSchema)
  .merge(resourcesSchema);
export type ApplicationData = z.infer<typeof applicationDataSchema>;

const stepsStateSchema = z.object({
  currentStep: z.number(),
  applicationData: applicationDataSchema.partial(),
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
      type: "UPDATE_APPLICATION_DATA";
      payload: Partial<ApplicationData>;
    };

function stepsReducer(state: StepsState, action: StepsAction): StepsState {
  switch (action.type) {
    case "UPDATE_APPLICATION_DATA": {
      return {
        ...state,
        applicationData: {
          ...state.applicationData,
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
  saveToLocalStorage(LOCAL_STORAGE_KEYS.applicationStepsData, newState);
  return newState;
}

function getInitialState(initialArgs: StepsState): StepsState {
  return getLocalStorageValue(
    stepsStateSchema,
    LOCAL_STORAGE_KEYS.applicationStepsData,
    initialArgs,
  );
}

const initialStepsState: StepsState = {
  currentStep: 0,
  applicationData: {} as ApplicationData,
};

const StepsContext = createContext<StepsState>(initialStepsState);

const StepsDispatchContext = createContext<Dispatch<StepsAction>>(
  null as any as Dispatch<StepsAction>,
);

export function StepsContextProvider({ children }: { children: ReactNode }) {
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

export function useStepsContext() {
  return useContext(StepsContext);
}

export function useStepsDispatchContext() {
  return useContext(StepsDispatchContext);
}
