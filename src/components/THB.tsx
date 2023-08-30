import thermometer from "/assets/weather-icons/fill/thermometer.svg";
import humidity from "/assets/weather-icons/fill/humidity.svg";
import barometer from "/assets/weather-icons/fill/barometer.svg";
import { useJsonMqttValues } from "../hooks/useMqtt";
import {
  RiBatteryFill,
  RiBatteryLine,
  RiBatteryLowLine,
  RiSignalWifi1Fill,
  RiSignalWifi2Fill,
  RiSignalWifi3Fill,
  RiSignalWifiErrorLine,
  RiSignalWifiFill,
} from "react-icons/ri";
import { Card } from "./Card";
import { Tooltip } from "flowbite-react";

type Props = {
  topic: string;
};

export const THB = ({ topic }: Props) => {
  const [temperature, humidity, barometer, battery, linkquality] = useJsonMqttValues({
    topic,
    paths: ["$.temperature", "$.humidity", "$.pressure", "$.battery", "$.linkquality"],
  });

  return (
    <Card className="w-full">
      <div className="flex gap-2">
        <div className="flex grow flex-col">
          <Temperature value={parseFloat(temperature)} />
          <Humidity value={parseFloat(humidity)} />
          <Barometer value={parseFloat(barometer)} />
        </div>
        <div className="flex items-center gap-2 self-start">
          <Tooltip content={`${linkquality}%`}>
            <LinkQuality value={parseFloat(linkquality)} />
          </Tooltip>
          <Tooltip content={`${battery}%`}>
            <Battery value={parseFloat(battery)} />
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

type InnerProps = {
  value: number;
};

const Temperature = ({ value }: InnerProps) => (
  <div className="flex items-center gap-1">
    <img src={thermometer} className="-mx-2 h-10" />
    <p>{value.toFixed(1)} °C</p>
  </div>
);

const Humidity = ({ value }: InnerProps) => (
  <div className="flex items-center gap-1">
    <img src={humidity} className="-mx-2 h-10" />
    <p>{value.toFixed(0)} %</p>
  </div>
);

const Barometer = ({ value }: InnerProps) => (
  <div className="flex items-center gap-2">
    <img src={barometer} className="-mx-2 h-10" />
    <p>{value.toFixed(0)} hPa</p>
  </div>
);

const LinkQuality = ({ value }: InnerProps) =>
  value > 80 ? (
    <div>
      <RiSignalWifiFill />
    </div>
  ) : value > 60 ? (
    <div>
      <RiSignalWifi3Fill />
    </div>
  ) : value > 40 ? (
    <div className="text-yellow-500">
      <RiSignalWifi2Fill />
    </div>
  ) : value > 10 ? (
    <div className="text-yellow-500">
      <RiSignalWifi1Fill />
    </div>
  ) : (
    <div className="text-red-600">
      <RiSignalWifiErrorLine />
    </div>
  );

const Battery = ({ value }: InnerProps) =>
  value > 50 ? (
    <div>
      <RiBatteryFill />
    </div>
  ) : value > 20 ? (
    <div className="text-yellow-500">
      <RiBatteryLowLine />
    </div>
  ) : (
    <div className="text-red-600">
      <RiBatteryLine />
    </div>
  );
