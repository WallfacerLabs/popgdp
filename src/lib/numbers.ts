type FractionsConfig = {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

const fractionsConfigDefault: FractionsConfig = {
  maximumFractionDigits: 2,
};

export function formatNumber(
  value: number,
  fractionsConfig: FractionsConfig = fractionsConfigDefault,
) {
  const formatterConfig = {
    ...fractionsConfig,
    compactDisplay: "short",
    roundingMode: "floor",
  } as Intl.NumberFormatOptions;
  const formatter = new Intl.NumberFormat("en-US", formatterConfig);
  return formatter.format(value);
}
