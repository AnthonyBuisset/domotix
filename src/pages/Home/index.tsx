import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};
