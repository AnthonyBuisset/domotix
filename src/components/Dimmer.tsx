import { RiLightbulbFill, RiLightbulbLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { Card } from "./Card";
import { PropsWithClassName, isDefined } from "../utils";

type Props = {
  title: string;
  topic: string;
} & PropsWithClassName;

export function Dimmer({ topic, className }: Props) {
  const client = useMqttClient();
  const [brightness, stateStr, linkquality] = useJsonMqttValues({
    topic,
    paths: ["$.brightness_l1", "$.state_l1", "$.linkquality"],
  });

  const state = stateStr === "ON";

  const brightnessValue = parseInt(brightness);

  const publish = (state: boolean, brightness: number) =>
    client?.publish(
      `${topic}/set`,
      JSON.stringify({ brightness_l1: state && !brightness ? 255 : brightness, state_l1: state ? "ON" : "OFF" })
    );

  return isDefined(brightness) ? (
    <Card linkquality={linkquality} onClick={() => publish(!state, brightnessValue)} className={className}>
      <div className="flex h-full items-center gap-1 text-6xl">
        {state ? <RiLightbulbFill /> : <RiLightbulbLine />}
        <Slider
          value={parseInt(state ? brightness : "0")}
          setValue={newBrightness => (newBrightness ? publish(true, newBrightness) : publish(false, brightnessValue))}
          max={255}
        />
      </div>
    </Card>
  ) : (
    <></>
  );
}
