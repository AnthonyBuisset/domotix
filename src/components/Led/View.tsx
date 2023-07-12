import classNames from "classnames";
import { Color } from ".";

type Props = {
  label: string;
  value: Color;
};

export const View = ({ label, value }: Props) => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-4">
      <div>{label}</div>
      <div
        className={classNames("h-4 w-4 rounded-full", {
          "bg-red-700 shadow-glow-red": value === Color.Red,
          "bg-blue-600 shadow-glow-blue": value === Color.Blue,
          "bg-green-600 shadow-glow-green": value === Color.Green,
          "bg-yellow-500 shadow-glow-yellow": value === Color.Yellow,
          "bg-neutral-500": value === Color.Grey,
        })}
      />
    </div>
  );
};
