// Fixed option lists used by forms and filters. Values must match the API.

export const PROPERTY_TYPES = [
  { value: 'self-contain', label: 'Self-contain' },
  { value: 'mini-flat', label: 'Mini flat' },
  { value: '1-bedroom', label: '1 bedroom' },
  { value: '2-bedroom', label: '2 bedroom' },
  { value: '3-bedroom', label: '3 bedroom' },
  { value: 'duplex', label: 'Duplex' },
];

// Friendlier names for some states
export const STATE_LABELS = { FCT: 'Abuja (FCT)' };

// Yearly rent budgets offered in dropdowns (naira)
export const BUDGET_OPTIONS = [
  500_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 5_000_000, 8_000_000, 12_000_000, 20_000_000,
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'cheapest', label: 'Lowest move-in cost' },
  { value: 'priciest', label: 'Highest move-in cost' },
];

// Roles a person can choose when signing up
export const SIGNUP_ROLES = [
  { value: 'tenant', label: "I'm looking for a place", hint: 'Tenant' },
  { value: 'landlord', label: 'I own property', hint: 'Landlord' },
  { value: 'agent', label: 'I help people find homes', hint: 'Agent' },
];

export const LISTINGS_PER_PAGE = 12;
