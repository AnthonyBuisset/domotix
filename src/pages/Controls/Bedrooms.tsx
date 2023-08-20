import { Card } from "../../components/Card";
import { Slider } from "../../components/Slider";
import { TempSensor } from "../../components/TempSensor";

export const Bedrooms = () => (
  <div className="flex w-full flex-col gap-2 p-2 sm:flex-row">
    <Card title="Chambre parentale">
      <TempSensor />
      <Slider />
    </Card>
    <Card title="Chambre de Christophe">
      <TempSensor />
      <Slider />
    </Card>
    <Card title="Chambre de Marie">
      <TempSensor />
      <Slider />
    </Card>
  </div>
);
