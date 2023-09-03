import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex h-full flex-col">
      <Sidebar />
      <div className="mb-2 flex h-full grid-cols-2 grid-rows-6 flex-col gap-2 overflow-y-auto px-2">
        <Outlet />
      </div>
    </div>
  );
};
