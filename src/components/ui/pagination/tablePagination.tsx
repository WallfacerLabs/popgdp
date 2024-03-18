"use client";

import { useSearchParams } from "next/navigation";

import { ELLIPSIS, getPaginationArray } from "./getPaginationArray";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function TablePagination({
  currentPage,
  totalPages,
}: TablePaginationProps) {
  const searchParams = useSearchParams();
  const getPaginationHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `?${params}` as const;
  };

  const pages = getPaginationArray({ currentPage, totalPages });

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage === 1}
            href={getPaginationHref(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            {page === ELLIPSIS ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                href={getPaginationHref(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={totalPages === currentPage}
            href={getPaginationHref(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
