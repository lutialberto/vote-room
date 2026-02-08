import { useState } from "react";
import { Alert } from "react-native";

export function useWaitingApp<T = void, K = void>({
  functionToWait,
  success,
  failure,
}: {
  functionToWait: T extends void ? () => Promise<K> : (arg: T) => Promise<K>;
  success?: (arg: K) => void;
  failure?: (error: Error) => void;
}) {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  function execPromise(...args: T extends void ? [] : [T]) {
    setIsWaiting(true);
    try {
      const promise =
        args.length === 0
          ? (functionToWait as () => Promise<K>)()
          : (functionToWait as (arg: T) => Promise<K>)(args[0] as T);

      promise
        .then((response) => {
          setIsWaiting(false);
          success?.(response);
        })
        .catch((error) => {
          if (failure) {
            failure(error);
          } else {
            Alert.alert(
              "Error",
              error.message ||
                "Ocurrió un problema, intente de nuevo más tarde."
            );
          }
          setIsWaiting(false);
        });
    } catch (error) {
      if (failure) {
        failure(error as Error);
      } else {
        Alert.alert(
          "Error",
          (error as Error).message ||
            "Ocurrió un error, intente de nuevo más tarde."
        );
      }
      setIsWaiting(false);
    }
  }

  return { isWaiting, execPromise };
}
