// "Check before you pay": search a phone number, account number or name
// for confirmed scam reports, with the result shown right here.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import { ShieldIcon } from '../icons';
import { checkScam } from '../../api/scams';
import { getErrorMessage } from '../../api/client';
import { formatPhone } from '../../utils/format';

export default function ScamCheckBox() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ defaultValues: { query: '' } });

  async function onSubmit({ query }) {
    setError('');
    setResult(null);
    try {
      setResult(await checkScam(query.trim()));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <section className="card p-5 sm:p-6" aria-labelledby="scam-check-heading">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <div>
          <h2 id="scam-check-heading" className="text-lg font-semibold">Check before you pay</h2>
          <p className="text-sm text-gray-600">
            Search an agent&apos;s phone number, bank account number or name for confirmed scam reports.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="scam-query" className="sr-only">Phone, account number or name</label>
        <input
          id="scam-query"
          className={`input ${errors.query ? 'input-error' : ''}`}
          placeholder="e.g. 0803 123 4567 or 0123456789"
          autoComplete="off"
          {...register('query', {
            required: 'Enter a phone number, account number or name',
            minLength: { value: 3, message: 'Enter at least 3 characters' },
          })}
        />
        <button type="submit" className="btn btn-primary shrink-0" disabled={isSubmitting}>
          {isSubmitting ? <Spinner label="Checking" className="h-4 w-4" /> : 'Check now'}
        </button>
      </form>
      {errors.query && <p className="field-error">{errors.query.message}</p>}

      <div className="mt-4 space-y-3" aria-live="polite">
        {error && <Alert type="error">{error}</Alert>}

        {result?.flagged && (
          <Alert type="error" title={result.message}>
            <ul className="mt-1 space-y-1">
              {result.items.slice(0, 3).map((report) => (
                <li key={report._id}>
                  <span className="font-medium">{report.name || 'Unnamed'}</span>
                  {report.phone && <> · {formatPhone(report.phone)}</>}
                  {report.accountNumber && <> · {report.bankName} {report.accountNumber}</>}
                </li>
              ))}
            </ul>
          </Alert>
        )}

        {result && !result.flagged && <Alert type="success" title="No confirmed reports found">{result.message}</Alert>}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Been scammed?{' '}
        <Link to="/scams/report" className="font-medium text-brand-700 underline-offset-2 hover:underline">
          Report it to warn others
        </Link>
      </p>
    </section>
  );
}
