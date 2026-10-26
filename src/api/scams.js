// Calls to /api/scams.

import api, { unwrap } from './client';

/**
 * Check a phone number, account number or name.
 * Returns { query, flagged, message, items, pagination }.
 */
export const checkScam = (query, page = 1) =>
  unwrap(api.get('/scams/check', { params: { query, page } }));
