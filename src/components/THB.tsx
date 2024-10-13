import thermometer from "/assets/weather-icons/fill/thermometer.svg";
import humidity from "/assets/weather-icons/fill/humidity.svg";
import barometer from "/assets/weather-icons/fill/barometer.svg";
import { useJsonMqttValues } from "../hooks/useMqtt";
import GaugeComponent from "react-gauge-component";
import { DeviceCard } from "./DeviceCard.tsx";

type Props = {
  topic: string;
  className?: string;
};

export default function THB({ topic, className }: Props) {
  const [temperature, humidity, barometer, battery, linkquality] = useJsonMqttValues({
    topic,
    paths: ["$.temperature", "$.humidity", "$.pressure", "$.battery", "$.linkquality"],
  });

  return (
    <DeviceCard className={className} linkQuality={linkquality} battery={battery}>
      <div className="flex items-center">
        {temperature !== undefined && <Temperature value={parseFloat(temperature)} />}
        <div className="flex min-w-max grow flex-col">
          <Humidity value={parseFloat(humidity)} />
          <Barometer value={parseFloat(barometer)} />
        </div>
      </div>
    </DeviceCard>
  );
}

type InnerProps = {
  value: number;
};

const Temperature = ({ value }: InnerProps) => {
  const min = -10;
  const max = 40;
  const nbSubArcs = (max - min) * 10;

  return (
    <div className="relative min-w-0">
      <img
        src={thermometer}
        className="absolute left-1/2 top-1/2 m-auto h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2"
      />
      <GaugeComponent
        type="radial"
        className="-m-4"
        arc={{
          colorArray: ["#38bdf8", "#ea580c"],
          padding: 0,
          width: 0.05,
          subArcs: [...Array(nbSubArcs + 1).keys()].map(x => ({ limit: (x * (max - min)) / nbSubArcs + min })),
          cornerRadius: 0,
        }}
        pointer={{ type: "blob", width: 12 }}
        labels={{
          valueLabel: { formatTextValue: value => value + "ºC", maxDecimalDigits: 1, matchColorWithArc: true },
          tickLabels: { hideMinMax: true },
        }}
        value={Math.max(min, Math.min(max, value))}
        minValue={min}
        maxValue={max}
      />
    </div>
  );
};

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
