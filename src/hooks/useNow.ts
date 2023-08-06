import { useEffect, useState } from "react";

const LOCALE = "fr-FR";

export const useNow = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return {
    date: new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" }).format(now),
    weekday: new Intl.DateTimeFormat(LOCALE, { weekday: "short" }).format(now),
    hours: now.getHours().toString(),
    minutes: now.getMinutes().toString().padStart(2, "0"),
    seconds: now.getSeconds().toString().padStart(2, "0"),
  };
};
