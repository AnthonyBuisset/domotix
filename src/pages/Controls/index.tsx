import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Controls = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
