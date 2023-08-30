import { RiLightbulbFill, RiLightbulbLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";

type Props = {
  topic: string;
};

export function Dimmer({ topic }: Props) {
  const client = useMqttClient();
  const [brightness, state] = useJsonMqttValues({ topic, paths: ["$.brightness_l1", "$.state_l1"] });

  const publishBrightness = (brightness: number) =>
    client?.publish(`${topic}/set`, JSON.stringify({ brightness_l1: brightness, state_l1: brightness ? "ON" : "OFF" }));

  return (
    <Slider
      value={parseInt(state === "OFF" ? "0" : brightness)}
      setValue={publishBrightness}
      onIcon={<RiLightbulbFill className="text-2xl" />}
      offIcon={<RiLightbulbLine className="text-2xl" />}
      max={255}
    />
  );
}
