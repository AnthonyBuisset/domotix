import CurrentWeather from "../components/CurrentWeather";
import { WeatherForecast } from "../components/WeatherForecast";

export default function Weather() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 p-2 sm:flex-row sm:gap-2 md:flex-col md:gap-8">
      <CurrentWeather topic="ESP32/WeatherStation/WS" />
      <WeatherForecast />
    </div>
  );
}
