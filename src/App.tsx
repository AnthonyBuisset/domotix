import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Ups } from "./pages/Ups";
import { Bedroom } from "./pages/Bedroom";

export enum RoutePaths {
  Home = "/",
  Ups = "/ups",
  Bedroom = "/bedroom",
}

export const App = () => (
  <Routes>
    <Route path={RoutePaths.Home} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={RoutePaths.Ups} element={<Ups />} />
      <Route path={RoutePaths.Bedroom} element={<Bedroom />} />
    </Route>
  </Routes>
);
