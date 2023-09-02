import { RangeSlider } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

type Props = {
  min?: number;
  max?: number;
  value: number;
  setValue: (value: number) => void;
};

export function Slider({ min = 0, max = 100, value, setValue }: Props) {
  const [inner, setInner] = useState(value);
  const debounced = useDebounce(inner, 300);

  useEffect(() => {
    setInner(value);
  }, [value]);

  useEffect(() => {
    if (debounced !== value) setValue(debounced);
  }, [debounced]);

  return (
    <RangeSlider
      min={min}
      max={max}
      className="w-full"
      value={inner}
      onChange={({ target }) => setInner(parseInt(target.value))}
    />
  );
}
