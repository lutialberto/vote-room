import { useEffect, useState } from "react";

interface ResponseState<T> {
  data: T[];
  isLoading: boolean;
  error: Error | undefined;
}

type ResponseWithData<T> = ResponseState<T> & {
  data: T[];
  isLoading: false;
  error: undefined;
};

type ResponseWithError<T> = ResponseState<T> & {
  data: [];
  isLoading: false;
  error: Error;
};

type ResponseLoading<T> = ResponseState<T> & {
  data: [];
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

export function useListFetcherApp<T>(
  fetchFn: () => Promise<T[]>,
  deps: any[] = []
) {
  const [response, setResponse] = useState<UseItemFetcherAppResponse<T>>({
    data: [],
    isLoading: true,
    error: undefined,
  });

  useEffect(() => {
    fetchWrapper();
  }, deps);

  function fetchWrapper() {
    setResponse({
      data: [],
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
            data: [],
            isLoading: false,
            error,
          });
        });
    } catch (error) {
      setResponse({
        data: [],
        isLoading: false,
        error: error as Error,
      });
    }
  }

  return { ...response, refetch: fetchWrapper };
}
