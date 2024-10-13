import { useMqttClient } from "../hooks/useMqtt";
import { Button, ButtonProps } from "@nextui-org/react";

type Props = ButtonProps & {
  label: string;
  topic: string;
  message: string;
};

export const MqttButton = ({ label, topic, message, ...rest }: Props) => {
  const client = useMqttClient();

  return (
    <Button onClick={() => client?.publish(topic, message)} {...rest}>
      {label}
    </Button>
  );
};
