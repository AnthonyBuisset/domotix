import classNames from "classnames";
import { Type } from ".";
import { FaPowerOff, FaThermometerHalf, FaWifi } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { ReactElement } from "react";

type Props = {
  type: Type;
  label: string;
  value: number;
};

enum Color {
  Cyan,
  Green,
  Orange,
  Red,
}

type GaugeSettings = {
  min: number;
  max: number;
  unit: string;
  color: Color;
  icon: ReactElement;
};

export const View = ({ type, value, label }: Props) => {
  const { min, max, unit, color, icon } = gaugeSettings(type, value);

  const percent = Math.max(Math.min((100 * (value - min)) / (max - min), 100), 0);

  return (
    <div className="flex w-full items-center justify-end gap-2">
      {icon}
      {label && <p>{label}</p>}
      <div className={classNames("relative h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600")}>
        <div
          className={classNames("absolute inset-y-0 left-0 rounded-l-full", {
            "rounded-r-full": percent === 100,
            "bg-cyan-500": color === Color.Cyan,
            "bg-emerald-500": color === Color.Green,
            "bg-orange-400": color === Color.Orange,
            "bg-red-500": color === Color.Red,
          })}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="w-12 whitespace-nowrap">
        {value}
        {unit}
      </p>
    </div>
  );
};

const gaugeSettings = (type: Type, value: number): GaugeSettings => {
  switch (type) {
    case Type.CpuTemperature:
      return {
        min: 40,
        max: 80,
        unit: "°C",
        color: value < 50 ? Color.Cyan : value < 55 ? Color.Green : value < 70 ? Color.Orange : Color.Red,
        icon: <FaThermometerHalf />,
      };
    case Type.Voltage5:
      return {
        min: 0,
        max: 6,
        unit: " V",
        color: value < 4 ? Color.Red : value < 4.5 ? Color.Orange : Color.Green,
        icon: <BsLightningChargeFill />,
      };
    case Type.Intensity:
      return {
        min: 0,
        max: 5,
        unit: " A",
        color: value < 4 ? Color.Red : value < 3 ? Color.Orange : Color.Green,
        icon: <FaPowerOff />,
      };
    case Type.Decibels:
      return {
        min: -120,
        max: 0,
        unit: " dB",
        color: value < -80 ? Color.Red : value < -60 ? Color.Orange : Color.Green,
        icon: <FaWifi />,
      };
  }
};
