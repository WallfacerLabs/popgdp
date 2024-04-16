import { compareObjectsByProperties, ObjectEndpoints } from "./comparison";

export function sortObjectsByKey<
  T extends object,
  Keys extends ObjectEndpoints<T>,
>(vaults: T[], keys: Keys, ascendingOrder: boolean) {
  return [...vaults].sort((a, b) =>
    compareObjectsByProperties(a, b, keys, ascendingOrder),
  );
}
