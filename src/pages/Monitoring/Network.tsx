import { useSubscription } from "mqtt-react-hooks";
import { Color } from "../../components/Led";
import { View as Led } from "../../components/Led/View";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

export const Network = () => {
  const { connectionStatus, message } = useSubscription("#");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (message?.message) {
      setMessages([JSON.stringify(message.message).substring(0, 150), ...messages].slice(0, 10));
    }
  }, [message]);

  return (
    <div className="w-full p-2">
      <Card
        icon={
          <Led
            value={
              connectionStatus === "Offline"
                ? Color.Red
                : connectionStatus === "Reconnecting"
                ? Color.Yellow
                : connectionStatus === "Connected"
                ? Color.Green
                : connectionStatus === "Connecting"
                ? Color.Blue
                : Color.Grey
            }
          />
        }
        title="MQTT"
      >
        <div className="overflow-auto border border-dashed p-2">
          <h1 className="mb-3 border-b pb-1 text-xl font-medium">Latest messages</h1>
          {messages.map((m, index) => (
            <p key={index} className="truncate whitespace-nowrap">
              {m}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
};
