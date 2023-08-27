import { fluxDuration } from "@influxdata/influxdb-client-browser";

export enum Range {
  LastHour = "-1h",
  Last4Hours = "-4h",
  LastDay = "-1d",
  LastWeek = "-1w",
  LastMonth = "-1mo",
}

export const DropdownOptions: Record<Range, string> = {
  [Range.LastHour]: "1 heure",
  [Range.Last4Hours]: "4 heures",
  [Range.LastDay]: "1 jour",
  [Range.LastWeek]: "1 semaine",
  [Range.LastMonth]: "1 mois",
};

export const timeInterval = (range: Range) => {
  switch (range) {
    case Range.LastHour:
      return fluxDuration("10m");
    case Range.Last4Hours:
      return fluxDuration("30m");
    case Range.LastDay:
      return fluxDuration("1h");
    case Range.LastWeek:
      return fluxDuration("12h");
    case Range.LastMonth:
      return fluxDuration("1d");
  }
};

export const formatDateTime = (date: Date, range: Range) => {
  const formats: Record<Range, Intl.DateTimeFormatOptions> = {
    [Range.LastHour]: { timeStyle: "short" },
    [Range.Last4Hours]: { timeStyle: "short" },
    [Range.LastDay]: { timeStyle: "short" },
    [Range.LastWeek]: { day: "2-digit", month: "short" },
    [Range.LastMonth]: { day: "2-digit", month: "short" },
  };

  return new Intl.DateTimeFormat(undefined, formats[range]).format(date);
};

export const duration = (range: Range) => fluxDuration(range);
