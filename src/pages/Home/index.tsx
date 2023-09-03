import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex h-full flex-col sm:flex-row">
      <Sidebar />
      <div className="flex h-full w-full flex-col gap-2 overflow-y-auto px-2 pb-2 md:p-2 lg:h-fit lg:flex-row">
        <Outlet />
      </div>
    </div>
  );
}
