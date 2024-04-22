const GREATER_A = 1;
const GREATER_B = -1;

export type ObjectEndpoints<T> = {
  [K in keyof Required<T>]: T[K] extends Date
    ? [K]
    : T[K] extends object
      ? T[K] extends Array<any>
        ? never
        : [K, ...ObjectEndpoints<Required<T[K]>>]
      : [K];
}[keyof T];

type WalkObject<T extends object, Keys> = Keys extends [
  infer Key,
  ...infer Rest,
]
  ? Key extends keyof T
    ? Rest extends []
      ? T[Key]
      : Rest extends string[]
        ? T[Key] extends object
          ? WalkObject<T[Key], Rest>
          : never
        : never
    : never
  : never;

function getPrimitiveValues<T extends object, Keys extends ObjectEndpoints<T>>(
  a: T,
  b: T,
  keys: Keys,
): [WalkObject<T, Keys> | undefined, WalkObject<T, Keys> | undefined] {
  let valueA: any = a;
  let valueB: any = b;

  for (const key of keys) {
    valueA = valueA?.[key];
    valueB = valueB?.[key];
  }

  return [valueA, valueB];
}

function compareValues<T extends string | number | Date | undefined>(
  a: T,
  b: T,
) {
  if (a === undefined) return GREATER_B;
  if (b === undefined) return GREATER_A;
  return a >= b ? GREATER_A : GREATER_B;
}

function orderedCompare<T extends string | number | Date | undefined>(
  a: T,
  b: T,
  ascendingOrder: boolean,
) {
  const comparatorResult = compareValues(a, b);
  return ascendingOrder ? comparatorResult : -comparatorResult;
}

export function compareObjectsByProperties<
  T extends object,
  Keys extends ObjectEndpoints<T>,
>(a: T, b: T, keys: Keys, ascendingOrder: boolean) {
  const [valueA, valueB] = getPrimitiveValues(a, b, keys);

  return orderedCompare(valueA, valueB, ascendingOrder);
}
