import { RiDoorOpenFill, RiHotelBedFill, RiPlugFill } from "react-icons/ri";
import { PiOfficeChairFill } from "react-icons/pi";
import { GiSofa, GiMeal } from "react-icons/gi";
import { TbWindow } from "react-icons/tb";
import { Card } from "../../components/Card";
import { THB } from "../../components/THB";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Dimmer } from "../../components/Dimmer";
import { CurtainSwitch } from "../../components/CurtainSwitch";

export const Indoor = () => (
  <div className="flex h-fit w-full grid-cols-2 flex-col gap-2 p-2 sm:grid lg:grid-cols-3 xl:grid-cols-4">
    <Card icon={<RiHotelBedFill />} title="Chambre parentale" className="col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <THB topic="zigbee2mqtt/parental-bedroom/thb" />
        <div className="flex shrink-0 flex-col gap-4 sm:w-1/2">
          <Dimmer topic="zigbee2mqtt/parental-bedroom/light" />
          <CurtainSwitch icon={<RiDoorOpenFill />} title="Porte" topic="zigbee2mqtt/parental-bedroom/curtain/door" />
          <CurtainSwitch icon={<TbWindow />} title="Fenetre" topic="zigbee2mqtt/parental-bedroom/curtain/window" />
          <ToggleSwitch icon={<RiPlugFill className="text-3xl" />} />
        </div>
      </div>
    </Card>
    <Card icon={<RiHotelBedFill />} title="Chambre de Christophe">
      <THB topic="#" />
    </Card>
    <Card icon={<RiHotelBedFill />} title="Chambre de Marie">
      <THB topic="#" />
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
