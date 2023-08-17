import { Slider } from "../components/Slider";
import { TempSensor } from "../components/TempSensor";

export const Bedroom = () => {
  return (
    <div className="h-full p-2 ">
      <TempSensor />
      <Slider />
    </div>
  );
};
