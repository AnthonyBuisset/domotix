import { Bar, ComposedChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery from "../hooks/useInfluxDbQuery";
import { Card } from "./Card";
import { flux } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { orderBy } from "lodash";
import { DropdownOptions, Range, duration } from "../utils/influxdb/range";
import { Colors, Tooltip as GraphTooltip } from "../utils/graph";

type Stat = {
  topic: string;
  _value: number;
};

export default function MqttMessagesCountChart() {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const query = flux`
  from(bucket: "smarthome")
    |> range(start: ${duration(range)})
    |> filter(fn: (r) => r._measurement == "mqtt-message")
    |> group(columns: ["topic"])
    |> count()
    |> sort(columns: ["_value"], desc: true)
    |> limit(n:10)
  `;

  const { data } = useInfluxDbQuery<Stat>(query.toString());

  return (
    <Card title="Top 10 MQTT topics" className="relative">
      <div className="absolute right-4 top-4">
        <Dropdown
          options={Object.entries(DropdownOptions).map(([value, label]) => ({ value, label }))}
          label={DropdownOptions[range]}
          onChange={option => setRange(option as Range)}
        />
      </div>
      <ResponsiveContainer minWidth={200} height={250}>
        <ComposedChart layout="vertical" data={orderBy(data, ["_value"], ["desc"])} barSize={16}>
          <XAxis type="number" tick={false} axisLine={false} />
          <YAxis type="category" width={230} dataKey="topic" tickLine={false} axisLine={false} />
          <Bar layout="vertical" dataKey="_value" fill={Colors[0]} />
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
      <GraphTooltip>
        <div className="flex gap-2">
          <p className="font-bold">{label}:</p>
          <p>{payload[0].value}</p>
        </div>
      </GraphTooltip>
    );
  }

  return null;
};
