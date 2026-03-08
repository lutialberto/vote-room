import { useEffect, useState } from "react";

interface ResponseState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
}

type ResponseWithData<T> = ResponseState<T> & {
  data: T;
  isLoading: false;
  error: undefined;
};

type ResponseWithError<T> = ResponseState<T> & {
  data: undefined;
  isLoading: false;
  error: Error;
};

type ResponseLoading<T> = ResponseState<T> & {
  data: undefined;
  isLoading: true;
  error: undefined;
};

type UseItemFetcherAppResponse<T> =
  | ResponseWithData<T>
  | ResponseWithError<T>
  | ResponseLoading<T>;

type Response<T> = UseItemFetcherAppResponse<T> & {
  refetch: () => void;
};
export function useItemFetcherApp<T>(
  fetchFn: () => Promise<T>,
  deps: any[] = []
): Response<T> {
  const [response, setResponse] = useState<UseItemFetcherAppResponse<T>>({
    data: undefined,
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    fetchWrapper();
  }, deps);

  function fetchWrapper() {
    setResponse({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    try {
      fetchFn()
        .then((data) => {
          setResponse({
            data,
            isLoading: false,
            error: undefined,
          });
        })
        .catch((error) => {
          setResponse({
            data: undefined,
            isLoading: false,
            error,
          });
        });
    } catch (error) {
      setResponse({
        data: undefined,
        isLoading: false,
        error: error as Error,
      });
    }
  }

  return {
    ...response,
    refetch: fetchWrapper,
  };
}
