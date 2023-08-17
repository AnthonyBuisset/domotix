import { useMqttClient } from "../hooks/useMqtt";
import { Button as View } from "flowbite-react";

type Props = {
  label: string;
  topic: string;
  message: string;
};

export const Button = ({ label, topic, message }: Props) => {
  const client = useMqttClient();

  return (
    <View gradientDuoTone="purpleToBlue" onClick={() => client?.publish(topic, message)}>
      {label}
    </View>
  );
};
