import { DeviceCard } from "./DeviceCard.tsx";
import { RiPlugFill, RiPlugLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { PropsWithClassName } from "../utils";
import classNames from "classnames";

type Props = {
  title: string;
  topic: string;
} & PropsWithClassName;

export default function Socket({ title, topic, className }: Props) {
  const [state, linkquality] = useJsonMqttValues({ topic, paths: ["$.state", "$.linkquality"] });

  const client = useMqttClient();

  const publishState = (checked: boolean) =>
    client?.publish(`${topic}/set`, JSON.stringify({ state: checked ? "on" : "off" }));

  return (
    <DeviceCard
      linkQuality={linkquality}
      className={classNames("flex flex-col items-center gap-1 text-6xl", className)}
      isPressable
      onPress={() => publishState(!state)}
    >
      <h1 className="-mt-2">{title}</h1>
      <div className="flex justify-around">{state ? <RiPlugFill /> : <RiPlugLine />}</div>
    </DeviceCard>
  );
}
