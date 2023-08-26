import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery, { Range } from "../hooks/useInfluxDbQuery";
import { Card } from "./Card";
import { flux, fluxDuration } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { chain } from "lodash";

type Stat = {
  _time: string;
  _value: number;
  topic: string;
};

const OPTIONS: Record<Range, string> = {
  [Range.LastHour]: "1 heure",
  [Range.Last4Hours]: "4 heures",
  [Range.LastDay]: "1 jour",
  [Range.LastWeek]: "1 semaine",
};

const TIME_INTERVALS: Record<Range, string> = {
  [Range.LastHour]: "10m",
  [Range.Last4Hours]: "30m",
  [Range.LastDay]: "1h",
  [Range.LastWeek]: "12h",
};

const DATETIME_FORMATS: Record<Range, Intl.DateTimeFormatOptions> = {
  [Range.LastHour]: { timeStyle: "short" },
  [Range.Last4Hours]: { timeStyle: "short" },
  [Range.LastDay]: { timeStyle: "short" },
  [Range.LastWeek]: { day: "2-digit", month: "short" },
};

const COLORS = [
  "#0ea5e9", // sky-500
  "#a855f7", // purple-500
  "#10b981", // emerald-500
  "#ef4444", // red-500
  "#fde047", // yellow-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
  "#64748b", // slate-500
];

export default function MqttMessagesChart() {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(undefined, DATETIME_FORMATS[range]).format(new Date(date));

  const start = fluxDuration(range);
  const every = fluxDuration(TIME_INTERVALS[range]);
  const query = flux`
  from(bucket: "mqtt-messages")
    |> range(start: ${start})
    |> filter(fn: (r) => r._measurement == "messages" and r._field == "topic" )
    |> window(every: ${every})
    |> count()
    |> duplicate(column: "_stop", as: "_time")
  `;

  const { data } = useInfluxDbQuery<Stat>(query.toString());

  const values = Object.entries(
    data?.reduce(
      (acc, msg) => ({
        ...acc,
        [msg._time]: {
          ...acc[msg._time],
          [msg.topic]: msg._value,
          Total: (acc[msg._time]?.Total || 0) + msg._value,
        },
      }),
      {} as Record<string, Record<string, number>>
    ) || {}
  ).map(([time, topics]) => ({ time, ...topics }));

  const topics = chain(data).map("topic").sort().uniq().value();

  return (
    <Card title="MQTT messages" className="relative border">
      <div className="absolute right-4 top-4">
        <Dropdown
          options={Object.entries(OPTIONS).map(([value, label]) => ({ value, label }))}
          label={OPTIONS[range]}
          onChange={option => setRange(option as Range)}
        />
      </div>
      <ResponsiveContainer minWidth={200} height={300}>
        <ComposedChart data={values} maxBarSize={16}>
          <XAxis type="category" dataKey="time" tickFormatter={formatDate} />
          <YAxis type="number" />
          {topics.map((topic, i) => (
            <Bar key={topic} dataKey={topic} fill={COLORS[i]} />
          ))}
          <Line dataKey="Total" stroke="#ffffff" accumulate="sum" />
          <Tooltip content={<CustomTooltip />} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: { name: string; value: number; fill: string }[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-white/5 p-4 backdrop-blur-xl">
        <p className="font-bold">
          {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(label))}
        </p>
        <div className="inline-grid auto-cols-auto grid-flow-col grid-rows-4 gap-x-3">
          {payload.map(({ name, fill }) => (
            <p key={name} style={{ color: fill }}>
              {name}
            </p>
          ))}
          {payload.map(({ name, value, fill }) => (
            <p key={name} style={{ color: fill }}>
              {value}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
