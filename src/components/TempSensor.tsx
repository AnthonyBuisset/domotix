export const TempSensor = () => {
  return <View value={20.3} />;
};

import thermometer from "/assets/weather-icons/fill/thermometer.svg";

type Props = {
  value: number;
};

export const View = ({ value }: Props) => (
  <div className="flex items-center">
    <img src={thermometer} className="h-8" />
    <div className="">{value} °C</div>
  </div>
);
