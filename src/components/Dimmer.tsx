import { RiLightbulbFill, RiLightbulbLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { Card } from "./Card";
import { isDefined } from "../utils";

type Props = {
  title: string;
  topic: string;
};

export function Dimmer({ title, topic }: Props) {
  const client = useMqttClient();
  const [brightness, state, linkquality] = useJsonMqttValues({
    topic,
    paths: ["$.brightness_l1", "$.state_l1", "$.linkquality"],
  });

  const brightnessValue = parseInt(brightness);

  const publish = (state: boolean, brightness: number) =>
    client?.publish(
      `${topic}/set`,
      JSON.stringify({ brightness_l1: state && !brightness ? 255 : brightness, state_l1: state })
    );

  return isDefined(brightness) ? (
    <Card
      linkquality={linkquality}
      title={title}
      icon={state ? <RiLightbulbFill className="text-2xl" /> : <RiLightbulbLine className="text-2xl" />}
      onClick={() => publish(!state, brightnessValue)}
    >
      <Slider
        value={parseInt(state === "OFF" ? "0" : brightness)}
        setValue={newBrightness => (newBrightness ? publish(true, newBrightness) : publish(false, brightnessValue))}
        max={255}
      />
    </Card>
  ) : (
    <Skeleton />
  );
}

const Skeleton = () => <Card title="Lumieres"></Card>;
