import jp from "jsonpath";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { toast } from "react-toastify";

type Props = {
  topic: string;
};

export const useMqttValue = ({ topic }: Props): string | undefined => {
  const { message, connectionStatus } = useSubscription(topic);

  switch (connectionStatus) {
    case "Offline":
      toast.error("MQTT is offline", { toastId: "mqtt-offline" });
      break;
    case "Reconnecting":
      toast.info("MQTT is reconnecting", { toastId: "mqtt-reconnecting" });
      break;
    case "Connecting":
    case "Connected":
      break;
    default:
      toast.error("MQTT is in an unknown state", { toastId: "mqtt-unknown" });
      break;
  }

  return message?.message?.toString().replace("\n", "");
};

type JsonProps = {
  paths: string[];
} & Props;

export const useJsonMqttValues = ({ topic, paths }: JsonProps): string[] => {
  const message = useMqttValue({ topic });

  if (!message) return [];

  const json = JSON.parse(message);
  return paths.map(p => jp.query(json, p)[0]);
};

export const useMqttClient = () => {
  const { client } = useMqttState();
  return client;
};
