import { format } from "../hooks/useNow";
import { useWeatherForecast } from "../hooks/useWeatherForecast";
import { Card } from "./Card";
import thermometerWarmer from "/assets/weather-icons/fill/thermometer-warmer.svg";
import thermometerCooler from "/assets/weather-icons/fill/thermometer-colder.svg";
import wind from "/assets/weather-icons/fill/wind.svg";

export const WeatherForecast = () => {
  const forecast = useWeatherForecast();

  return (
    <div className="flex  w-full grow flex-col gap-2 overflow-y-auto md:w-fit lg:h-fit lg:flex-row">
      {forecast?.daily.slice(1).map(f => {
        const { weekday, day, month } = format(f.date);
        return (
          <Card key={f.dt} className="lg:h-fit">
            <div className="flex flex-row items-center justify-between gap-4 lg:flex-col">
              <div className="flex flex-col items-center gap-1 sm:flex-row lg:flex-col">
                <span>{weekday}</span>
                <span>{day}</span>
                <span>{month}</span>
              </div>
              <img src={f.weather[0].icon} className="w-14" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center">
                  <img alt={f.temp.max.toFixed(1) + " °C"} src={thermometerCooler} className="w-8" />
                  {f.temp.min.toFixed(1)} °C
                </div>
                <div className="flex flex-row items-center">
                  <img alt={f.temp.max.toFixed(1) + " °C"} src={thermometerWarmer} className="w-8" />
                  {f.temp.max.toFixed(1)} °C
                </div>
              </div>
              <div className="flex flex-row items-center">
                <img src={wind} className="w-8" />
                {(f.wind_speed * 3.6).toFixed(0)} km/h
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
