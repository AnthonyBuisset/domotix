import { Dropdown as Base } from "flowbite-react";

type Option<T> = {
  value: T;
  label: string;
};

type Props<T> = {
  label: string;
  options: Option<T>[];
  onChange: (option: T) => void;
};

export default function Dropdown<T>({ label, options, onChange }: Props<T>) {
  return (
    <Base color="blue" label={label} size="sm" theme={{ arrowIcon: "h-4 w-4 ml-2 self-center" }}>
      {options.map(({ value, label }) => (
        <Base.Item key={label} onClick={() => onChange(value)}>
          <p className="whitespace-nowrap">{label}</p>
        </Base.Item>
      ))}
    </Base>
  );
}
