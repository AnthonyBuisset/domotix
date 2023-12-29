import config from "../config";
import clearDay from "/assets/weather-icons/fill/clear-day.svg";
import drizzle from "/assets/weather-icons/fill/drizzle.svg";
import thunderstormsRain from "/assets/weather-icons/fill/thunderstorms-rain.svg";
import thunderstorms from "/assets/weather-icons/fill/thunderstorms.svg";
import rain from "/assets/weather-icons/fill/rain.svg";
import snow from "/assets/weather-icons/fill/snow.svg";
import sleet from "/assets/weather-icons/fill/sleet.svg";
import mist from "/assets/weather-icons/fill/mist.svg";
import smoke from "/assets/weather-icons/fill/smoke.svg";
import haze from "/assets/weather-icons/fill/haze.svg";
import dust from "/assets/weather-icons/fill/dust.svg";
import dustWind from "/assets/weather-icons/fill/dust-wind.svg";
import fog from "/assets/weather-icons/fill/fog.svg";
import tornado from "/assets/weather-icons/fill/tornado.svg";
import cloudy from "/assets/weather-icons/fill/cloudy.svg";
import overcast from "/assets/weather-icons/fill/overcast.svg";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { useAlert } from "./useAlert";

type Response = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Forecast;
  daily: Forecast[];
};

type Forecast = {
  dt: number;
  date: Date;
  sunrise: Date;
  sunset: Date;
  temp: Temperature;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
};

type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type Weather = {
  id: WeatherId;
  main: string;
  description: string;
  icon: string;
};

export enum WeatherId {
  ThunderstormWithLightRain = 200,
  ThunderstormWithRain = 201,
  ThunderstormWithHeavyRain = 202,
  LightThunderstorm = 210,
  Thunderstorm = 211,
  HeavyThunderstorm = 212,
  RaggedThunderstorm = 221,
  ThunderstormWithLightDrizzle = 230,
  ThunderstormWithDrizzle = 231,
  ThunderstormWithHeavyDrizzle = 232,
  LightIntensityDrizzle = 300,
  Drizzle = 301,
  HeavyIntensityDrizzle = 302,
  LightIntensityDrizzleRain = 310,
  DrizzleRain = 311,
  HeavyIntensityDrizzleRain = 312,
  ShowerRainAndDrizzle = 313,
  HeavyShowerRainAndDrizzle = 314,
  ShowerDrizzle = 321,
  LightRain = 500,
  ModerateRain = 501,
  HeavyIntensityRain = 502,
  VeryHeavyRain = 503,
  ExtremeRain = 504,
  FreezingRain = 511,
  LightIntensityShowerRain = 520,
  ShowerRain = 521,
  HeavyIntensityShowerRain = 522,
  RaggedShowerRain = 531,
  LightSnow = 600,
  Snow = 601,
  HeavySnow = 602,
  Sleet = 611,
  LightShowerSleet = 612,
  ShowerSleet = 613,
  LightRainAndSnow = 615,
  RainAndSnow = 616,
  LightShowerSnow = 620,
  ShowerSnow = 621,
  HeavyShowerSnow = 622,
  Mist = 701,
  Smoke = 711,
  Haze = 721,
  SandDustWhirls = 731,
  Fog = 741,
  Sand = 751,
  Dust = 761,
  VolcanicAsh = 762,
  Squalls = 771,
  Tornado = 781,
  ClearSky = 800,
  FewClouds = 801,
  ScatteredClouds = 802,
  BrokenClouds = 803,
  OvercastClouds = 804,
}

const ICONS: Record<WeatherId, string> = {
  [WeatherId.ThunderstormWithLightRain]: thunderstormsRain,
  [WeatherId.ThunderstormWithRain]: thunderstormsRain,
  [WeatherId.ThunderstormWithHeavyRain]: thunderstormsRain,
  [WeatherId.LightThunderstorm]: thunderstorms,
  [WeatherId.Thunderstorm]: thunderstorms,
  [WeatherId.HeavyThunderstorm]: thunderstorms,
  [WeatherId.RaggedThunderstorm]: thunderstorms,
  [WeatherId.ThunderstormWithLightDrizzle]: thunderstormsRain,
  [WeatherId.ThunderstormWithDrizzle]: thunderstormsRain,
  [WeatherId.ThunderstormWithHeavyDrizzle]: thunderstormsRain,
  [WeatherId.LightIntensityDrizzle]: drizzle,
  [WeatherId.Drizzle]: drizzle,
  [WeatherId.HeavyIntensityDrizzle]: drizzle,
  [WeatherId.LightIntensityDrizzleRain]: drizzle,
  [WeatherId.DrizzleRain]: drizzle,
  [WeatherId.HeavyIntensityDrizzleRain]: drizzle,
  [WeatherId.ShowerRainAndDrizzle]: drizzle,
  [WeatherId.HeavyShowerRainAndDrizzle]: drizzle,
  [WeatherId.ShowerDrizzle]: drizzle,
  [WeatherId.LightRain]: rain,
  [WeatherId.ModerateRain]: rain,
  [WeatherId.HeavyIntensityRain]: rain,
  [WeatherId.VeryHeavyRain]: rain,
  [WeatherId.ExtremeRain]: rain,
  [WeatherId.FreezingRain]: rain,
  [WeatherId.LightIntensityShowerRain]: rain,
  [WeatherId.ShowerRain]: rain,
  [WeatherId.HeavyIntensityShowerRain]: rain,
  [WeatherId.RaggedShowerRain]: rain,
  [WeatherId.LightSnow]: snow,
  [WeatherId.Snow]: snow,
  [WeatherId.HeavySnow]: snow,
  [WeatherId.Sleet]: sleet,
  [WeatherId.LightShowerSleet]: sleet,
  [WeatherId.ShowerSleet]: sleet,
  [WeatherId.LightRainAndSnow]: snow,
  [WeatherId.RainAndSnow]: snow,
  [WeatherId.LightShowerSnow]: snow,
  [WeatherId.ShowerSnow]: snow,
  [WeatherId.HeavyShowerSnow]: snow,
  [WeatherId.Mist]: mist,
  [WeatherId.Smoke]: smoke,
  [WeatherId.Haze]: haze,
  [WeatherId.SandDustWhirls]: dustWind,
  [WeatherId.Fog]: fog,
  [WeatherId.Sand]: dust,
  [WeatherId.Dust]: dust,
  [WeatherId.VolcanicAsh]: dust,
  [WeatherId.Squalls]: tornado,
  [WeatherId.Tornado]: tornado,
  [WeatherId.ClearSky]: clearDay,
  [WeatherId.FewClouds]: cloudy,
  [WeatherId.ScatteredClouds]: cloudy,
  [WeatherId.BrokenClouds]: cloudy,
  [WeatherId.OvercastClouds]: overcast,
};

type WeatherForecast = Response;

const WeatherForecastContext = createContext<WeatherForecast | null>(null);

export const WeatherForecastProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Response | null>(null);
  const { alert } = useAlert();

  useEffectOnce(() => {
    const refresh = () =>
      fetchData()
        .then(setData)
        .catch(e => {
          alert("Erreur durant la mise à jour des prévisions météo");
          console.error(e);
        });
    refresh();
    const interval = setInterval(refresh, 3_600_000);
    return () => clearInterval(interval);
  });

  return <WeatherForecastContext.Provider value={data}>{children}</WeatherForecastContext.Provider>;
};

export const useWeatherForecast = () => {
  return useContext(WeatherForecastContext);
};

const fetchData = async (): Promise<Response> => {
  const [latitude, longitude] = config.LOCATION.split(",");

  const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
  url.searchParams.append("lat", latitude);
  url.searchParams.append("lon", longitude);
  url.searchParams.append("units", "metric");
  url.searchParams.append("exclude", "minutely,hourly,alerts");
  url.searchParams.append("appid", config.OPENWEATHERMAP_API_KEY);

  const data: Response = await fetch(url.href).then(response => response.json());

  data.current.weather.forEach(w => (w.icon = ICONS[w.id]));

  data.daily.forEach(d => (d.date = new Date(d.dt * 1000)));

  data.daily
    .map(d => d.weather)
    .flat()
    .forEach(w => (w.icon = ICONS[w.id]));

  return data;
};
