import { InfluxDB, QueryApi } from "@influxdata/influxdb-client-browser";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from "../config";

function getQueryApi(): QueryApi | null {
  if (!config.INFLUXDB_URL || !config.INFLUXDB_API_TOKEN || !config.INFLUXDB_ORG) {
    return null;
  }
  return new InfluxDB({ url: config.INFLUXDB_URL, token: config.INFLUXDB_API_TOKEN }).getQueryApi(
    config.INFLUXDB_ORG
  );
}

export default function useInfluxDbQuery<R>(query: string): { data?: R[]; loading: boolean } {
  const [data, setData] = useState<R[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = getQueryApi();
    if (!api) {
      toast.error("InfluxDB n'est pas configuré", { toastId: "influxdb-not-configured" });
      return;
    }

    const rows: R[] = [];
    setLoading(true);
    api.queryRows(query, {
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
