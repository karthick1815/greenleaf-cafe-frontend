import { useCallback, useEffect, useRef, useState } from 'react';
import { createResourceApi } from '../api/resources';

/**
 * Fetches a resource collection on mount and exposes CRUD helpers
 * that re-fetch the list afterwards, so the UI always reflects the API.
 */
export function useResource(resourceName) {
  const api = useRef(createResourceApi(resourceName)).current;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    return api.getAll()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(async (data) => {
    await api.create(data);
    await refresh();
  }, [api, refresh]);

  const update = useCallback(async (id, data) => {
    await api.update(id, data);
    await refresh();
  }, [api, refresh]);

  const remove = useCallback(async (id) => {
    await api.remove(id);
    await refresh();
  }, [api, refresh]);

  return { items, loading, error, refresh, create, update, remove };
}
