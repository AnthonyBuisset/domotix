import { ToggleSwitch } from "flowbite-react";
import { Card } from "./Card";
import { RiPlugFill } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";

type Props = {
  title: string;
  topic: string;
};

export default function Socket({ title, topic }: Props) {
  const [state, linkquality] = useJsonMqttValues({ topic, paths: ["$.state", "$.linkquality"] });

  const client = useMqttClient();

  const publishState = (checked: boolean) =>
    client?.publish(`${topic}/set`, JSON.stringify({ state: checked ? "on" : "off" }));

  return (
    <Card title={title} icon={<RiPlugFill className="text-2xl" />} linkquality={linkquality}>
      <ToggleSwitch checked={state === "ON"} label="" onChange={publishState} />
    </Card>
  );
}
