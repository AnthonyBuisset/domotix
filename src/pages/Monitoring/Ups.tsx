import { Card } from "../../components/Card";
import { Color, Led } from "../../components/Led";
import { Gauge, Type } from "../../components/Gauge";
import { Button } from "../../components/Button";

export default function Ups() {
  const Esp32Topic = "ESP32/UPS15W-1";

  return (
    <div className="flex h-fit w-full flex-col gap-2">
      <Card>
        <h1>Input</h1>
        <Gauge type={Type.Voltage5} label="USB" topic={Esp32Topic} valuePath="$.Vusb" />
        <Gauge type={Type.Voltage5} label="Batterie" topic={Esp32Topic} valuePath="$.Vbatt" />
      </Card>
      <Card>
        <h1>Output</h1>
        <Gauge type={Type.Voltage5} label="User" topic={Esp32Topic} valuePath="$.Vuser" />
        <Gauge type={Type.Intensity} label="User" topic={Esp32Topic} valuePath="$.Iuser" />
      </Card>
      <Card>
        <h1>Internal</h1>
        <Gauge type={Type.Voltage5} label="UPS" topic={Esp32Topic} valuePath="$.Vups" />
        <Gauge type={Type.CpuTemperature} label="ESP32" topic={Esp32Topic} valuePath="$.TempESP32" />
        <Gauge type={Type.Decibels} topic={Esp32Topic} labelPath="$.SSID" valuePath="$.RSSI" />
      </Card>
      <Card>
        <h1>Control</h1>
        <div className="grid grid-cols-2 gap-4">
          <div />
          <div className="flex items-center gap-4">
            <p>USBC plug</p>
            <Led
              topic={Esp32Topic}
              valuePath="$.Vusb"
              toColor={value => ((value as number) < 2 ? Color.Red : Color.Green)}
            />
          </div>
          <Button label="Disable Out" topic="ESP32/UPS15W-1/DisableOut" message="true" />
          <div className="flex items-center gap-4">
            <p>In charge</p>
            <Led topic={Esp32Topic} valuePath="$.InCharge" toColor={value => (value ? Color.Yellow : Color.Grey)} />
          </div>
          <Button label="Enable Out" topic="ESP32/UPS15W-1/DisableOut" message="false" />
          <div className="flex items-center gap-4">
            <p>Output enabled</p>
            <Led topic={Esp32Topic} valuePath="$.OutputEnabled" toColor={value => (value ? Color.Green : Color.Red)} />
          </div>
        </div>
      </Card>
    </div>
  );
}
