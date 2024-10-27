import { useHref, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { WeatherForecastProvider } from "./hooks/useWeatherForecast.tsx";

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <ThemeProvider attribute="class" defaultTheme={"light"}>
        <WeatherForecastProvider>{children}</WeatherForecastProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
