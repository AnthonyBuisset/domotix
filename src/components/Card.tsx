import { PropsWithChildren, ReactElement } from "react";
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
  title?: string;
  icon?: ReactElement;
  className?: string;
  linkquality?: string | number;
  battery?: string | number;
}

export const Card = ({ title, icon, className, linkquality, battery, children }: Props) => (
  <div
    className={classNames(
      "relative flex flex-col gap-2 rounded-lg border border-gray-300 bg-gray-200 p-4 shadow dark:border-gray-700 dark:bg-white/[0.02]",
      className
    )}
  >
    <div className="absolute right-2 top-2 flex items-center gap-2">
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
    {(title || icon) && (
      <div className="flex items-center gap-2 text-xl text-black dark:text-gray-200">
        {icon}
        <h1>{title}</h1>
      </div>
    )}
    {children}
  </div>
);

type InnerProps = {
  value: number;
};

const toNumber = (value: number | string): number => (typeof value === "string" ? parseFloat(value) : value);

const LinkQuality = ({ value }: InnerProps) =>
  value > 80 ? (
    <div>
      <RiSignalWifiFill />
    </div>
  ) : value > 60 ? (
    <div>
      <RiSignalWifi3Fill />
    </div>
  ) : value > 40 ? (
    <div className="text-yellow-500">
      <RiSignalWifi2Fill />
    </div>
  ) : value > 10 ? (
    <div className="text-yellow-500">
      <RiSignalWifi1Fill />
    </div>
  ) : (
    <div className="text-red-600">
      <RiSignalWifiErrorLine />
    </div>
  );

const Battery = ({ value }: InnerProps) =>
  value > 50 ? (
    <div>
      <RiBatteryFill />
    </div>
  ) : value > 20 ? (
    <div className="text-yellow-500">
      <RiBatteryLowLine />
    </div>
  ) : (
    <div className="text-red-600">
      <RiBatteryLine />
    </div>
  );
