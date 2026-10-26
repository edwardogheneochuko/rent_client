// Calls to /api/listings.

import api, { unwrap } from './client';

/**
 * Search listings. `params` can include area, state, type, minRent,
 * maxRent, sort, page and limit. Returns { items, pagination }.
 * `signal` lets the caller cancel the request (e.g. when filters change).
 */
export const getListings = (params, signal) => unwrap(api.get('/listings', { params, signal }));

/** One listing. Returns { listing }. */
export const getListing = (id, signal) => unwrap(api.get(`/listings/${id}`, { signal }));
