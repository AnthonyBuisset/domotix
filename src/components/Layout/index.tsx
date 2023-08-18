import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Background } from "../Background";

export const Layout = () => {
  return (
    <Background>
      <Outlet />
      <Navigation />
    </Background>
  );
};
