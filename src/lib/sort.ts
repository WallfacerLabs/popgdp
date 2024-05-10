import { compareObjectsByProperties, ObjectEndpoints } from "./comparison";

export function sortObjectsByKey<
  T extends object,
  Keys extends ObjectEndpoints<T>,
>(array: T[], keys: Keys, ascendingOrder: boolean) {
  return [...array].sort((a, b) =>
    compareObjectsByProperties(a, b, keys, ascendingOrder),
  );
}
