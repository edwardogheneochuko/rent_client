// Home page: search, recent listings, scam check and a short "why us".

import { Link } from 'react-router';

import SearchBar from '../components/home/SearchBar';
import ScamCheckBox from '../components/home/ScamCheckBox';
import ListingCard, { ListingCardSkeleton } from '../components/listings/ListingCard';
import Alert from '../components/ui/Alert';
import { ChartIcon, ShieldIcon, StarIcon } from '../components/icons';
import { getListings } from '../api/listings';
import { getErrorMessage } from '../api/client';
import { useAsync } from '../hooks/useAsync';

const FEATURES = [
  {
    icon: ChartIcon,
    title: 'The real move-in cost',
    text: 'Rent + agent fee + legal fee + caution + service charge, added up for you. No surprises at signing.',
  },
  {
    icon: StarIcon,
    title: 'Honest tenant reviews',
    text: 'Light, water, security, flooding and how the landlord behaves, from people who lived there.',
  },
  {
    icon: ShieldIcon,
    title: 'Scam check',
    text: 'Search a phone or account number before you send any money for inspection or rent.',
  },
];

export default function HomePage() {
  // Six newest available listings. Small limit = small download.
  const { data, error, loading, reload } = useAsync((signal) => getListings({ limit: 6 }, signal), []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-700 to-brand-600 text-white">
        <div className="container-page py-12 sm:py-16">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Know the full cost before you move.
          </h1>
          <p className="mt-3 max-w-xl text-brand-50">
            Find a home in Lagos or Abuja with every fee shown upfront, real reviews from past tenants, and a scam
            check before you pay.
          </p>
          <div className="mt-6 max-w-4xl text-gray-900">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Recent listings */}
      <section className="container-page py-10" aria-labelledby="recent-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 id="recent-heading" className="text-xl font-bold">Recently listed</h2>
          <Link to="/listings" className="text-sm font-semibold text-brand-700 hover:underline">
            See all →
          </Link>
        </div>

        {error ? (
          <Alert type="error" action={<button type="button" className="btn btn-secondary" onClick={reload}>Try again</button>}>
            {getErrorMessage(error)}
          </Alert>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading && !data
              ? Array.from({ length: 6 }, (_, i) => <ListingCardSkeleton key={i} />)
              : data.items.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
          </div>
        )}
      </section>

      {/* Scam check + features */}
      <section className="container-page grid gap-8 pb-4 lg:grid-cols-2">
        <ScamCheckBox />
        <div className="space-y-5">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
