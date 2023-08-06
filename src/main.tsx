import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Connector } from "mqtt-react-hooks";

import config from "./config.ts";
import { App } from "./App.tsx";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connector brokerUrl={config.MQTT_BROKER_URL}>
      <Router>
        <App />
      </Router>
    </Connector>
  </React.StrictMode>
);
