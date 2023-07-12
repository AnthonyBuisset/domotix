import jp from "jsonpath";
import { useMqttState, useSubscription } from "mqtt-react-hooks";

type Props = {
  topic: string;
};

export const useMqttValue = ({ topic }: Props): string | null => {
  const { message } = useSubscription(topic);
  return message?.message?.toString().replace("\n", "") || null;
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
