// A small hook for loading data from the API.
//
//   const { data, error, loading, reload } = useAsync(
//     (signal) => getListings(params, signal),
//     [paramsString]
//   );
//
// - Re-runs whenever a value in `deps` changes.
// - Cancels the old request if a new one starts, so a slow old response
//   can never overwrite newer results.
// - Keeps showing the previous data while new data loads (no flicker).

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export function useAsync(asyncFunction, deps) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((previous) => ({ ...previous, loading: true, error: null }));

    asyncFunction(controller.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (axios.isCancel(error)) return; // we cancelled it on purpose
        setState({ data: null, error, loading: false });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadCount]);

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  return { ...state, reload };
}
