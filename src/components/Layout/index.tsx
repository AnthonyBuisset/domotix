import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Background } from "../Background";

export const Layout = () => {
  return (
    <Background>
      <div className="text-gray-500 dark:text-gray-400">
        <div className="mb-16">
          <Outlet />
        </div>
        <Navigation />
      </div>
    </Background>
  );
};
