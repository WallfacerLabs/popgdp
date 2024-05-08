import { z } from "zod";

export const LOCAL_STORAGE_KEYS = {
  waveStepsData: "waveStepsData",
  applicationStepsData: "applicationStepsData",
  commentData: "commentData",
} as const;

export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

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
