import { InfluxDB } from "@influxdata/influxdb-client-browser";
import { useEffect, useState } from "react";
import config from "../config";
import { toast } from "react-toastify";

const API = new InfluxDB({ url: config.INFLUXDB_URL, token: config.INFLUXDB_API_TOKEN }).getQueryApi(
  config.INFLUXDB_ORG
);

export default function useInfluxDbQuery<R>(query: string): { data?: R[]; loading: boolean } {
  const [data, setData] = useState<R[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rows: R[] = [];
    setLoading(true);
    API.queryRows(query, {
      next(row, tableMeta) {
        rows.push(tableMeta.toObject(row) as R);
      },
      complete() {
        setData(rows);
        setLoading(false);
      },
      error(error) {
        setLoading(false);
        toast.error(error.toString());
      },
    });
  }, [query]);

  return { data, loading };
}
