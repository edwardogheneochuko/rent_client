// Calls to /api/insights.

import api, { unwrap } from './client';

/** Areas grouped by state: { states: [{ state, areas: [{ area, propertyCount }] }] } */
export const getAreas = () => unwrap(api.get('/insights/areas'));
