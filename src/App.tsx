import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Ups } from "./pages/Ups";

export enum RoutePaths {
  Home = "/",
  Ups = "/ups",
}

export const App = () => (
  <Routes>
    <Route path={RoutePaths.Home} element={<Layout />}>
      <Route element={<Home />} />
      <Route path={RoutePaths.Ups} element={<Ups />} />
    </Route>
  </Routes>
);
