// The list of states and areas that have properties, for dropdowns and
// autocomplete. Fetched ONCE per visit and shared by every component that
// uses it, which saves data.

import { useEffect, useState } from 'react';
import { getAreas } from '../api/insights';

let cachedRequest = null; // shared across all components

export function useAreas() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (!cachedRequest) {
      cachedRequest = getAreas().catch(() => {
        cachedRequest = null; // allow a retry next time
        return { states: [] };
      });
    }
    let active = true;
    cachedRequest.then((data) => {
      if (active) setStates(data.states);
    });
    return () => {
      active = false;
    };
  }, []);

  // A flat, de-duplicated list of area names, e.g. ["Gwarinpa", "Ikeja", ...]
  const allAreas = [...new Set(states.flatMap((s) => s.areas.map((a) => a.area)))].sort();

  return { states, allAreas };
}
