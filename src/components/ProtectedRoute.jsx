// Wrap routes that need a signed-in user (and optionally a certain role).
//
//   <Route element={<ProtectedRoute />}> ...pages for any signed-in user... </Route>
//   <Route element={<ProtectedRoute roles={['admin']} />}> ...admin pages... </Route>
//
// Guests are sent to /login, which sends them back here after signing in.

import { Link, Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '../context/AuthContext';
import { PageSpinner } from './ui/Spinner';
import Alert from './ui/Alert';

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking the session; don't redirect too early
  if (loading) return <PageSpinner label="Checking your session" />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="container-page py-12">
        <Alert type="error" title="You don't have access to this page" action={<Link to="/" className="btn btn-secondary">Go home</Link>}>
          This page is only for {roles.join(' or ')} accounts.
        </Alert>
      </div>
    );
  }

  return <Outlet />;
}
