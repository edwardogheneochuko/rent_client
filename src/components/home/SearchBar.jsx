// Home page search: area + apartment type + budget. Sends the user to the
// listings page with those filters in the URL.

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { SearchIcon } from '../icons';
import { useAreas } from '../../hooks/useAreas';
import { BUDGET_OPTIONS, PROPERTY_TYPES } from '../../utils/constants';
import { formatNairaShort } from '../../utils/format';

export default function SearchBar() {
  const navigate = useNavigate();
  const { allAreas } = useAreas();
  const { register, handleSubmit } = useForm({ defaultValues: { area: '', type: '', maxRent: '' } });

  function onSubmit(values) {
    // Only include filters the user actually set
    const params = new URLSearchParams(Object.entries(values).filter(([, value]) => value));
    navigate(`/listings?${params}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 sm:grid-cols-[1.4fr_1fr_1fr_auto]"
      role="search"
    >
      <label className="sr-only" htmlFor="search-area">Area</label>
      <input
        id="search-area"
        className="input border-transparent bg-gray-50"
        placeholder="Area, e.g. Yaba or Gwarinpa"
        list="home-area-suggestions"
        autoComplete="off"
        {...register('area')}
      />
      <datalist id="home-area-suggestions">
        {allAreas.map((area) => (
          <option key={area} value={area} />
        ))}
      </datalist>

      <label className="sr-only" htmlFor="search-type">Apartment type</label>
      <select id="search-type" className="input border-transparent bg-gray-50" {...register('type')}>
        <option value="">Any type</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="search-budget">Maximum yearly rent</label>
      <select id="search-budget" className="input border-transparent bg-gray-50" {...register('maxRent')}>
        <option value="">Any budget</option>
        {BUDGET_OPTIONS.map((amount) => (
          <option key={amount} value={amount}>
            Up to {formatNairaShort(amount)}/yr
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-primary py-3 sm:py-2.5">
        <SearchIcon className="h-5 w-5" />
        Search
      </button>
    </form>
  );
}
