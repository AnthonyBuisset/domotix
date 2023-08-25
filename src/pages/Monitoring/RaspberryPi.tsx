import MqttMessagesCountChart from "../../components/MqttMessagesCountChart";

export const RaspberryPi = () => {
  return (
    <div className="flex h-fit w-full grid-cols-2 flex-col gap-2 p-2 md:grid">
      <MqttMessagesCountChart />
    </div>
  );
};
