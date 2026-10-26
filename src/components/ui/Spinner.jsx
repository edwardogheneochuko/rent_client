// A loading spinner. Use `label` to tell screen-reader users what's loading.

export default function Spinner({ label = 'Loading', className = 'h-6 w-6' }) {
  return (
    <span role="status" className="inline-flex items-center gap-2 text-gray-500">
      <svg className={`animate-spin text-brand-600 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** A spinner centred in a block, for whole-page or section loading. */
export function PageSpinner({ label }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner label={label} className="h-8 w-8" />
    </div>
  );
}
