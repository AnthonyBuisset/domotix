import { useNow } from "../../hooks/useNow";

export default function Clock() {
  const { weekday, date, hours, minutes, seconds } = useNow();

  return (
    <div className="flex min-w-max flex-col items-center gap-1 p-2">
      <div className="text-2xl">
        {weekday} {date}
      </div>
      <div className="flex items-end gap-1">
        <div className="text-6xl font-semibold">{hours}</div>
        <div className="text-4xl">{minutes}</div>
        <div className="text-4xl text-secondary">{seconds}</div>
      </div>
    </div>
  );
}
