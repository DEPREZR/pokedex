import { get } from 'apiHelpers';
import { useState, useCallback, useEffect } from 'react';

const useGet = (url) => {
  const [result, setResult] = useState({
    data: null,
    error: null,
    status: null,
    loading: true,
  });

  const memoizedGet = useCallback(
    async () => {
      if (!result.loading)
        setResult((previousResult) => ({ ...previousResult, loading: true }));
      const response = await get({
        url,
      });

      if (response.hasError) {
        setResult({
          data: null,
          error: response.error,
          status: response.status,
          loading: false,
        });
      } else {
        try {
          const data = await response.json();

          setResult({
            data,
            error: null,
            status: response.status,
            loading: false,
          });
        } catch (error) {
          setResult({
            data: null,
            error,
            status: response.status,
            loading: false,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  useEffect(() => {
    memoizedGet();
  }, [memoizedGet]);

  return result;
};

export default useGet;
