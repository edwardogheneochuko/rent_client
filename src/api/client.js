// One shared Axios instance for every API call.

import axios from 'axios';

// In development VITE_API_URL is empty, so requests go to "/api/..." and
// Vite's proxy forwards them to Express. In production it's the Render URL.
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  withCredentials: true, // send the httpOnly login cookie with every request
  timeout: 20000, // mobile networks can be slow; give up after 20s
});

/**
 * Our API always answers { success, data } or { success, error }.
 * This returns just the `data` part, so callers can write:
 *   const { listing } = await unwrap(api.get(`/listings/${id}`));
 */
export async function unwrap(request) {
  const response = await request;
  return response.data.data;
}

/** A human-friendly message for any error thrown by an API call. */
export function getErrorMessage(error) {
  if (axios.isCancel(error)) return '';
  if (error.code === 'ECONNABORTED') {
    return 'The request took too long. Please check your connection and try again.';
  }
  if (!error.response) {
    return "Can't reach RentRight right now. Please check your internet connection.";
  }
  // 502/503/504 without our JSON body: a proxy or host answered because the
  // API itself is down or restarting (in development: the server isn't running)
  if ([502, 503, 504].includes(error.response.status) && !error.response.data?.error) {
    return 'RentRight is temporarily unavailable. Please try again in a moment.';
  }
  return error.response.data?.error?.message || 'Something went wrong. Please try again.';
}

/**
 * Field-level validation errors from the API (422 responses), e.g.
 *   [{ field: 'email', message: 'Enter a valid email address' }]
 * Returns an empty array if there are none.
 */
export function getFieldErrors(error) {
  return error.response?.data?.error?.details || [];
}

export default api;
