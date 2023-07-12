import GaugeChart from "react-gauge-chart";
import { Type } from ".";

type Props = {
  type: Type;
  label: string;
  value: number;
};

type GaugeSettings = {
  min: number;
  max: number;
  colors: string[];
  unit: string;
};

const NEEDLE_COLOR = "#64748b";

export const View = ({ type, value, label }: Props) => {
  const { min, max, colors, unit } = gaugeSettings(type);

  return (
    <div className="flex w-fit flex-col items-center gap-1">
      <GaugeChart
        colors={colors}
        needleColor={NEEDLE_COLOR}
        needleBaseColor={NEEDLE_COLOR}
        nrOfLevels={30}
        arcPadding={0.01}
        percent={(value - min) / (max - min)}
        arcWidth={0.15}
        textColor="#d6d3d1"
        fontSize="22"
        formatTextValue={() => `${value}${unit}`}
        marginInPercent={0.01}
        animate={false}
      />
      <div className="flex w-full flex-row justify-between px-2 text-lg">
        <div>{`${min}${unit}`}</div>
        <div>{label}</div>
        <div>{`${max}${unit}`}</div>
      </div>
    </div>
  );
};

const gaugeSettings = (type: Type): GaugeSettings => {
  switch (type) {
    case Type.CpuTemperature:
      return {
        min: 40,
        max: 80,
        colors: ["#6ee7b7", "#ef4444"],
        unit: "°C",
      };
    case Type.WeatherTemperature:
      return {
        min: -10,
        max: 50,
        colors: ["#6ee7b7", "#ef4444"],
        unit: "°C",
      };
    case Type.Voltage5:
      return {
        min: 0,
        max: 6,
        colors: ["#4ade80"],
        unit: " V",
      };
    case Type.Intensity:
      return {
        min: 0,
        max: 5,
        colors: ["#4ade80"],
        unit: " A",
      };
    case Type.Decibels:
      return {
        min: -120,
        max: 0,
        colors: ["#4ade80"],
        unit: " dB",
      };
  }
};
