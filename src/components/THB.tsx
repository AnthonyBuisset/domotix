import thermometer from "/assets/weather-icons/fill/thermometer.svg";
import humidity from "/assets/weather-icons/fill/humidity.svg";
import barometer from "/assets/weather-icons/fill/barometer.svg";
import { useJsonMqttValues } from "../hooks/useMqtt";

import { Card } from "./Card";

type Props = {
  topic: string;
};

export default function THB({ topic }: Props) {
  const [temperature, humidity, barometer, battery, linkquality] = useJsonMqttValues({
    topic,
    paths: ["$.temperature", "$.humidity", "$.pressure", "$.battery", "$.linkquality"],
  });

  return (
    <Card className="w-full" linkquality={linkquality} battery={battery}>
      <div className="flex gap-2">
        <div className="flex grow flex-col">
          <Temperature value={parseFloat(temperature)} />
          <Humidity value={parseFloat(humidity)} />
          <Barometer value={parseFloat(barometer)} />
        </div>
      </div>
    </Card>
  );
}

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
