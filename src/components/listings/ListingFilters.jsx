// Filter form for the listings page. Filters are only applied when the
// user taps "Show results", not on every keystroke, to save data.
// On phones the form is folded away behind a "Filters" button.

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormField from '../ui/FormField';
import { FilterIcon } from '../icons';
import { useAreas } from '../../hooks/useAreas';
import { BUDGET_OPTIONS, PROPERTY_TYPES } from '../../utils/constants';
import { formatNairaShort, stateLabel } from '../../utils/format';

const EMPTY = { area: '', state: '', type: '', minRent: '', maxRent: '' };

export default function ListingFilters({ values, onApply }) {
  const [open, setOpen] = useState(false);
  const { states } = useAreas();
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { ...EMPTY, ...values } });

  // When the URL changes (e.g. back button), show the matching filters.
  // Also re-run once the state list arrives: a <select> can't show "Lagos"
  // until a "Lagos" <option> exists.
  useEffect(() => {
    reset({ ...EMPTY, ...values });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), states.length, reset]);

  // Suggest areas in the chosen state (or every state)
  const chosenState = watch('state');
  const areaSuggestions = states
    .filter((s) => !chosenState || s.state === chosenState)
    .flatMap((s) => s.areas.map((a) => a.area));

  const activeCount = Object.keys(EMPTY).filter((key) => values[key]).length;

  function submit(formValues) {
    onApply(formValues);
    setOpen(false);
  }

  function clearAll() {
    reset(EMPTY);
    onApply(EMPTY);
    setOpen(false);
  }

  return (
    <div>
      {/* Mobile toggle */}
      <button
        type="button"
        className="btn btn-secondary w-full md:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="listing-filters"
      >
        <FilterIcon className="h-4 w-4" />
        Filters{activeCount > 0 && ` (${activeCount})`}
      </button>

      <form
        id="listing-filters"
        onSubmit={handleSubmit(submit)}
        className={`${open ? 'mt-3 block' : 'hidden'} card space-y-4 p-4 md:block`}
      >
        <FormField label="State" as="select" {...register('state')}>
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s.state} value={s.state}>
              {stateLabel(s.state)}
            </option>
          ))}
        </FormField>

        <FormField
          label="Area"
          placeholder="e.g. Yaba, Lekki, Gwarinpa"
          list="area-suggestions"
          autoComplete="off"
          {...register('area')}
        />
        <datalist id="area-suggestions">
          {areaSuggestions.map((area) => (
            <option key={area} value={area} />
          ))}
        </datalist>

        <FormField label="Apartment type" as="select" {...register('type')}>
          <option value="">Any type</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </FormField>

        <fieldset>
          <legend className="label">Yearly rent</legend>
          <div className="grid grid-cols-2 gap-2">
            <select className="input" aria-label="Minimum rent" {...register('minRent')}>
              <option value="">No min</option>
              {BUDGET_OPTIONS.map((amount) => (
                <option key={amount} value={amount}>
                  {formatNairaShort(amount)}
                </option>
              ))}
            </select>
            <select className="input" aria-label="Maximum rent" {...register('maxRent')}>
              <option value="">No max</option>
              {BUDGET_OPTIONS.map((amount) => (
                <option key={amount} value={amount}>
                  {formatNairaShort(amount)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <div className="flex gap-2 pt-1">
          <button type="submit" className="btn btn-primary flex-1">
            Show results
          </button>
          {activeCount > 0 && (
            <button type="button" className="btn btn-secondary" onClick={clearAll}>
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
