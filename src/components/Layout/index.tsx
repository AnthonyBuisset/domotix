import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Suspense } from "react";
import { Background } from "../Background.tsx";

export default function Layout() {
  return (
    <div className="flex h-screen flex-col text-gray-500 dark:text-gray-400">
      <Background>
        <Suspense>
          <Outlet />
        </Suspense>
      </Background>
      <Navigation />
    </div>
  );
}
