import { RiLightbulbFill, RiLightbulbLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { Card } from "./Card";

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

  const publishBrightness = (brightness: number) =>
    client?.publish(`${topic}/set`, JSON.stringify({ brightness_l1: brightness, state_l1: brightness ? "ON" : "OFF" }));

  return brightness === undefined ? (
    <Skeleton />
  ) : (
    <Card
      linkquality={linkquality}
      title={title}
      icon={brightness ? <RiLightbulbFill className="text-2xl" /> : <RiLightbulbLine className="text-2xl" />}
      onClick={() => publishBrightness(brightness ? 0 : 255)}
    >
      <Slider value={parseInt(state === "OFF" ? "0" : brightness)} setValue={publishBrightness} max={255} />
    </Card>
  );
}

const Skeleton = () => <Card title="Lumieres"></Card>;
