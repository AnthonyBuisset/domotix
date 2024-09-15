import { RiPlugFill } from "react-icons/ri";
import { MonitoringRoutePaths } from "../../App";
import { FaNetworkWired, FaRaspberryPi } from "react-icons/fa";
import { Sidebar as Base } from "../../components/Layout/Sidebar";
import config from "../../config";

export const Sidebar = () => (
  <Base
    items={
      config.PROFILE === "Antho"
        ? [
            { name: "Network", icon: <FaNetworkWired />, to: MonitoringRoutePaths.Network },
            { name: "Raspberry Pi", icon: <FaRaspberryPi />, to: MonitoringRoutePaths.RaspberryPi },
            { name: "Ups", icon: <RiPlugFill />, to: MonitoringRoutePaths.Ups },
          ]
        : [
            { name: "Network", icon: <FaNetworkWired />, to: MonitoringRoutePaths.Network },
            { name: "Ups", icon: <RiPlugFill />, to: MonitoringRoutePaths.Ups },
          ]
    }
  ></Base>
);
