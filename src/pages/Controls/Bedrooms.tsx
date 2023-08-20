import { Card } from "../../components/Card";
import { Slider } from "../../components/Slider";
import { TempSensor } from "../../components/TempSensor";

export const Bedrooms = () => (
  <div className="flex gap-2 p-2">
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
