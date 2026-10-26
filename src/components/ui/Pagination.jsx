// Previous / Next page controls. Deliberately simple: a long row of page
// numbers is hard to tap on a phone.

import { ChevronLeftIcon, ChevronRightIcon } from '../icons';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) return null;
  const { page, pages, hasPrevPage, hasNextPage } = pagination;

  return (
    <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </button>
      <p className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{page}</span> of {pages}
      </p>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
