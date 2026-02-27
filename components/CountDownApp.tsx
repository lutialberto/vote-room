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

  const totalSeconds = currentValue ?? 0;

  const oneMinute = 60;
  const oneHour = 3600;
  const oneDay = 86400;

  const displayDays = Math.floor(totalSeconds / oneDay);
  const displayHours =
    totalSeconds >= oneHour ? Math.floor((totalSeconds % oneDay) / oneHour) : 0;
  const displayMinutes =
    totalSeconds >= oneMinute
      ? Math.floor((totalSeconds % oneHour) / oneMinute)
      : 0;
  const displaySeconds = totalSeconds % oneMinute;

  let formattedTime: string;
  if (displayDays > 0) {
    formattedTime = `${displayDays}d ${displayHours}:${displayMinutes}:${displaySeconds}`;
  } else if (displayHours > 0) {
    formattedTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;
  } else if (displayMinutes > 0) {
    formattedTime = `${displayMinutes}:${displaySeconds}`;
  } else {
    formattedTime = `${displaySeconds}`;
  }

  return (
    <>
      {isRunning && !isFinished && (
        <ThemedText>Tiempo restante: {formattedTime}</ThemedText>
      )}
    </>
  );
}
