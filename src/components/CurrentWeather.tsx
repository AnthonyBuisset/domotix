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
import { Button, useDisclosure } from "@nextui-org/react";
import MqttGraphModal, { MqttGraphModalProps } from "./MqttGraphModal.tsx";
import { useState } from "react";

type Props = {
  topic: string;
};

export default function CurrentWeather({ topic }: Props) {
  const [temperature, humidity, pressure, rainFall, rainToday, windDirection, windGust, windSpeed] = useJsonMqttValues({
    topic,
    paths: ["$.TempDHT", "$.Hum", "$.Pres", "$.RainFall", "$.RainToday", "$.WindDir", "$.WindGust", "$.WindSpeed"],
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalProps, setModalProps] = useState<MqttGraphModalProps>();

  const w = useWeatherForecast();

  const showGraph = (props: MqttGraphModalProps) => {
    setModalProps(props);
    onOpen();
  };

  return (
    <>
      <div className="flex w-full flex-col items-center sm:flex-col sm:gap-8">
        <div className="flex w-full flex-row items-center justify-between px-4 sm:flex-col md:flex-row md:justify-center">
          <img src={w?.current.weather[0].icon} className="w-36" alt={w?.current.weather[0].main} />
          <Clock />
        </div>
        <div className="flex flex-row items-center gap-2">
          {isDefined(windDirection) ? (
            <Wind speed={parseFloat(windSpeed)} direction={parseFloat(windDirection)} />
          ) : null}
          {isDefined(temperature) ? (
            <div className="mt-6 grid grid-flow-col grid-rows-3 gap-x-4 gap-y-1">
              <Button
                variant="light"
                startContent={<img src={thermometerIcon} className="h-10 w-10" />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Temperature",
                    field: "TempDHT",
                    topic,
                    unit: "°C",
                    max: 40,
                    min: -20,
                  })
                }
              >
                {temperature} °C
              </Button>
              <Button
                variant="light"
                startContent={<img src={humidityIcon} className="h-10 w-10" />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Humidity",
                    field: "Hum",
                    topic,
                    unit: "%",
                    max: 100,
                    min: 0,
                  })
                }
              >
                {parseFloat(humidity).toFixed(0)}%
              </Button>
              <Button
                variant="light"
                startContent={<img src={barometerIcon} className="h-10 w-10" />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Pression atmosphérique",
                    field: "Pres",
                    topic,
                    unit: " hPa",
                    max: 1100,
                    min: 800,
                  })
                }
              >
                {parseFloat(pressure).toFixed(0)} hPa
              </Button>
              <Button
                variant="light"
                startContent={<MdNavigation className="h-6 w-10" style={{ rotate: `${windDirection}deg` }} />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Vitesse du vent",
                    field: "WindSpeed",
                    topic,
                    unit: " km/h",
                    max: 100,
                    min: 0,
                  })
                }
              >
                {windSpeed} km/h
              </Button>
              <Button
                variant="light"
                startContent={<img src={windIcon} className="h-10 w-10" />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Rafales",
                    field: "WindGust",
                    topic,
                    unit: " km/h",
                    max: 100,
                    min: 0,
                  })
                }
              >
                {windGust} km/h
              </Button>
              <Button
                variant="light"
                startContent={<img src={raindropIcon} className="h-10 w-10" />}
                className="flex items-center justify-start"
                onPress={() =>
                  showGraph({
                    title: "Pluie",
                    field: "RainFall",
                    topic,
                    unit: " mm",
                    max: 10,
                    min: 0,
                  })
                }
              >
                {rainFall} {"("} {rainToday} {")"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {modalProps ? (
        <MqttGraphModal
          {...modalProps}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          size="2xl"
          placement="top"
        />
      ) : null}
    </>
  );
}
