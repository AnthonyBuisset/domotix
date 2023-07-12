import { useMqttClient } from "../../hooks/useMqtt";
import { View } from "./View";

type Props = {
  label: string;
  topic: string;
  message: string;
};

export const Button = ({ label, topic, message }: Props) => {
  const client = useMqttClient();

  return <View label={label} onClick={() => client?.publish(topic, message)} />;
};
