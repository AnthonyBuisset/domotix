import { RiDoorOpenFill, RiLightbulbFill, RiLightbulbLine, RiPlugFill } from "react-icons/ri";
import { TbWindow } from "react-icons/tb";
import { Card } from "../../components/Card";
import { Slider } from "../../components/Slider";
import { THB } from "../../components/THB";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Open as ShutterOpen, Closed as ShutterClosed } from "../../icons/Shutters";

export const Indoor = () => (
  <div className="flex h-fit w-full grid-cols-2 flex-col gap-2 p-2 sm:grid">
    <Card title="Chambre parentale" className="row-span-2">
      <div className="flex flex-col gap-4">
        <THB />
        <Slider onIcon={<RiLightbulbFill className="text-3xl" />} offIcon={<RiLightbulbLine className="text-3xl" />} />
        <div className="flex items-center gap-1">
          <RiDoorOpenFill className="text-3xl" />
          <Slider onIcon={<ShutterOpen size={30} />} offIcon={<ShutterClosed size={30} />} />
        </div>
        <div className="flex items-center gap-1">
          <TbWindow className="text-3xl" />
          <Slider onIcon={<ShutterOpen size={30} />} offIcon={<ShutterClosed size={30} />} />
        </div>
        <ToggleSwitch icon={<RiPlugFill className="text-3xl" />} />
      </div>
    </Card>
    <Card title="Chambre de Christophe">
      <THB />
    </Card>
    <Card title="Chambre de Marie">
      <THB />
    </Card>
  </div>
);
