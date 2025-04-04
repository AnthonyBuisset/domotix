import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery from "../hooks/useInfluxDbQuery";
import { flux } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import { chain } from "lodash";
import { duration, formatDateTime, Range, timeInterval } from "../utils/influxdb/range";
import { Colors, Tooltip as GraphTooltip } from "../utils/graph";
import { TimeRangeDropDown } from "./TimeRangeDropDown.tsx";
import { Card } from "@nextui-org/react";
import config from "../config.ts";

type Stat = {
  _time: string;
  _value: number;
  topic: string;
};

export default function MqttMessagesChart() {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const formatDate = (date: string) => formatDateTime(new Date(date), range);

  const query = flux`
  from(bucket: "${config.INFLUXDB_BUCKET}")
    |> range(start: ${duration(range)})
    |> filter(fn: (r) => r._measurement == "${config.INFLUXDB_MEASUREMENT}" )
    |> window(every: ${timeInterval(range)})
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
    <Card className="relative grow p-4">
      <div className="absolute right-4 top-4">
        <TimeRangeDropDown value={range} onChange={key => setRange(key as Range)} />
      </div>
      <h1 className="pb-2">MQTT messages</h1>
      <ResponsiveContainer minWidth={200} height={250}>
        <ComposedChart data={values} maxBarSize={16}>
          <XAxis type="category" dataKey="time" tickFormatter={formatDate} />
          <YAxis type="number" />
          {topics.map((topic, i) => (
            <Bar key={topic} dataKey={topic} fill={Colors[i % Colors.length]} stackId={0} />
          ))}
          <Line dataKey="Total" stroke="#ffffff" accumulate="sum" dot={false} type="monotone" />
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
      <GraphTooltip>
        <p className="font-bold">
          {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(label))}
        </p>
        <div className="inline-grid gap-x-3" style={{ gridTemplateColumns: "auto auto" }}>
          {payload
            .sort((l, r) => r.value - l.value)
            .map(({ name, value, fill }) => (
              <>
                <p key={`name-${name}`} style={{ color: fill }}>
                  {name}
                </p>
                <p key={`value-${name}`} style={{ color: fill }}>
                  {value}
                </p>
              </>
            ))}
        </div>
      </GraphTooltip>
    );
  }

  return null;
};
