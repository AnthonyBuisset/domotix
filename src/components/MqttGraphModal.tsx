import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import useInfluxDbQuery from "../hooks/useInfluxDbQuery";
import { flux } from "@influxdata/influxdb-client-browser";
import { useState } from "react";
import { duration, formatDateTime, Range, timeInterval } from "../utils/influxdb/range";
import { TimeRangeDropDown } from "./TimeRangeDropDown.tsx";
import config from "../config.ts";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from "@nextui-org/react";
import classNames from "classnames";

type Stat = {
  _time: string;
  _value: number;
  topic: string;
};

export type MqttGraphModalProps = {
  topic: string;
  field: string;
  title: string;
  unit?: string;
  min?: number | string;
  max?: number | string;
} & Omit<ModalProps, "children">;

export default function MqttGraphModal({
  topic,
  field,
  title,
  unit,
  min = "auto",
  max = "auto",
  className,
  ...rest
}: MqttGraphModalProps) {
  const [range, setRange] = useState<Range>(Range.LastDay);

  const formatDate = (date: string) => formatDateTime(new Date(date), range);

  const query = flux`
  from(bucket: "${config.INFLUXDB_BUCKET}")
    |> range(start: ${duration(range)})
    |> filter(fn: (r) => r._measurement == "${config.INFLUXDB_MEASUREMENT}" )
    |> filter(fn: (r) => r["topic"] == "${topic}")
    |> filter(fn: (r) => r["_field"] == "${field}")
    |> aggregateWindow(every: ${timeInterval(range)}, fn: mean, createEmpty: false)
    |> yield(name: "mean")
  `;

  const { data } = useInfluxDbQuery<Stat>(query.toString());

  return (
    <Modal {...rest} className={classNames("bg-background text-foreground drop-shadow-2xl dark", className)}>
      <ModalContent>
        <ModalHeader className="flex items-center justify-between px-8">
          {title}
          <TimeRangeDropDown value={range} onChange={key => setRange(key as Range)} />
        </ModalHeader>
        <ModalBody>
          <ResponsiveContainer minWidth={200} height={300}>
            <LineChart data={data}>
              <XAxis type="category" dataKey="_time" tickFormatter={formatDate} />
              <YAxis type="number" unit={unit} domain={[min, max]} width={70} />
              <Line dataKey="_value" />
            </LineChart>
          </ResponsiveContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
