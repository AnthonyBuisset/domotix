import thermometerIcon from "/assets/weather-icons/fill/thermometer.svg";
import humidityIcon from "/assets/weather-icons/fill/humidity.svg";
import barometerIcon from "/assets/weather-icons/fill/barometer.svg";
import windIcon from "/assets/weather-icons/fill/wind.svg";
import raindropIcon from "/assets/weather-icons/fill/raindrop.svg";
import { useJsonMqttValues } from "../hooks/useMqtt";
import { MdNavigation } from "react-icons/md";
import { isDefined } from "../utils";
import Clock from "./Weather/Clock";
import Wind from "./Weather/Wind.tsx";

type Props = {
  topic: string;
};

export default function CurrentWeather({ topic }: Props) {
  const [temperature, humidity, pressure, rainFall, rainToday, windDirection, windGust, windSpeed] = useJsonMqttValues({
    topic,
    paths: ["$.Heat", "$.Hum", "$.Pres", "$.RainFall", "$.RainToday", "$.WindDir", "$.WindGust", "$.WindSpeed"],
  });

  return (
    <div className="flex flex-col items-center sm:flex-row sm:gap-8">
      <Clock />
      <Wind speed={parseFloat(windSpeed)} direction={parseFloat(windDirection)} gust={parseFloat(windGust)}/>
      {isDefined(temperature) && (
        <div className="mt-6 grid grid-flow-col grid-rows-3 gap-x-4 gap-y-1">
          <div className="flex items-center gap-2">
            <img src={thermometerIcon} className="h-10 w-10" />
            {temperature} °C
          </div>
          <div className="flex items-center gap-2">
            <img src={humidityIcon} className="h-10 w-10" />
            {parseFloat(humidity).toFixed(0)}%
          </div>
          <div className="flex items-center gap-2">
            <img src={barometerIcon} className="h-10 w-10" />
            {parseFloat(pressure).toFixed(0)} hPa
          </div>
          <div className="flex items-center gap-2">
            <MdNavigation className="h-6 w-10" style={{ rotate: `${windDirection}deg` }} />
            {windSpeed} km/h
          </div>
          <div className="flex items-center gap-2">
            <img src={windIcon} className="h-10 w-10" />
            {windGust} km/h
          </div>
          <div className="flex items-center gap-2">
            <img src={raindropIcon} className="h-10 w-10" />
            {rainFall} {"("} {rainToday} {")"}
          </div>
        </div>
      )}
    </div>
  );
}
