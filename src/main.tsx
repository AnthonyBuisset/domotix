import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Connector } from "mqtt-react-hooks";
import config from "./config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connector brokerUrl="ws://192.168.1.2:9001">
      <App />
    </Connector>
  </React.StrictMode>
);
