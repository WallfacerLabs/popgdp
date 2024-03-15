interface GetPageNumbersArgs {
  currentPage: number;
  totalPages: number;
}

type PageItem = number | typeof ELLIPSIS;

export const getRange = (start: number, end: number): PageItem[] => {
  const rangeLength = end - start + 1;
  return Array(rangeLength)
    .fill(0)
    .map((_, i) => i + start);
};

function clamp(value: number, lower: number, upper: number) {
  return Math.min(Math.max(value, lower), upper);
}

const MAX_ELEMENTS = 7;
export const ELLIPSIS = "...";

export function getPaginationArray({
  currentPage,
  totalPages,
}: GetPageNumbersArgs): PageItem[] {
  const offset = (MAX_ELEMENTS - 1) / 2;
  const shouldAddEllipsis = totalPages > MAX_ELEMENTS;

  const rangeConfig = {
    start: clamp(
      currentPage - offset,
      1,
      shouldAddEllipsis ? totalPages - MAX_ELEMENTS + 1 : 1,
    ),
    end: clamp(currentPage + offset, MAX_ELEMENTS, totalPages),
  };

  const pages = getRange(rangeConfig.start, rangeConfig.end);

  if (shouldAddEllipsis && pages[0] !== 1) {
    pages[0] = 1;
    pages[1] = ELLIPSIS;
  }

  if (shouldAddEllipsis && pages[pages.length - 1] !== totalPages) {
    pages[pages.length - 1] = totalPages;
    pages[pages.length - 2] = ELLIPSIS;
  }

  return pages;
}
