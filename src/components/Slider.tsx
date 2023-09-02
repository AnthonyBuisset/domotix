import { RangeSlider } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

type Props = {
  min?: number;
  max?: number;
  offIcon: ReactElement;
  onIcon: ReactElement;
  value: number;
  setValue: (value: number) => void;
};

export function Slider({ min = 0, max = 100, offIcon, onIcon, value, setValue }: Props) {
  const [inner, setInner] = useState(value);
  const debounced = useDebounce(inner, 300);

  useEffect(() => {
    setInner(value);
  }, [value]);

  useEffect(() => {
    if (debounced !== value) setValue(debounced);
  }, [debounced]);

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <div className="cursor-pointer" onClick={() => setValue(value ? min : max)}>
        {value ? onIcon : offIcon}
      </div>
      <RangeSlider
        min={min}
        max={max}
        className="w-full"
        value={inner}
        onChange={({ target }) => setInner(parseInt(target.value))}
      />
    </div>
  );
}
