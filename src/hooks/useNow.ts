import { useEffect, useState } from "react";

const LOCALE = "fr-FR";

export const useNow = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return format(now);
};

export const format = (date: Date) => ({
  date: new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" }).format(date),
  weekday: new Intl.DateTimeFormat(LOCALE, { weekday: "short" }).format(date),
  day: new Intl.DateTimeFormat(LOCALE, { day: "numeric" }).format(date),
  month: new Intl.DateTimeFormat(LOCALE, { month: "short" }).format(date),
  hours: date.getHours().toString(),
  minutes: date.getMinutes().toString().padStart(2, "0"),
  seconds: date.getSeconds().toString().padStart(2, "0"),
});
