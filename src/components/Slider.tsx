import { RangeSlider } from "flowbite-react";
import { ReactElement } from "react";
import { useJsonMqttValues, useMqttClient } from "../hooks/useMqtt";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  topic: string;
  offIcon: ReactElement;
  onIcon: ReactElement;
};

export function Slider({ topic, offIcon, onIcon }: Props) {
  const [brightness, state] = useJsonMqttValues({ topic, paths: ["$.brightness_l1", "$.state_l1"] });
  const percent = parseInt(state === "OFF" ? "0" : brightness) / 2.55;

  const client = useMqttClient();
  const setValue = (percent: number) =>
    client?.publish(topic + "/set", JSON.stringify({ brightness_l1: (percent * 2.55).toFixed() }));

  const debouncedSetValue = useDebouncedCallback(setValue, 300);

  return (
    <div className="flex w-full flex-row items-center gap-4">
      <div className="cursor-pointer" onClick={() => setValue(brightness ? 0 : 100)}>
        {brightness ? (
          <button onClick={() => setValue(0)}>{onIcon}</button>
        ) : (
          <button onClick={() => setValue(100)}>{offIcon}</button>
        )}
      </div>
      <RangeSlider
        className="w-full"
        value={percent.toString()}
        onChange={({ target }) => debouncedSetValue(parseInt(target.value))}
      />
    </div>
  );
}
