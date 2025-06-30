"use client";

import { Button } from "@/shared/components/atoms/ui/button";

interface DestinationsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPages(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 4) pages.push(-1); // -1 = ellipsis
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 3) pages.push(-2); // -2 = ellipsis
  pages.push(total);
  return pages;
}

export default function DestinationsPagination({ page, totalPages, onPageChange }: DestinationsPaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);
  return (
    <nav className="flex justify-center items-center gap-2 my-8" aria-label="Pagination">
      <Button
        size="sm"
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Page précédente"
      >
        Précédent
      </Button>
      {pages.map((p, i) =>
        p < 0 ? (
          <span key={i} className="px-2 text-gray-400 select-none">…</span>
        ) : (
          <Button
            key={p}
            size="sm"
            variant={p === page ? "default" : "ghost"}
            aria-current={p === page ? "page" : undefined}
            onClick={() => p !== page && onPageChange(p)}
            className={p === page ? "font-bold border-primary border" : ""}
            tabIndex={0}
          >
            {p}
          </Button>
        )
      )}
      <Button
        size="sm"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Page suivante"
      >
        Suivant
      </Button>
    </nav>
  );
}
