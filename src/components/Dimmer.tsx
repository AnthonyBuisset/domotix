import { RiLightbulbFill, RiLightbulbLine } from "react-icons/ri";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { DeviceCard } from "./DeviceCard.tsx";
import { isDefined, PropsWithClassName } from "../utils";
import { Button, Slider, SliderValue } from "@nextui-org/react";

type Props = {
  title: string;
  topic: string;
} & PropsWithClassName;

export function Dimmer({ topic, className }: Props) {
  const client = useMqttClient();
  const [currentBrightnessStr, currentStateStr, linkQuality] = useJsonMqttValues({
    topic,
    paths: ["$.brightness_l1", "$.state_l1", "$.linkquality"],
  });

  const currentState = currentStateStr === "ON";
  const currentBrightness = parseInt(currentBrightnessStr);

  const publish = (state: boolean, brightness: number) =>
    client?.publish(
      `${topic}/set`,
      JSON.stringify({ brightness_l1: state && !brightness ? 255 : brightness, state_l1: state ? "ON" : "OFF" })
    );

  const onSliderChange = (value: SliderValue) => {
    if (typeof value === "number") {
      value ? publish(true, value) : publish(false, currentBrightness);
    }
  };

  return isDefined(currentBrightness) ? (
    <DeviceCard linkQuality={linkQuality} className={className}>
      <div className="flex h-full items-center gap-1">
        <Button
          size="lg"
          variant="light"
          color={currentState ? "default" : "secondary"}
          isIconOnly
          onClick={() => publish(!currentState, currentBrightness)}
        >
          {currentState ? <RiLightbulbFill size={60} /> : <RiLightbulbLine size={60} />}
        </Button>
        <Slider
          aria-label={topic}
          value={currentState ? currentBrightness : 0}
          onChangeEnd={onSliderChange}
          maxValue={255}
        />
      </div>
    </DeviceCard>
  ) : null;
}
