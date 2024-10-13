import THB from "../../components/THB";
import Socket from "../../components/Socket";
import { Dimmer } from "../../components/Dimmer";
import { CurtainSwitch } from "../../components/CurtainSwitch";

export default function ParentalBedroom() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <THB className="col-span-2 row-span-2" topic="zigbee2mqtt/parental-bedroom/thb" />
      <Dimmer className="col-span-2" title="Lumieres" topic="zigbee2mqtt/parental-bedroom/light" />
      <CurtainSwitch className="col-span-2" title="Porte" topic="zigbee2mqtt/parental-bedroom/curtain/door" />
      <CurtainSwitch className="col-span-2" title="Fenetre" topic="zigbee2mqtt/parental-bedroom/curtain/window" />
      <Socket title="Coiffeuse" topic="zigbee2mqtt/parental-bedroom/socket" />
    </div>
  );
}
