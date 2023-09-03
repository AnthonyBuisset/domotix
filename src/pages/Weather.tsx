import { WeatherForecast } from "../components/WeatherForecast";
import { useNow } from "../hooks/useNow";
import { useWeatherForecast } from "../hooks/useWeatherForecast";

export default function Weather() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-2 sm:flex-row sm:gap-2 md:flex-col md:gap-8">
      <Clock />
      <WeatherForecast />
    </div>
  );
}

const Clock = () => {
  const { weekday, date, hours, minutes, seconds } = useNow();
  const forecast = useWeatherForecast();

  return (
    <div className="flex min-w-max flex-col items-center gap-1 p-2">
      {forecast ? <img src={forecast?.current.weather[0].icon} className="w-20" /> : <div className="h-20" />}
      <div>
        {weekday} {date}
      </div>
      <div className="flex items-end gap-1">
        <div className="text-4xl font-semibold">{hours}</div>
        <div className="text-2xl">{minutes}</div>
        <div className="text-2xl text-secondary">{seconds}</div>
      </div>
    </div>
  );
};
