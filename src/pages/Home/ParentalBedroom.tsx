import THB from "../../components/THB";
import Socket from "../../components/Socket";
import { Dimmer } from "../../components/Dimmer";
import { CurtainSwitch } from "../../components/CurtainSwitch";

export default function ParentalBedroom() {
  return (
    <>
      <THB className="lg:row-span-2" topic="zigbee2mqtt/parental-bedroom/thb" />
      <Dimmer title="Lumieres" topic="zigbee2mqtt/parental-bedroom/light" />
      <CurtainSwitch title="Porte" topic="zigbee2mqtt/parental-bedroom/curtain/door" />
      <CurtainSwitch title="Fenetre" topic="zigbee2mqtt/parental-bedroom/curtain/window" />
      <Socket title="Coiffeuse" topic="zigbee2mqtt/parental-bedroom/socket" />
    </>
  );
}
