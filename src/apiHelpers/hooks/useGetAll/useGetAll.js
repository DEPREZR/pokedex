import { get } from "apiHelpers";
import { useState, useCallback, useEffect } from "react";

const useGetAll = (urls) => {
  const [result, setResult] = useState({
    data: null,
    errors: null,
    loading: true,
  });

  const memoizedGetAll = useCallback(async () => {
    setResult((previousResult) => ({ ...previousResult, loading: true }));

    const responses = await Promise.all(urls.map((url) => get(url)));

    const results = await Promise.all(
      responses.map(async (response) => {
        if (response.hasError) {
          return {
            data: null,
            error: response.error,
          };
        } else {
          try {
            const data = await response.json();

            return {
              data,
              error: null,
            };
          } catch (error) {
            return {
              data: null,
              error,
            };
          }
        }
      })
    );

    const { data, errors } = results.reduce(
      (acc, currentResult) => ({
        ...acc,
        errors: [...acc.errors, currentResult.error],
        data: [...acc.data, currentResult.data],
      }),
      { data: [], errors: [] }
    );

    setResult({
      loading: false,
      data: data.length ? data : null,
      errors: errors.length ? errors : null,
    });
  }, [urls]);

  useEffect(() => {
    memoizedGetAll();
  }, [memoizedGetAll]);

  return result;
};

export default useGetAll;
