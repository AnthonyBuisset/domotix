import { NavLink } from "react-router-dom";
import { RiEqualizerFill, RiPlugFill, RiSunFill } from "react-icons/ri";
import { RoutePaths } from "../../App";
import { PropsWithChildren } from "react";
import classNames from "classnames";

export const Navigation = () => {
  return (
    <div className="z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <Item to={RoutePaths.Weather}>
          <RiSunFill className="mb-2 h-6 w-6" />
          <p>Météo</p>
        </Item>
        <Item to={RoutePaths.Controls}>
          <RiEqualizerFill className="mb-2 h-6 w-6" />
          <p>Contrôles</p>
        </Item>
        <Item to={RoutePaths.Power}>
          <RiPlugFill className="mb-2 h-6 w-6" />
          <p>Alimentation</p>
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
              "bg-gray-50 dark:bg-gray-800": isActive,
            }
          )}
        >
          {children}
        </button>
      )}
    </NavLink>
  );
};
