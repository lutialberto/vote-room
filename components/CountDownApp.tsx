import { useCountdown } from "@/hooks/useCountdown";
import { ThemedText } from "./ThemedText";

export default function CountDownApp({
  seconds,
  onFinish,
}: {
  seconds: number;
  onFinish: () => void;
}) {
  const { currentValue, isFinished, isRunning, start } = useCountdown();

  if (isFinished) {
    onFinish();
  }

  if (!isRunning && !isFinished) {
    start(seconds);
  }
  return (
    <>
      {isRunning && !isFinished && (
        <ThemedText>Tiempo restante: {currentValue} segundos</ThemedText>
      )}
    </>
  );
}
