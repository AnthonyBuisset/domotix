import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Weather } from "./pages/Weather";
import { Ups } from "./pages/Monitoring/Ups";
import { Monitoring } from "./pages/Monitoring";
import { Home } from "./pages/Home";
import { Indoor } from "./pages/Home/Indoor";
import { RaspberryPi } from "./pages/Monitoring/RaspberryPi";

export enum RoutePaths {
  Home = "/",
  Weather = "/weather",
  Monitoring = "/monitoring",
  SmartHome = "/home",
}

export enum SmartHomeRoutePaths {
  Indoor = "/home/indoor",
  Outdoor = "/home/outdoor",
  Cameras = "/home/cameras",
  People = "/home/people",
}

export enum MonitoringRoutePaths {
  RaspberryPi = "/monitoring/raspberrypi",
  Ups = "/monitoring/ups",
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
      </Route>
      <Route path={RoutePaths.SmartHome} element={<Home />}>
        <Route index element={<Navigate to={SmartHomeRoutePaths.Indoor} replace />} />
        <Route path={SmartHomeRoutePaths.Indoor} element={<Indoor />} />
        <Route path={SmartHomeRoutePaths.Outdoor} element={<div />} />
        <Route path={SmartHomeRoutePaths.Cameras} element={<div />} />
        <Route path={SmartHomeRoutePaths.People} element={<div />} />
      </Route>
    </Route>
  </Routes>
);
