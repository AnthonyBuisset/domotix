import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Monitoring = () => {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <Sidebar />
      <div className="flex h-fit w-full flex-col gap-2 overflow-y-auto px-2 pb-2 md:p-2 xl:flex-row">
        <Outlet />
      </div>
    </div>
  );
};
