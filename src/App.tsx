import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Weather } from "./pages/Weather";
import { Ups } from "./pages/Ups";
import { Controls } from "./pages/Controls";
import { Bedrooms } from "./pages/Controls/Bedrooms";

export enum RoutePaths {
  Home = "/",
  Weather = "/",
  Power = "/power",
  Controls = "/controls",
}

export enum ControlsRoutePaths {
  Bedrooms = "/controls/bedrooms",
}

export const App = () => (
  <Routes>
    <Route path={RoutePaths.Home} element={<Layout />}>
      <Route index element={<Weather />} />
      <Route path={RoutePaths.Power} element={<Ups />} />
      <Route path={RoutePaths.Controls} element={<Controls />}>
        <Route path={ControlsRoutePaths.Bedrooms} element={<Bedrooms />} />
      </Route>
    </Route>
  </Routes>
);
