import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Weather } from "./pages/Weather";
import { Ups } from "./pages/Ups";
import { Controls } from "./pages/Controls";
import { Bedrooms } from "./pages/Controls/Bedrooms";

export enum RoutePaths {
  Home = "/",
  Weather = "/weather",
  Power = "/power",
  Controls = "/controls",
}

export enum ControlsRoutePaths {
  Bedrooms = "/controls/bedrooms",
  Bathroom = "/controls/bathroom",
}

export const App = () => (
  <Routes>
    <Route path={RoutePaths.Home} element={<Layout />}>
      <Route index element={<Navigate to={RoutePaths.Weather} replace />} />
      <Route path={RoutePaths.Weather} element={<Weather />} />
      <Route path={RoutePaths.Power} element={<Ups />} />
      <Route path={RoutePaths.Controls} element={<Controls />}>
        <Route index element={<Navigate to={ControlsRoutePaths.Bedrooms} replace />} />
        <Route index path={ControlsRoutePaths.Bedrooms} element={<Bedrooms />} />
        <Route path={ControlsRoutePaths.Bathroom} element={<Weather />} />
      </Route>
    </Route>
  </Routes>
);
