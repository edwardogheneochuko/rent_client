// Site footer.

import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-gray-900">RentRight Naija</span>: know the full cost before you move.
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          <Link to="/listings" className="hover:text-brand-700">Listings</Link>
          <Link to="/scams" className="hover:text-brand-700">Scam check</Link>
          <Link to="/scams/report" className="hover:text-brand-700">Report a scam</Link>
          <Link to="/insights" className="hover:text-brand-700">Rent prices</Link>
        </nav>
      </div>
      <p className="container-page pb-6 text-xs text-gray-500">
        Never pay for a property you haven&apos;t inspected, and confirm the landlord&apos;s ownership first.
      </p>
    </footer>
  );
}
