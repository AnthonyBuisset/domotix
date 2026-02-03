// Variables d'environnement requises pour le fonctionnement de l'application
const REQUIRED_ENV_VARS = [
  "VITE_MQTT_BROKER_URL",
  "VITE_OPENWEATHERMAP_API_KEY",
  "VITE_LOCATION",
] as const;

// Valide que toutes les variables d'environnement requises sont définies
function validateEnv(): void {
  const missing = REQUIRED_ENV_VARS.filter(
    (key) => !import.meta.env[key]
  );

  if (missing.length > 0) {
    const missingList = missing
      .map((key) => `  - ${key}`)
      .join("\n");
    throw new Error(
      `Variables d'environnement manquantes:\n${missingList}\n\nVérifiez que le fichier .env existe et contient ces variables.`
    );
  }
}

// Valider au chargement du module
validateEnv();

const config = {
  MQTT_BROKER_URL: import.meta.env.VITE_MQTT_BROKER_URL as string,
  OPENWEATHERMAP_API_KEY: import.meta.env.VITE_OPENWEATHERMAP_API_KEY as string,
  LOCATION: import.meta.env.VITE_LOCATION as string,
  INFLUXDB_URL: import.meta.env.VITE_INFLUXDB_URL as string | undefined,
  INFLUXDB_API_TOKEN: import.meta.env.VITE_INFLUXDB_API_TOKEN as string | undefined,
  INFLUXDB_ORG: import.meta.env.VITE_INFLUXDB_ORG as string | undefined,
  INFLUXDB_BUCKET: import.meta.env.VITE_INFLUXDB_BUCKET as string | undefined,
  INFLUXDB_MEASUREMENT: import.meta.env.VITE_INFLUXDB_MEASUREMENT as string | undefined,
  PROFILE: import.meta.env.VITE_PROFILE as string | undefined,
  MOTION_BASE_URL: import.meta.env.VITE_MOTION_BASE_URL as string | undefined,
};

export default config;
