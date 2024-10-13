import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation.tsx";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div>
      <Navigation />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
