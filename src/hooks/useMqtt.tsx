import jp from "jsonpath";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type Props = {
  topic: string;
};

export const useMqttValue = ({ topic }: Props): string | undefined => {
  const { message } = useSubscription(topic);
  const [cachedMessage, setCachedMessage] = useLocalStorage(topic, message);

  useEffect(() => {
    if (message !== undefined) setCachedMessage(message);
  }, [message]);

  return (message ?? cachedMessage)?.message?.toString().replace("\n", "");
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
