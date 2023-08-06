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
    <div className="flex flex-row gap-2">
      {forecast?.daily.slice(1).map((f, index) => {
        const { weekday, day, month } = format(f.date);
        return (
          <Card key={f.dt} className="flex flex-col items-center">
            <div>{`${weekday} ${day} ${month}`}</div>
            <img src={f.weather[0].icon} className="w-14" />
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
            <img src={UV_INDEXES[Math.round(f.uvi) - 1]} className="w-10" />
          </Card>
        );
      })}
    </div>
  );
};
