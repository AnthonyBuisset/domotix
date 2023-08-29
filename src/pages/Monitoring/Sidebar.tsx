import { RiPlugFill } from "react-icons/ri";
import { MonitoringRoutePaths } from "../../App";
import { FaNetworkWired, FaRaspberryPi } from "react-icons/fa";
import { Sidebar as Base, Item } from "../../components/Layout/Sidebar";

export const Sidebar = () => (
  <Base>
    <Item name="Raspberry Pi" icon={FaRaspberryPi} to={MonitoringRoutePaths.RaspberryPi} />
    <Item name="Ups" icon={RiPlugFill} to={MonitoringRoutePaths.Ups} />
    <Item name="Network" icon={FaNetworkWired} to={MonitoringRoutePaths.Network} />
  </Base>
);
