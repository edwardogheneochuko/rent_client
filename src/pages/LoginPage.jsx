// Sign in page. After signing in, the user returns to the page they were
// trying to open (if a ProtectedRoute sent them here), or the home page.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

import FormField from '../components/ui/FormField';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname}${from.search || ''}` : '/';

  // Already signed in? Nothing to do here.
  if (user) return <Navigate to={redirectTo} replace />;

  async function onSubmit(values) {
    setFormError('');
    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(getErrorMessage(err));
    }
  }

  return (
    <div className="container-page flex justify-center py-10">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Sign in to write reviews and report scams.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          {formError && <Alert type="error">{formError}</Alert>}

          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            {...register('email', { required: 'Email is required' })}
          />
          <FormField
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password}
            {...register('password', { required: 'Password is required' })}
          />

          <button type="submit" className="btn btn-primary w-full py-3" disabled={isSubmitting}>
            {isSubmitting ? <Spinner label="Signing in" className="h-4 w-4" /> : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to RentRight?{' '}
          <Link to="/register" state={location.state} className="font-semibold text-brand-700 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
