import thermometer from "/assets/weather-icons/fill/thermometer.svg";
import humidity from "/assets/weather-icons/fill/humidity.svg";
import barometer from "/assets/weather-icons/fill/barometer.svg";

export const THB = () => {
  return (
    <div className="flex items-center justify-between">
      <Temperature value={20.3} />
      <Humidity value={64} />
      <Barometer value={1050} />
    </div>
  );
};

type InnerProps = {
  value: number;
};

const Temperature = ({ value }: InnerProps) => (
  <div className="flex items-center gap-1">
    <img src={thermometer} className="-mx-2 h-10" />
    <p>{value} °C</p>
  </div>
);

const Humidity = ({ value }: InnerProps) => (
  <div className="flex items-center gap-1">
    <img src={humidity} className="-mx-2 h-10" />
    <p>{value} %</p>
  </div>
);

const Barometer = ({ value }: InnerProps) => (
  <div className="flex items-center gap-2">
    <img src={barometer} className="-mx-2 h-10" />
    <p>{value} hPa</p>
  </div>
);
