import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Background } from "../Background";

export const Layout = () => {
  return (
    <div className="flex h-screen w-screen flex-col text-gray-500 dark:text-gray-400">
      <Background>
        <Outlet />
      </Background>
      <Navigation />
    </div>
  );
};
