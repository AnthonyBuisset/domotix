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
import { useWeatherForecast } from "../hooks/useWeatherForecast.tsx";

type Props = {
  topic: string;
};

export default function CurrentWeather({ topic }: Props) {
  const [temperature, humidity, pressure, rainFall, rainToday, windDirection, windGust, windSpeed] = useJsonMqttValues({
    topic,
    paths: ["$.TempDHT", "$.Hum", "$.Pres", "$.RainFall", "$.RainToday", "$.WindDir", "$.WindGust", "$.WindSpeed"],
  });

  const w = useWeatherForecast();

  return (
    <div className="flex w-full flex-col items-center sm:flex-col sm:gap-8">
      <div className="flex w-full flex-row items-center justify-between px-4 sm:flex-col md:flex-row md:justify-center">
        <img src={w?.current.weather[0].icon} className="w-36" alt={w?.current.weather[0].main} />
        <Clock />
      </div>
      <div className="flex flex-row items-center gap-2">
        {isDefined(windDirection) ? <Wind speed={parseFloat(windSpeed)} direction={parseFloat(windDirection)} /> : null}
        {isDefined(temperature) ? (
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
        ) : null}
      </div>
    </div>
  );
}
