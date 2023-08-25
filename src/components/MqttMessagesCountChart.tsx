import { InfluxDB } from "@influxdata/influxdb-client-browser";

import config from "../config";

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

export default function MqttMessagesCountChart() {
  API.queryRows(QUERY, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      console.log("next", o);
    },
    complete() {
      console.log("complete");
    },
    error(error) {
      console.error("query failed- ", error);
    },
  });

  return <div />;
}
