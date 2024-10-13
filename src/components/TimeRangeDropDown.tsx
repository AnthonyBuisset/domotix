import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { DropdownOptions } from "../utils/influxdb/range.ts";
import { Key } from "react";

type Props = {
  value?: Key;
  onChange: (value: Key) => void;
};

export const TimeRangeDropDown = ({ value, onChange }: Props) => {
  const items = Object.entries(DropdownOptions).map(([value, label]) => ({ value, label }));
  const selected = items.find(item => item.value === value)?.label;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>{selected}</Button>
      </DropdownTrigger>
      <DropdownMenu items={items} onAction={onChange}>
        {item => <DropdownItem key={item.value}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};
