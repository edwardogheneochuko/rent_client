// Shown for any URL that doesn't match a route.

import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="container-page py-16 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-600">The link may be broken, or the page may have been removed.</p>
      <Link to="/" className="btn btn-primary mt-6">
        Go home
      </Link>
    </div>
  );
}
