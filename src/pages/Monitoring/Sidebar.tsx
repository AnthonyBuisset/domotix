import { RiPlugFill } from "react-icons/ri";
import { MonitoringRoutePaths } from "../../App";
import { FaNetworkWired, FaRaspberryPi } from "react-icons/fa";
import { Sidebar as Base } from "../../components/Layout/Sidebar";

export const Sidebar = () => (
  <Base
    items={[
      { name: "Raspberry Pi", icon: <FaRaspberryPi />, to: MonitoringRoutePaths.RaspberryPi },
      { name: "Ups", icon: <RiPlugFill />, to: MonitoringRoutePaths.Ups },
      { name: "Network", icon: <FaNetworkWired />, to: MonitoringRoutePaths.Network },
    ]}
  ></Base>
);
