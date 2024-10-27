import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Connector } from "mqtt-react-hooks";
import config from "./config.ts";
import { App } from "./App.tsx";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connector brokerUrl={config.MQTT_BROKER_URL}>
      <Router>
        <main className="h-screen overflow-auto bg-background text-foreground">
          <Providers>
            <App />
            <ToastContainer transition={Flip} />
          </Providers>
        </main>
      </Router>
    </Connector>
  </React.StrictMode>
);
