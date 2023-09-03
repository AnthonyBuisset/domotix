import { Open as ShutterOpen, Closed as ShutterClosed } from "../icons/Shutters";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine, RiEqualizerFill, RiEqualizerLine } from "react-icons/ri";
import { isDefined } from "../utils";

type Props = {
  title?: string;
  topic: string;
};

export function CurtainSwitch({ title, topic }: Props) {
  const client = useMqttClient();
  const [calibration, moving, linkquality, position] = useJsonMqttValues({
    topic,
    paths: ["$.calibration", "$.moving", "$.linkquality", "$.position"],
  });

  const [finalPosition, setFinalPosition] = useState<number>();

  useEffect(() => {
    if (moving === "STOP" && isDefined(position)) setFinalPosition(parseInt(position));
  }, [position, moving]);

  const publishPosition = (position: number) => client?.publish(`${topic}/set`, JSON.stringify({ position }));

  const toggleCalibration = () =>
    client?.publish(`${topic}/set`, JSON.stringify({ calibration: calibration === "ON" ? "OFF" : "ON" }));

  return isDefined(finalPosition) ? (
    <Card
      icon={
        <div className="flex flex-row items-center">
          {moving === "DOWN" ? (
            <RiArrowDownDoubleLine className="-ml-4 -mr-2 animate-bounce text-2xl" />
          ) : moving === "UP" ? (
            <RiArrowUpDoubleLine className="-ml-4 -mr-2 animate-bounce text-2xl" />
          ) : undefined}
          {finalPosition ? <ShutterOpen size={24} /> : <ShutterClosed size={24} />}
        </div>
      }
      title={title}
      linkquality={linkquality}
      onClick={() => publishPosition(finalPosition ? 0 : 100)}
    >
      <div className="flex flex-row items-center gap-2">
        <Slider
          value={finalPosition}
          setValue={position => {
            publishPosition(position);
            setFinalPosition(position);
          }}
          max={100}
        />
        <button className="text-xl" onClick={toggleCalibration}>
          {calibration === "ON" ? (
            <RiEqualizerFill className="text-black dark:text-white" />
          ) : (
            <RiEqualizerLine className="text-gray-200 dark:text-gray-600" />
          )}
        </button>
      </div>
    </Card>
  ) : (
    <Skeleton title={title} />
  );
}

const Skeleton = ({ title }: { title?: string }) => <Card icon={<ShutterClosed size={24} />} title={title} />;
