import { useHref, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider, useTheme } from "next-themes";
import { WeatherForecastProvider } from "./hooks/useWeatherForecast.tsx";
import { Flip, ToastContainer } from "react-toastify";

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <ThemeProvider attribute="class">
        <WeatherForecastProvider>{children}</WeatherForecastProvider>
        <ToastContainer theme={theme} transition={Flip} />
      </ThemeProvider>
    </NextUIProvider>
  );
}
