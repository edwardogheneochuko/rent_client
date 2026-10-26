// Sign up page. Field errors from the server (e.g. "email already exists")
// are shown under the matching input.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

import FormField from '../components/ui/FormField';
import Alert from '../components/ui/Alert';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage, getFieldErrors } from '../api/client';
import { SIGNUP_ROLES } from '../utils/constants';

// Same rule as the server: 0803..., +234803..., 234803... or 803...
const NIGERIAN_PHONE = /^(\+?234|0)?[789][01]\d{8}$/;

export default function RegisterPage() {
  const { user, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: 'tenant', name: '', email: '', phone: '', password: '' },
  });

  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname}${from.search || ''}` : '/';
  if (user) return <Navigate to={redirectTo} replace />;

  async function onSubmit(values) {
    setFormError('');
    try {
      await registerUser({ ...values, phone: values.phone || undefined });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const fieldErrors = getFieldErrors(err);
      if (fieldErrors.length > 0) {
        fieldErrors.forEach(({ field, message }) => setError(field, { message }));
      } else if (err.response?.status === 409) {
        setError('email', { message: getErrorMessage(err) });
      } else {
        setFormError(getErrorMessage(err));
      }
    }
  }

  return (
    <div className="container-page flex justify-center py-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">Free, and it takes a minute.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          {formError && <Alert type="error">{formError}</Alert>}

          <fieldset>
            <legend className="label">Which describes you?</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {SIGNUP_ROLES.map((role) => (
                <label
                  key={role.value}
                  className="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-3 text-sm has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:ring-1 has-[:checked]:ring-brand-600"
                >
                  <input type="radio" value={role.value} className="sr-only" {...register('role')} />
                  <span className="font-semibold">{role.hint}</span>
                  <span className="text-gray-600">{role.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <FormField
            label="Full name"
            autoComplete="name"
            error={errors.name}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
          />
          <FormField
            label="Phone number (optional)"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0803 123 4567"
            hint="Agents and landlords: tenants will see this on your listings."
            error={errors.phone}
            {...register('phone', {
              validate: (value) =>
                !value || NIGERIAN_PHONE.test(value.replace(/[\s-]/g, '')) || 'Enter a valid Nigerian phone number',
            })}
          />
          <FormField
            label="Password"
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters, with a letter and a number."
            error={errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              validate: (value) =>
                (/[A-Za-z]/.test(value) && /\d/.test(value)) || 'Password must contain a letter and a number',
            })}
          />

          <button type="submit" className="btn btn-primary w-full py-3" disabled={isSubmitting}>
            {isSubmitting ? <Spinner label="Creating account" className="h-4 w-4" /> : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" state={location.state} className="font-semibold text-brand-700 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
