import { Closed as ShutterClosed, Open as ShutterOpen } from "../icons/Shutters";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { useEffect, useState } from "react";
import { DeviceCard } from "./DeviceCard.tsx";
import { RiArrowDownSLine, RiArrowUpSLine, RiEqualizerFill, RiEqualizerLine } from "react-icons/ri";
import { isDefined, PropsWithClassName } from "../utils";
import classNames from "classnames";
import { Button, Slider } from "@nextui-org/react";

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
    <DeviceCard linkQuality={linkquality} className={className}>
      <h1 className="-my-2 text-center">{title}</h1>
      <div className="flex flex-row items-center gap-2 text-6xl">
        <div className="relative flex flex-row items-center">
          <div
            className={classNames("absolute grow text-5xl", {
              "-bottom-7": moving === "DOWN",
              "-top-7": moving === "UP",
            })}
          >
            {moving === "UP" ? <RiArrowUpSLine /> : moving === "DOWN" ? <RiArrowDownSLine /> : <></>}
          </div>
          <Button
            size="lg"
            variant="light"
            color={finalPosition ? "default" : "secondary"}
            isIconOnly
            onClick={() => publishPosition(finalPosition ? 0 : 100)}
          >
            {finalPosition ? <ShutterOpen size={60} /> : <ShutterClosed size={60} />}
          </Button>
        </div>
        <Slider
          aria-label={topic}
          value={finalPosition}
          onChangeEnd={position => {
            if (typeof position === "number") {
              publishPosition(position);
              setFinalPosition(position);
            }
          }}
        />
        <Button
          size="lg"
          variant="light"
          color={calibration === "ON" ? "default" : "secondary"}
          isIconOnly
          onClick={toggleCalibration}
        >
          {calibration === "ON" ? <RiEqualizerFill size={30} /> : <RiEqualizerLine size={30} />}
        </Button>
      </div>
    </DeviceCard>
  ) : (
    <></>
  );
}
