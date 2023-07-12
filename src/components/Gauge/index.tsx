import { View } from "./View";
import { useJsonMqttValues } from "../../hooks/useMqtt";
import { isDefined } from "../../utils";

export enum Type {
  CpuTemperature,
  WeatherTemperature,
  Decibels,
  Voltage5,
  Intensity,
}

type Props = {
  type: Type;
  topic: string;
  label?: string;
  labelPath?: string;
  valuePath?: string;
};

export const Gauge = ({ type, topic, valuePath, labelPath, label }: Props) => {
  const [value, labelFromMessage] = useJsonMqttValues({
    topic,
    paths: [valuePath, labelPath].filter(isDefined),
  });

  return <View type={type} label={label || labelFromMessage} value={parseFloat(value || "0")} />;
};
