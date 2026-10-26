// Listings search page. All filters live in the URL
// (/listings?area=Yaba&type=mini-flat&page=2), so results can be shared on
// WhatsApp and the back button works as expected.

import { useSearchParams } from 'react-router';

import ListingCard, { ListingCardSkeleton } from '../components/listings/ListingCard';
import ListingFilters from '../components/listings/ListingFilters';
import Alert from '../components/ui/Alert';
import Pagination from '../components/ui/Pagination';
import { getListings } from '../api/listings';
import { getErrorMessage } from '../api/client';
import { useAsync } from '../hooks/useAsync';
import { LISTINGS_PER_PAGE, SORT_OPTIONS } from '../utils/constants';
import { formatNairaShort, stateLabel, typeLabel } from '../utils/format';

const FILTER_KEYS = ['area', 'state', 'type', 'minRent', 'maxRent', 'sort', 'page'];

// Read only the filters we know about from the URL
function readFilters(searchParams) {
  const filters = {};
  FILTER_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  });
  return filters;
}

// e.g. "2 bedroom homes in Lekki under ₦5m"
function describeSearch(filters) {
  const what = filters.type ? `${typeLabel(filters.type)} homes` : 'Homes';
  const where = filters.area || (filters.state && stateLabel(filters.state));
  const budget = filters.maxRent ? ` under ${formatNairaShort(filters.maxRent)}` : '';
  return `${what}${where ? ` in ${where}` : ''}${budget}`;
}

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readFilters(searchParams);
  const queryKey = searchParams.toString();

  const { data, error, loading, reload } = useAsync(
    (signal) => getListings({ ...filters, limit: LISTINGS_PER_PAGE }, signal),
    [queryKey]
  );

  // Replace the filters in the URL (empty values removed, back to page 1)
  function updateFilters(changes) {
    const next = { ...filters, ...changes };
    delete next.page;
    if (changes.page) next.page = String(changes.page);
    Object.keys(next).forEach((key) => {
      if (!next[key]) delete next[key];
    });
    setSearchParams(next);
  }

  function goToPage(page) {
    updateFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const total = data?.pagination.total;

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">{describeSearch(filters)}</h1>
        <p className="mt-1 text-sm text-gray-600" aria-live="polite">
          {loading && !data ? 'Searching…' : total !== undefined && `${total} ${total === 1 ? 'listing' : 'listings'} found`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside>
          <ListingFilters values={filters} onApply={updateFilters} />
        </aside>

        <section aria-label="Results">
          <div className="mb-4 flex justify-end">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              Sort by
              <select
                className="input w-auto py-1.5"
                value={filters.sort || 'newest'}
                onChange={(e) => updateFilters({ sort: e.target.value === 'newest' ? '' : e.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <Alert type="error" action={<button type="button" className="btn btn-secondary" onClick={reload}>Try again</button>}>
              {getErrorMessage(error)}
            </Alert>
          )}

          {!error && loading && !data && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!error && data && data.items.length === 0 && (
            <div className="card p-8 text-center">
              <p className="font-semibold">No listings match your search</p>
              <p className="mt-1 text-sm text-gray-600">Try a nearby area, another apartment type, or a higher budget.</p>
              <button type="button" className="btn btn-secondary mt-4" onClick={() => setSearchParams({})}>
                Clear all filters
              </button>
            </div>
          )}

          {!error && data && data.items.length > 0 && (
            // Fade old results slightly while new ones load
            <div className={`grid gap-4 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${loading ? 'opacity-50' : ''}`}>
              {data.items.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          <Pagination pagination={data?.pagination} onPageChange={goToPage} />
        </section>
      </div>
    </div>
  );
}
