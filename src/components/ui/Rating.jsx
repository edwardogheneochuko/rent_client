// Compact star rating, e.g. "★ 4.3 (12)". Shows "No reviews yet" when empty.

import { StarIcon } from '../icons';

export default function Rating({ value, count, className = '' }) {
  if (!count) {
    return <span className={`text-xs text-gray-500 ${className}`}>No reviews yet</span>;
  }
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-gray-700 ${className}`}
      aria-label={`Rated ${value} out of 5 from ${count} review${count === 1 ? '' : 's'}`}
    >
      <StarIcon className="h-3.5 w-3.5 text-amber-400" />
      <span className="font-semibold">{Number(value).toFixed(1)}</span>
      <span className="text-gray-500">({count})</span>
    </span>
  );
}
