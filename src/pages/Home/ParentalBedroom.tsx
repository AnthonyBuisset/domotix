import THB from "../../components/THB";
import Socket from "../../components/Socket";
import { Dimmer } from "../../components/Dimmer";
import { CurtainSwitch } from "../../components/CurtainSwitch";

export default function ParentalBedroom() {
  return (
    <>
      <THB topic="zigbee2mqtt/parental-bedroom/thb" />
      <div className="flex grow flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:h-fit 2xl:grid-cols-4">
        <Dimmer title="Lumieres" topic="zigbee2mqtt/parental-bedroom/light" />
        <CurtainSwitch title="Porte" topic="zigbee2mqtt/parental-bedroom/curtain/door" />
        <CurtainSwitch title="Fenetre" topic="zigbee2mqtt/parental-bedroom/curtain/window" />
        <Socket title="Coiffeuse" topic="zigbee2mqtt/parental-bedroom/socket" />
      </div>
    </>
  );
}
