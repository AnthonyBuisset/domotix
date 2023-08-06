import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";
import { Background } from "../Background";

export const Layout = () => {
  return (
    <Background>
      <div className="flex">
        <Menu />
        <Outlet />
      </div>
    </Background>
  );
};
