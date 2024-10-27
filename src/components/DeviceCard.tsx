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
import { Card, CardBody, CardProps, Tooltip } from "@nextui-org/react";

type Props = CardProps & {
  linkQuality?: string | number;
  battery?: string | number;
};

export const DeviceCard = ({ linkQuality, battery, className, children, ...rest }: Props) => (
  <Card className={classNames("relative", "p-4", className)} {...rest}>
    <div className="absolute right-1 top-1 flex items-center gap-1 text-lg">
      {linkQuality !== undefined && (
        <Tooltip content={`${linkQuality}%`}>
          <div>
            <LinkQuality value={toNumber(linkQuality)} />
          </div>
        </Tooltip>
      )}
      {battery !== undefined && (
        <Tooltip content={`${battery}%`}>
          <div>
            <Battery value={toNumber(battery)} />
          </div>
        </Tooltip>
      )}
    </div>
    <CardBody>{children}</CardBody>
  </Card>
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
