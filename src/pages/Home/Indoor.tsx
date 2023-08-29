import { RiDoorOpenFill, RiHotelBedFill, RiLightbulbFill, RiLightbulbLine, RiPlugFill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
import { GiSofa, GiMeal } from "react-icons/gi";
import { TbWindow } from "react-icons/tb";
import { Card } from "../../components/Card";
import { Slider } from "../../components/Slider";
import { THB } from "../../components/THB";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Open as ShutterOpen, Closed as ShutterClosed } from "../../icons/Shutters";

export const Indoor = () => (
  <div className="flex h-fit w-full grid-cols-4 flex-col gap-2 p-2 sm:grid">
    <Card icon={<RiHotelBedFill />} title="Chambre parentale" className="col-span-2">
      <div className="flex gap-2">
        <THB topic="zigbee2mqtt/parental-bedroom/thb" />
        <div className="flex w-1/2 shrink-0 flex-col gap-4">
          <Slider
            onIcon={<RiLightbulbFill className="text-3xl" />}
            offIcon={<RiLightbulbLine className="text-3xl" />}
          />
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
      </div>
    </Card>
    <Card icon={<RiHotelBedFill />} title="Chambre de Christophe">
      <THB topic="" />
    </Card>
    <Card icon={<RiHotelBedFill />} title="Chambre de Marie">
      <THB topic="" />
    </Card>
    <Card icon={<PiOfficeChairFill />} title="Bureau">
      <THB topic="zigbee2mqtt/office/thb" />
    </Card>
    <Card icon={<GiSofa />} title="Salon">
      <THB topic="zigbee2mqtt/living/thb" />
    </Card>
    <Card icon={<GiMeal />} title="Salle a manger">
      <THB topic="zigbee2mqtt/dining/thb" />
    </Card>
  </div>
);
