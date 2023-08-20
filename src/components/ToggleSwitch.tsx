import { ReactElement } from "react";
import { ToggleSwitch as View } from "flowbite-react";

type Props = {
  icon: ReactElement;
  label?: string;
};

export function ToggleSwitch({ icon, label = "" }: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      {icon}
      <View checked label={label} onChange={console.log} />
    </div>
  );
}
