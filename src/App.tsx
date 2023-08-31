import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Weather } from "./pages/Weather";
import { Ups } from "./pages/Monitoring/Ups";
import { Monitoring } from "./pages/Monitoring";
import { Home } from "./pages/Home";
import ParentalBedroom from "./pages/Home/ParentalBedroom";
import { RaspberryPi } from "./pages/Monitoring/RaspberryPi";
import { Network } from "./pages/Monitoring/Network";
import LivingRoom from "./pages/Home/LivingRoom";
import DiningRoom from "./pages/Home/DiningRoom";
import Office from "./pages/Home/Office";

export enum RoutePaths {
  Home = "/",
  Weather = "/weather",
  Monitoring = "/monitoring",
  SmartHome = "/home",
}

export enum SmartHomeRoutePaths {
  ParentalBedroom = "/home/parental-bedroom",
  ChristopheBedroom = "/home/christophe-bedroom",
  MarieBedroom = "/home/marie-bedroom",
  Office = "/home/office",
  LivingRoom = "/home/living-room",
  DiningRoom = "/home/dining-room",
}

export enum MonitoringRoutePaths {
  RaspberryPi = "/monitoring/raspberrypi",
  Ups = "/monitoring/ups",
  Network = "/monitoring/network",
}

export const App = () => (
  <Routes>
    <Route path={RoutePaths.Home} element={<Layout />}>
      <Route index element={<Navigate to={RoutePaths.Weather} replace />} />
      <Route path={RoutePaths.Weather} element={<Weather />} />
      <Route path={RoutePaths.Monitoring} element={<Monitoring />}>
        <Route index element={<Navigate to={MonitoringRoutePaths.RaspberryPi} replace />} />
        <Route path={MonitoringRoutePaths.RaspberryPi} element={<RaspberryPi />} />
        <Route path={MonitoringRoutePaths.Ups} element={<Ups />} />
        <Route path={MonitoringRoutePaths.Network} element={<Network />} />
      </Route>
      <Route path={RoutePaths.SmartHome} element={<Home />}>
        <Route index element={<Navigate to={SmartHomeRoutePaths.ParentalBedroom} replace />} />
        <Route path={SmartHomeRoutePaths.ParentalBedroom} element={<ParentalBedroom />} />
        <Route path={SmartHomeRoutePaths.ChristopheBedroom} element={<div />} />
        <Route path={SmartHomeRoutePaths.MarieBedroom} element={<div />} />
        <Route path={SmartHomeRoutePaths.LivingRoom} element={<LivingRoom />} />
        <Route path={SmartHomeRoutePaths.DiningRoom} element={<DiningRoom />} />
        <Route path={SmartHomeRoutePaths.Office} element={<Office />} />
      </Route>
    </Route>
  </Routes>
);
