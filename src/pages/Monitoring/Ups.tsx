import { Card } from "../../components/Card";
import { Color, Led } from "../../components/Led";
import { Gauge, Type } from "../../components/Gauge";
import { Button } from "../../components/Button";

export const Ups = () => {
  const Esp32Topic = "ESP32/UPS15W-1";

  return (
    <div className="flex h-fit w-full grid-cols-2 flex-col gap-2 p-2 md:grid">
      <Card title="Input">
        <Gauge type={Type.Voltage5} label="USB" topic={Esp32Topic} valuePath="$.Vusb" />
        <Gauge type={Type.Voltage5} label="Batterie" topic={Esp32Topic} valuePath="$.Vbatt" />
      </Card>
      <Card title="Output">
        <Gauge type={Type.Voltage5} label="User" topic={Esp32Topic} valuePath="$.Vuser" />
        <Gauge type={Type.Intensity} label="User" topic={Esp32Topic} valuePath="$.Iuser" />
      </Card>
      <Card title="Internal">
        <Gauge type={Type.Voltage5} label="UPS" topic={Esp32Topic} valuePath="$.Vups" />
        <Gauge type={Type.CpuTemperature} label="ESP32" topic={Esp32Topic} valuePath="$.TempESP32" />
        <Gauge type={Type.Decibels} topic={Esp32Topic} labelPath="$.SSID" valuePath="$.RSSI" />
      </Card>
      <Card title="Control">
        <div className="grid grid-cols-2 gap-4">
          <div />
          <Led
            topic={Esp32Topic}
            label="USBC plug"
            valuePath="$.Vusb"
            toColor={value => ((value as number) < 2 ? Color.Red : Color.Green)}
          />
          <Button label="Disable Out" topic="ESP32/UPS15W-1/DisableOut" message="true" />
          <Led
            topic={Esp32Topic}
            label="In charge"
            valuePath="$.InCharge"
            toColor={value => (value ? Color.Yellow : Color.Grey)}
          />
          <Button label="Enable Out" topic="ESP32/UPS15W-1/DisableOut" message="false" />
          <Led
            topic={Esp32Topic}
            label="Output enabled"
            valuePath="$.OutputEnabled"
            toColor={value => (value ? Color.Green : Color.Red)}
          />
        </div>
      </Card>
    </div>
  );
};
