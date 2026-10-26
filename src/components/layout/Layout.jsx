// The frame around every page: header on top, footer at the bottom, and
// the current page rendered in between by <Outlet />.

import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import { PageSpinner } from '../ui/Spinner';

export default function Layout() {
  const { pathname } = useLocation();

  // Start each new page at the top, like a normal website
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 btn btn-primary">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {/* Pages are loaded on demand (see App.jsx); show a spinner meanwhile */}
        <Suspense fallback={<PageSpinner label="Loading page" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
