import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Connector } from "mqtt-react-hooks";
import config from "./config.ts";
import { App } from "./App.tsx";
import { Flowbite } from "flowbite-react";
import { WeatherForecastProvider } from "./hooks/useWeatherForecast.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Flowbite>
      <Connector brokerUrl={config.MQTT_BROKER_URL}>
        <Router>
          <WeatherForecastProvider>
            <App />
          </WeatherForecastProvider>
        </Router>
      </Connector>
    </Flowbite>
  </React.StrictMode>
);
