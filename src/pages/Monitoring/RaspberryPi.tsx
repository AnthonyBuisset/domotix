import MqttMessagesChart from "../../components/MqttMessagesChart";
import MqttMessagesCountChart from "../../components/MqttMessagesCountChart";

export default function RaspberryPi() {
  return (
    <>
      <MqttMessagesCountChart />
      <MqttMessagesChart />
    </>
  );
}
