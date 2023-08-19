import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Background } from "../Background";

export const Layout = () => {
  return (
    <Background>
      <div className="border-gray-200 text-gray-500 dark:border-gray-600  dark:text-gray-400">
        <Outlet />
        <Navigation />
      </div>
    </Background>
  );
};
