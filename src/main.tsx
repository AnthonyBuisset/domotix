import "./index.css";

import { Connector } from "mqtt-react-hooks";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import config from "./config.ts";
import { Providers } from "./providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Connector brokerUrl={config.MQTT_BROKER_URL}>
        <Router>
          <main className="h-screen overflow-auto bg-background text-foreground">
            <Providers>
              <App />
            </Providers>
          </main>
        </Router>
      </Connector>
    </ErrorBoundary>
  </React.StrictMode>
);
