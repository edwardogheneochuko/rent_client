// A labelled form input that shows its validation error underneath.
// Works with React Hook Form: pass the result of register('fieldName').
//
//   <FormField label="Email" type="email" error={errors.email} {...register('email')} />

import { useId } from 'react';

export default function FormField({ label, error, hint, as = 'input', children, className = '', ...inputProps }) {
  const id = useId();
  const Component = as; // 'input' or 'select'
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <Component
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        {...inputProps}
      >
        {children}
      </Component>
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error.message}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
