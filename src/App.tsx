import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import Layout from "./components/Layout";

const Weather = lazy(() => import("./pages/Weather"));
const Cameras = lazy(() => import("./pages/Cameras"));
const Ups = lazy(() => import("./pages/Monitoring/Ups"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const Home = lazy(() => import("./pages/Home"));
const ParentalBedroom = lazy(() => import("./pages/Home/ParentalBedroom"));
const RaspberryPi = lazy(() => import("./pages/Monitoring/RaspberryPi"));
const Network = lazy(() => import("./pages/Monitoring/Network"));
const LivingRoom = lazy(() => import("./pages/Home/LivingRoom"));
const DiningRoom = lazy(() => import("./pages/Home/DiningRoom"));
const Office = lazy(() => import("./pages/Home/Office"));

export enum RoutePaths {
  Home = "/",
  Weather = "/weather",
  Monitoring = "/monitoring",
  SmartHome = "/home",
  Cameras = "/cameras",
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
      <Route path={RoutePaths.Cameras} element={<Cameras />} />
      <Route path={RoutePaths.Monitoring} element={<Monitoring />}>
        <Route index element={<Navigate to={MonitoringRoutePaths.Network} replace />} />
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
