import { RiDoorOpenFill, RiPlugFill } from "react-icons/ri";
import { TbWindow } from "react-icons/tb";
import THB from "../../components/THB";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { Dimmer } from "../../components/Dimmer";
import { CurtainSwitch } from "../../components/CurtainSwitch";

export default function ParentalBedroom() {
  return (
    <>
      <THB topic="zigbee2mqtt/parental-bedroom/thb" />
      <Dimmer topic="zigbee2mqtt/parental-bedroom/light" />
      <CurtainSwitch icon={<RiDoorOpenFill />} title="Porte" topic="zigbee2mqtt/parental-bedroom/curtain/door" />
      <CurtainSwitch icon={<TbWindow />} title="Fenetre" topic="zigbee2mqtt/parental-bedroom/curtain/window" />
      <ToggleSwitch icon={<RiPlugFill className="text-3xl" />} />
    </>
  );
}
