import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Background } from "../Background";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

export const Layout = () => {
  return (
    <Flowbite>
      <DarkThemeToggle className="fixed right-4 top-4 z-50 h-10 w-10" />
      <Background>
        <Outlet />
        <Navigation />
      </Background>
    </Flowbite>
  );
};
