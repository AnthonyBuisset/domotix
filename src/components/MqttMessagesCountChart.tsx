import { InfluxDB } from "@influxdata/influxdb-client-browser";

import config from "../config";
import { useAlert } from "../hooks/useAlert";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

const QUERY = `
from(bucket: "mqtt-messages")
  |> range(start: -15d)
  |> filter(fn: (r) => r._measurement == "messages")
  |> group(columns: ["topic"])
  |> count()
  |> sort(columns: ["_value"], desc: true)
  |> limit(n:10)
`;

const API = new InfluxDB({ url: config.INFLUXDB_URL, token: config.INFLUXDB_API_TOKEN }).getQueryApi(
  config.INFLUXDB_ORG
);

type Stat = {
  topic: string;
  count: number;
};

export default function MqttMessagesCountChart() {
  const { alert } = useAlert();
  const [data, setData] = useState<Stat[]>();

  useEffect(() => {
    const rows: Stat[] = [];
    API.queryRows(QUERY, {
      next(row, tableMeta) {
        rows.push({
          topic: tableMeta.get(row, "topic"),
          count: tableMeta.get(row, "_value"),
        });
      },
      complete() {
        setData(rows);
      },
      error(error) {
        alert(error.toString());
      },
    });
  }, []);

  return (
    <ResponsiveContainer minWidth={200} height={200}>
      <BarChart layout="vertical" data={data} margin={{ top: 30, right: 5, left: 5 }} barSize={16}>
        <XAxis type="number" tickCount={2} />
        <YAxis type="category" width={150} dataKey="topic" tickLine={false} axisLine={false} />
        <Bar layout="vertical" dataKey="count" fill="#8884d8" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
}
