import { format } from "../hooks/useNow";
import { useWeatherForecast } from "../hooks/useWeatherForecast";
import { Card } from "./Card";
import thermometer from "/assets/weather-icons/fill/thermometer.svg";
import thermometerWarmer from "/assets/weather-icons/fill/thermometer-warmer.svg";
import thermometerCooler from "/assets/weather-icons/fill/thermometer-colder.svg";
import wind from "/assets/weather-icons/fill/wind.svg";

const UV_INDEXES = [...Array(11).keys()].map(i => `/assets/weather-icons/fill/uv-index-${i + 1}.svg`);

export const WeatherForecast = () => {
  const forecast = useWeatherForecast();

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto sm:w-fit md:grid md:grid-cols-2 lg:flex lg:flex-row">
      {forecast?.daily.slice(1).map((f, index) => {
        const { weekday, day, month } = format(f.date);
        return (
          <Card key={f.dt}>
            <div className="flex flex-row items-center justify-between gap-4 lg:flex-col">
              <div className="flex flex-col items-center gap-1 lg:flex-row">
                <span>{weekday}</span>
                <span>{day}</span>
                <span>{month}</span>
              </div>
              <img src={f.weather[0].icon} className="w-14" />
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-row items-center">
                  <img
                    src={
                      f.temp.day < forecast.daily[index].temp.day
                        ? thermometerCooler
                        : f.temp.day > forecast.daily[index].temp.day
                        ? thermometerWarmer
                        : thermometer
                    }
                    className="w-8"
                  />
                  {f.temp.day.toFixed(1)} °C
                </div>
                <div className="flex flex-row items-center">
                  <img src={wind} className="w-8" />
                  {(f.wind_speed * 3.6).toFixed(0)} km/h
                </div>
              </div>
              <img src={UV_INDEXES[Math.round(f.uvi) - 1]} className="w-14" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
