import { RangeSlider } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { useDebounce } from "usehooks-ts";

type Props = {
  topic: string;
  offIcon: ReactElement;
  onIcon: ReactElement;
};

export function Slider({ topic, offIcon, onIcon }: Props) {
  const client = useMqttClient();
  const [brightness, state] = useJsonMqttValues({ topic, paths: ["$.brightness_l1", "$.state_l1"] });
  const [value, setValue] = useState(0);
  const deboundedValue = useDebounce(value, 300);

  const publishBrightness = (brightness: number) =>
    client?.publish(
      topic + "/set",
      JSON.stringify({ brightness_l1: brightness.toFixed(), state_l1: brightness ? "ON" : "OFF" })
    );

  useEffect(() => {
    publishBrightness(deboundedValue);
  }, [deboundedValue]);

  useEffect(() => {
    setValue(parseInt(state === "OFF" ? "0" : brightness));
  }, [brightness, state]);

  return (
    <div className="flex w-full flex-row items-center gap-4">
      <div className="cursor-pointer" onClick={() => publishBrightness(value ? 0 : 255)}>
        {value ? onIcon : offIcon}
      </div>
      <RangeSlider
        min={0}
        max={255}
        className="w-full"
        value={value}
        onChange={({ target }) => setValue(parseInt(target.value))}
      />
    </div>
  );
}
