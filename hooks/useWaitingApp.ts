import { useState } from "react";
import { Alert } from "react-native";

export function useWaitingApp<T>({
  functionToWait,
  success,
  failure,
}: {
  functionToWait: (arg: T) => Promise<void>;
  success?: (arg: T) => void;
  failure?: (error: Error) => void;
}) {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  function execPromise(arg: T) {
    setIsWaiting(true);
    try {
      functionToWait(arg)
        .then(() => {
          setIsWaiting(false);
          success?.(arg);
        })
        .catch((error) => {
          failure?.(error) ||
            Alert.alert(
              "Error",
              error.message ||
                "Ocurrió un problema, intente de nuevo más tarde."
            );
          setIsWaiting(false);
        });
    } catch (error) {
      Alert.alert(
        "Error",
        (error as Error).message ||
          "Ocurrió un error, intente de nuevo más tarde."
      );
      setIsWaiting(false);
    }
  }

  return { isWaiting, execPromise };
}
