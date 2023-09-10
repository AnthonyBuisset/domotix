import { PropsWithChildren } from "react";
import { Tooltip } from "flowbite-react";
import {
  RiBatteryFill,
  RiBatteryLine,
  RiBatteryLowLine,
  RiSignalWifi1Fill,
  RiSignalWifi2Fill,
  RiSignalWifi3Fill,
  RiSignalWifiErrorLine,
  RiSignalWifiFill,
} from "react-icons/ri";
import classNames from "classnames";
interface Props extends PropsWithChildren {
  className?: string;
  linkquality?: string | number;
  battery?: string | number;
  onClick?: () => void;
}

export const Card = ({ className, linkquality, battery, onClick, children }: Props) => (
  <div
    className={classNames(
      "relative rounded-lg border border-gray-300 bg-gray-200 p-4 shadow dark:border-gray-700 dark:bg-white/[0.02]",
      className,
      {
        "cursor-pointer hover:bg-white/5": onClick,
      }
    )}
    onClick={onClick}
  >
    <div className="absolute right-1 top-1 flex items-center gap-1 text-lg">
      {linkquality !== undefined && (
        <Tooltip content={`${linkquality}%`}>
          <LinkQuality value={toNumber(linkquality)} />
        </Tooltip>
      )}
      {battery !== undefined && (
        <Tooltip content={`${battery}%`}>
          <Battery value={toNumber(battery)} />
        </Tooltip>
      )}
    </div>
    {children}
  </div>
);

type InnerProps = {
  value: number;
};

const toNumber = (value: number | string): number => (typeof value === "string" ? parseFloat(value) : value);

const LinkQuality = ({ value }: InnerProps) =>
  value > 60 ? (
    <RiSignalWifiFill />
  ) : value > 40 ? (
    <RiSignalWifi3Fill />
  ) : value > 20 ? (
    <RiSignalWifi2Fill />
  ) : value > 10 ? (
    <RiSignalWifi1Fill className="text-yellow-500" />
  ) : (
    <RiSignalWifiErrorLine className="text-red-600" />
  );

const Battery = ({ value }: InnerProps) =>
  value > 50 ? (
    <RiBatteryFill />
  ) : value > 20 ? (
    <RiBatteryLowLine className="text-yellow-500" />
  ) : (
    <RiBatteryLine className="text-red-600" />
  );
