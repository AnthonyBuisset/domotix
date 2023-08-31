import { Open as ShutterOpen, Closed as ShutterClosed } from "../icons/Shutters";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { ReactElement, useEffect, useState } from "react";
import { Card } from "./Card";
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine, RiEqualizerFill, RiEqualizerLine } from "react-icons/ri";

type Props = {
  icon?: ReactElement;
  title?: string;
  topic: string;
};

export function CurtainSwitch({ icon, title, topic }: Props) {
  const client = useMqttClient();
  const [calibration, moving, linkquality, position] = useJsonMqttValues({
    topic,
    paths: ["$.calibration", "$.moving", "$.linkquality", "$.position"],
  });

  const [finalPosition, setFinalPosition] = useState(parseInt(position));

  useEffect(() => {
    if (moving === "STOP" && position !== undefined) setFinalPosition(parseInt(position));
  }, [position, moving]);

  const publishPosition = (position: number) => client?.publish(`${topic}/set`, JSON.stringify({ position }));

  const toggleCalibration = () =>
    client?.publish(`${topic}/set`, JSON.stringify({ calibration: calibration === "ON" ? "OFF" : "ON" }));

  return (
    <Card icon={icon} title={title} linkquality={linkquality}>
      <div className="flex flex-row items-center">
        {moving === "DOWN" ? (
          <RiArrowDownDoubleLine className="-ml-4 -mr-2 animate-bounce text-2xl" />
        ) : moving === "UP" ? (
          <RiArrowUpDoubleLine className="-ml-4 -mr-2 animate-bounce text-2xl" />
        ) : undefined}
        <Slider
          value={finalPosition}
          setValue={position => {
            publishPosition(position);
            setFinalPosition(position);
          }}
          onIcon={<ShutterOpen size={24} />}
          offIcon={<ShutterClosed size={24} />}
          max={100}
        />
        <button className="ml-2 text-xl" onClick={toggleCalibration}>
          {calibration === "ON" ? (
            <RiEqualizerFill className="text-black dark:text-white" />
          ) : (
            <RiEqualizerLine className="text-gray-200 dark:text-gray-600" />
          )}
        </button>
      </div>
    </Card>
  );
}
