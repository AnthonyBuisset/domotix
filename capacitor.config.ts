import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.abuisset.domotix",
  appName: "Domotix",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
