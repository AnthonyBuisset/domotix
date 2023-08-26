import { Bar, ComposedChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery, { Range } from "../hooks/useInfluxDbQuery";
import { Card } from "./Card";
import { flux, fluxDuration } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { orderBy } from "lodash";

type Stat = {
  topic: string;
  _value: number;
};

export default function MqttMessagesCountChart() {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const options: Record<Range, string> = {
    [Range.LastHour]: "1 heure",
    [Range.Last4Hours]: "4 heures",
    [Range.LastDay]: "1 jour",
    [Range.LastWeek]: "1 semaine",
  };

  const start = fluxDuration(range);
  const query = flux`
  from(bucket: "mqtt-messages")
    |> range(start: ${start})
    |> filter(fn: (r) => r._measurement == "messages")
    |> group(columns: ["topic"])
    |> count()
    |> sort(columns: ["_value"], desc: true)
    |> limit(n:10)
  `;

  const { data } = useInfluxDbQuery<Stat>(query.toString());

  return (
    <Card title="Top 10 MQTT topics" className="relative border">
      <div className="absolute right-4 top-4">
        <Dropdown
          options={Object.entries(options).map(([value, label]) => ({ value, label }))}
          label={options[range]}
          onChange={option => setRange(option as Range)}
        />
      </div>
      <ResponsiveContainer minWidth={200} height={200}>
        <ComposedChart layout="vertical" data={orderBy(data, ["_value"], ["desc"])} barSize={16}>
          <XAxis type="number" tick={false} axisLine={false} />
          <YAxis type="category" width={230} dataKey="topic" tickLine={false} axisLine={false} />
          <Bar layout="vertical" dataKey="_value" fill="#0ea5e9" />
          <Tooltip content={<CustomTooltip />} />
          <Label />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="flex gap-2 rounded-lg bg-white/5 p-4 backdrop-blur-xl">
        <p className="font-bold">{label}:</p>
        <p>{payload[0].value}</p>
      </div>
    );
  }

  return null;
};
