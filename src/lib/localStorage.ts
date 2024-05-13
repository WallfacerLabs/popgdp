import { z } from "zod";

import { ApplicationId } from "@/types/Application";

export const LOCAL_STORAGE_KEYS = {
  waveStepsData: "waveStepsData",
  applicationStepsData: "applicationStepsData",
  commentData: (applicationId: ApplicationId) =>
    `commentData-${applicationId}` as const,
} as const;

type LocalStorageValueMapping = {
  [Key in keyof typeof LOCAL_STORAGE_KEYS]: (typeof LOCAL_STORAGE_KEYS)[Key] extends (
    ...args: any[]
  ) => any
    ? ReturnType<(typeof LOCAL_STORAGE_KEYS)[Key]>
    : (typeof LOCAL_STORAGE_KEYS)[Key];
};

export type LocalStorageKey =
  LocalStorageValueMapping[keyof LocalStorageValueMapping];

export function getLocalStorageValue<T extends z.ZodTypeAny>(
  schema: T,
  localStorageKey: LocalStorageKey,
  defaultValues: T["_output"],
): T["_output"] {
  if (typeof localStorage !== "undefined") {
    try {
      const localStorageValue = localStorage.getItem(localStorageKey);
      if (localStorageValue) {
        return schema.parse(JSON.parse(localStorageValue));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return defaultValues;
}

export function saveToLocalStorage(key: LocalStorageKey, value: unknown) {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  }
}

export function removeLocalStorageItem(key: LocalStorageKey) {
  if (typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from local storage", error);
    }
  }
}
