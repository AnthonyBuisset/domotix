import LiquidFillGauge from "react-liquid-gauge";

type Props = {
  expected: number;
  current: number;
};

export default function RainFall({ expected, current }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Precipitations:</span>
        <span>{expected}</span>
      </div>
      <LiquidFillGauge
        value={expected ? (current * 100) / expected : 100}
        width={100}
        height={100}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        circleStyle={{
          fill: "#0ea5e9",
        }}
        waveStyle={{
          fill: "#0ea5e9",
        }}
        textStyle={{
          fill: "#9ca3af",
        }}
      />
    </div>
  );
}
