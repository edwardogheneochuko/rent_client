// Formatting helpers for money, phone numbers and labels.

import { PROPERTY_TYPES, STATE_LABELS } from './constants';

const nairaFormatter = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 });

/** 1500000 -> "₦1,500,000" */
export function formatNaira(amount) {
  return `₦${nairaFormatter.format(Math.round(Number(amount) || 0))}`;
}

/** Short form for tight spaces: 1500000 -> "₦1.5m", 750000 -> "₦750k" */
export function formatNairaShort(amount) {
  const value = Number(amount) || 0;
  if (value >= 1_000_000) {
    return `₦${Number((value / 1_000_000).toFixed(1))}m`;
  }
  if (value >= 1_000) return `₦${Math.round(value / 1_000)}k`;
  return `₦${value}`;
}

/** "2348031234567" -> "0803 123 4567" */
export function formatPhone(phone) {
  if (!phone) return '';
  const local = phone.startsWith('234') ? `0${phone.slice(3)}` : phone;
  return local.replace(/^(\d{4})(\d{3})(\d{4})$/, '$1 $2 $3');
}

/** "2-bedroom" -> "2 bedroom" */
export function typeLabel(type) {
  return PROPERTY_TYPES.find((t) => t.value === type)?.label || type;
}

/** "FCT" -> "Abuja (FCT)"; other states unchanged */
export function stateLabel(state) {
  return STATE_LABELS[state] || state;
}

/** "Posted 3 days ago" style text */
export function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [name, size] of units) {
    const count = Math.floor(seconds / size);
    if (count >= 1) return `${count} ${name}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}
