import { useSubscription } from "mqtt-react-hooks";
import { Color } from "../../components/Led";
import { View as Led } from "../../components/Led/View";
import { DeviceCard } from "../../components/DeviceCard.tsx";
import { useEffect, useState } from "react";

export default function Network() {
  const { connectionStatus, message } = useSubscription("#");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (message?.message) {
      setMessages([JSON.stringify(message.message).substring(0, 150), ...messages].slice(0, 10));
    }
  }, [message]);

  return (
    <div className="w-full p-2">
      <DeviceCard>
        <div className="mb-2 flex items-center gap-2">
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
          <h1>MQTT</h1>
        </div>
        <div className="overflow-auto border border-dashed p-2">
          <h1 className="mb-3 border-b pb-1 text-xl font-medium">Latest messages</h1>
          {messages.map((m, index) => (
            <p key={index} className="truncate whitespace-nowrap">
              {m}
            </p>
          ))}
        </div>
      </DeviceCard>
    </div>
  );
}
