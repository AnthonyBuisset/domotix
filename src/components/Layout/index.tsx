import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation.tsx";

function LoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size="lg" label="Chargement..." />
    </div>
  );
}

export default function Layout() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
