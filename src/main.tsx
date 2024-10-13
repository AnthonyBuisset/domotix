import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Connector } from "mqtt-react-hooks";
import config from "./config.ts";
import { App } from "./App.tsx";
import { WeatherForecastProvider } from "./hooks/useWeatherForecast.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connector brokerUrl={config.MQTT_BROKER_URL}>
      <Router>
        <WeatherForecastProvider>
          <main className="h-screen overflow-auto bg-background text-foreground dark">
            <App />
          </main>
          <ToastContainer />
        </WeatherForecastProvider>
      </Router>
    </Connector>
  </React.StrictMode>
);
