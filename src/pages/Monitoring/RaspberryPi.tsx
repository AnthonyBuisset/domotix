import MqttMessagesChart from "../../components/MqttMessagesChart";
import MqttMessagesCountChart from "../../components/MqttMessagesCountChart";

export const RaspberryPi = () => {
  return (
    <>
      <MqttMessagesCountChart />
      <MqttMessagesChart />
    </>
  );
};
