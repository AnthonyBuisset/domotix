import { Bar, ComposedChart, Label, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery from "../hooks/useInfluxDbQuery";
import { flux } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import { orderBy } from "lodash";
import { duration, Range } from "../utils/influxdb/range";
import { Colors, Tooltip as GraphTooltip } from "../utils/graph";
import { TimeRangeDropDown } from "./TimeRangeDropDown.tsx";
import { Card } from "@nextui-org/react";
import config from "../config.ts";

type Stat = {
  topic: string;
  _value: number;
};

export default function MqttMessagesCountChart() {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const query = flux`
  from(bucket: "${config.INFLUXDB_BUCKET}")
    |> range(start: ${duration(range)})
    |> filter(fn: (r) => r._measurement == "${config.INFLUXDB_MEASUREMENT}" )
    |> group(columns: ["topic"])
    |> count()
  `;

  const { data } = useInfluxDbQuery<Stat>(query.toString());

  return (
    <Card className="relative p-4">
      <div className="absolute right-4 top-4">
        <TimeRangeDropDown value={range} onChange={key => setRange(key as Range)} />
      </div>
      <h1 className="pb-2">Top 10 MQTT topics</h1>
      <ComposedChart
        layout="vertical"
        data={orderBy(data, ["_value", "topic"], ["desc", "asc"]).slice(0, 10)}
        barSize={16}
        width={340}
        height={350}
        margin={{ top: 10 }}
      >
        <XAxis type="number" tick={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="topic"
          tickLine={false}
          axisLine={false}
          width={200}
          tickFormatter={(tick: string) => (tick.length < 25 ? tick : `${tick.substring(0, 22)}...`)}
        />
        <Bar layout="vertical" dataKey="_value" fill={Colors[0]} />
        <Tooltip content={<CustomTooltip />} />
        <Label />
      </ComposedChart>
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
