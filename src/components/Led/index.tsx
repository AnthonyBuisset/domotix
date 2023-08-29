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
  valuePath?: string;
  toColor?: (value: unknown) => Color;
};

export const Led = ({ topic, valuePath, toColor }: Props) => {
  const [value] = useJsonMqttValues({
    topic,
    paths: [valuePath].filter(isDefined),
  });

  return <View value={toColor ? toColor(value) : (value as Color)} />;
};
