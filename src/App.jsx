// All the app's pages (routes) in one place.
//
// Pages are loaded with React.lazy, so the browser only downloads the code
// for a page when someone visits it. This keeps the first load small.

import { lazy } from 'react';
import { Route, Routes } from 'react-router';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const ListingsPage = lazy(() => import('./pages/ListingsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Routes>
      {/* Every page shares the header/footer from Layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Phase 4 */}
        <Route path="listings/:id" element={<ComingSoonPage title="Listing details" phase={4} />} />
        <Route path="agents/:id" element={<ComingSoonPage title="Agent profile" phase={4} />} />
        <Route path="landlords/:id" element={<ComingSoonPage title="Landlord profile" phase={4} />} />
        <Route path="scams" element={<ComingSoonPage title="Scam check" phase={4} />} />
        <Route path="insights" element={<ComingSoonPage title="Rent prices" phase={5} />} />

        {/* Signed-in users only */}
        <Route element={<ProtectedRoute />}>
          <Route path="scams/report" element={<ComingSoonPage title="Report a scam" phase={4} />} />
          <Route path="reviews/new" element={<ComingSoonPage title="Write a review" phase={4} />} />
          <Route path="dashboard" element={<ComingSoonPage title="Your dashboard" phase={5} />} />
        </Route>

        {/* Admins only */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="admin" element={<ComingSoonPage title="Moderation" phase={5} />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
