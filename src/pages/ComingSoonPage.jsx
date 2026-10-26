// Placeholder for pages built in later phases, so links never hit a 404.

import { Link } from 'react-router';

export default function ComingSoonPage({ title, phase }) {
  return (
    <div className="container-page py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Coming in Phase {phase}</p>
      <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">This page hasn&apos;t been built yet.</p>
      <Link to="/listings" className="btn btn-primary mt-6">
        Browse listings
      </Link>
    </div>
  );
}
