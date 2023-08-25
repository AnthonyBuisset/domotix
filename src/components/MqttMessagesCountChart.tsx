import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useInfluxDbQuery from "../hooks/useInfluxDbQuery";

const QUERY = `
from(bucket: "mqtt-messages")
  |> range(start: -15d)
  |> filter(fn: (r) => r._measurement == "messages")
  |> group(columns: ["topic"])
  |> count()
  |> sort(columns: ["_value"], desc: true)
  |> limit(n:10)
`;

type Stat = {
  topic: string;
  _value: number;
};

export default function MqttMessagesCountChart() {
  const { data } = useInfluxDbQuery<Stat>(QUERY);

  return (
    <ResponsiveContainer minWidth={200} height={200}>
      <BarChart layout="vertical" data={data} barSize={16}>
        <XAxis type="number" tickCount={2} />
        <YAxis type="category" width={150} dataKey="topic" tickLine={false} axisLine={false} />
        <Bar layout="vertical" dataKey="_value" fill="#8884d8" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
