import { RangeSlider } from "flowbite-react";
import { ReactElement, useState } from "react";

type Props = {
  offIcon: ReactElement;
  onIcon: ReactElement;
};

export function Slider({ offIcon, onIcon }: Props) {
  const [value, setValue] = useState(50);

  return (
    <div className="flex w-full flex-row items-center gap-4">
      <div className="cursor-pointer" onClick={() => setValue(value ? 0 : 100)}>
        {value ? onIcon : offIcon}
      </div>
      <RangeSlider className="w-full" value={value} onChange={({ target }) => setValue(parseInt(target.value))} />{" "}
    </div>
  );
}
