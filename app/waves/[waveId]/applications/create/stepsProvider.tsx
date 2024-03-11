"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { z } from "zod";

import { grantScopingSchema } from "./steps/grantScoping";
import { mainDetailsSchema } from "./steps/mainDetails";
import { resourcesSchema } from "./steps/resources";
import { roadmapSchema } from "./steps/roadmap";
import { teamInformationSchema } from "./steps/teamInformation";

const LOCAL_STORAGE_KEY = "stepsState";

const applicationDataSchema = mainDetailsSchema
  .merge(teamInformationSchema)
  .merge(grantScopingSchema)
  .merge(roadmapSchema)
  .merge(resourcesSchema);
export type ApplicationData = z.infer<typeof applicationDataSchema>;

const stepsStateSchema = z.object({
  currentStep: z.number(),
  applicationData: applicationDataSchema,
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
    } catch (error) {
      console.error("Error reading from local storage", error);
    }
  }

  return initialArgs;
}

const StepsContext = createContext<StepsState>({
  currentStep: 0,
  applicationData: {} as ApplicationData,
});

const StepsDispatchContext = createContext<Dispatch<StepsAction>>(
  null as any as Dispatch<StepsAction>,
);

export function StepsContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    localStorageStepsReducer,
    { currentStep: 0, applicationData: {} as ApplicationData },
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
