import { View } from "./View";
import { useJsonMqttValues } from "../../hooks/useMqtt";
import { isDefined } from "../../utils";

export enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Yellow = "yellow",
  Grey = "grey",
}

type Props = {
  topic: string;
  label?: string;
  labelPath?: string;
  valuePath?: string;
  toColor?: (value: unknown) => Color;
};

export const Led = ({ topic, valuePath, labelPath, label, toColor }: Props) => {
  const [value, labelFromMessage] = useJsonMqttValues({
    topic,
    paths: [valuePath, labelPath].filter(isDefined),
  });

  return <View label={label || labelFromMessage} value={toColor ? toColor(value) : (value as Color)} />;
};
