import { Open as ShutterOpen, Closed as ShutterClosed } from "../icons/Shutters";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { Slider } from "./Slider";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { RiArrowDownSLine, RiArrowUpSLine, RiEqualizerFill, RiEqualizerLine } from "react-icons/ri";
import { PropsWithClassName, isDefined } from "../utils";
import classNames from "classnames";

type Props = {
  title?: string;
  topic: string;
} & PropsWithClassName;

export function CurtainSwitch({ title, topic, className }: Props) {
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
    <Card linkquality={linkquality} onClick={() => publishPosition(finalPosition ? 0 : 100)} className={className}>
      <h1 className="-my-2 text-center">{title}</h1>
      <div className="flex flex-row items-center gap-2 text-6xl">
        <div className="relative flex flex-row items-center">
          <div
            className={classNames("absolute grow px-1.5 text-5xl", {
              "-bottom-7": moving === "DOWN",
              "-top-7": moving === "UP",
            })}
          >
            {moving === "UP" ? <RiArrowUpSLine /> : moving === "DOWN" ? <RiArrowDownSLine /> : <></>}
          </div>
          {finalPosition ? <ShutterOpen size={60} /> : <ShutterClosed size={60} />}
        </div>
        <Slider
          value={finalPosition}
          setValue={position => {
            publishPosition(position);
            setFinalPosition(position);
          }}
          max={100}
        />
        <button
          className="text-3xl"
          onClick={e => {
            e.preventDefault();
            toggleCalibration();
            e.stopPropagation();
          }}
        >
          {calibration === "ON" ? (
            <RiEqualizerFill className="text-black dark:text-white" />
          ) : (
            <RiEqualizerLine className="text-gray-200 dark:text-gray-600" />
          )}
        </button>
      </div>
    </Card>
  ) : (
    <></>
  );
}
