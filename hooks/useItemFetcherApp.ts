import { useEffect, useState } from "react";

export function useItemFetcherApp<T>(
  fetchFn: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchWrapper();
  }, deps);

  function fetchWrapper() {
    setIsLoading(true);
    setError(null);
    try {
      fetchFn()
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  }

  return { data, isLoading, error, refetch: fetchWrapper };
}
