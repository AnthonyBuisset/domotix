import { NavLink } from "react-router-dom";
import { RiSunFill } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { RoutePaths } from "../../App";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { BsGraphUp } from "react-icons/bs";
import config from "../../config";
import { GiCctvCamera } from "react-icons/gi";

export const Navigation = () => {
  return (
    <div className="z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div
        className={classNames("mx-auto grid h-full max-w-lg font-medium", {
          "grid-cols-4": config.PROFILE === "Antho",
          "grid-cols-3": config.PROFILE === "Papa"
        })}
      >
        <Item to={RoutePaths.Weather}>
          <RiSunFill className="mb-2 h-6 w-6" />
          <p>Météo</p>
        </Item>
        {config.PROFILE === "Antho" && (
          <Item to={RoutePaths.SmartHome}>
            <SiHomeassistant className="mb-2 h-6 w-6" />
            <p>Maison</p>
          </Item>
        )}
        <Item to={RoutePaths.Cameras}>
          <GiCctvCamera className="mb-2 h-6 w-6" />
          <p>Cameras</p>
        </Item>
        <Item to={RoutePaths.Monitoring}>
          <BsGraphUp className="mb-2 h-6 w-6" />
          <p>Monitoring</p>
        </Item>
      </div>
    </div>
  );
};

type ItemProps = {
  to: RoutePaths;
} & PropsWithChildren;

const Item = ({ to, children }: ItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <button
          type="button"
          className={classNames(
            "inline-flex h-full w-full flex-col items-center justify-center px-5 text-sm hover:bg-gray-50 hover:text-accent-primary dark:hover:bg-gray-800",
            {
              "bg-gray-50 dark:bg-gray-800": isActive
            }
          )}
        >
          {children}
        </button>
      )}
    </NavLink>
  );
};
