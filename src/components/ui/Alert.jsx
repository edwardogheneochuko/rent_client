// A coloured message box: <Alert type="error">Something went wrong</Alert>

import { CheckCircleIcon, WarningIcon } from '../icons';

const STYLES = {
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  success: 'border-brand-200 bg-brand-50 text-brand-800',
  info: 'border-gray-200 bg-gray-50 text-gray-700',
};

export default function Alert({ type = 'info', title, children, action }) {
  const Icon = type === 'success' ? CheckCircleIcon : WarningIcon;
  return (
    <div role={type === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-lg border p-3 text-sm ${STYLES[type]}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-0.5' : ''}>{children}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
