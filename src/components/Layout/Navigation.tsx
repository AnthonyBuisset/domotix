import { Link } from "react-router-dom";
import { RiHome4Fill, RiHotelBedFill, RiPlugFill } from "react-icons/ri";
import { RoutePaths } from "../../App";
import { PropsWithChildren } from "react";
import classNames from "classnames";

export const Navigation = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
      <div className="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
        <Item to={RoutePaths.Home}>
          <RiHome4Fill className="mb-2 h-6 w-6" />
          Accueil
        </Item>
        <Item to={RoutePaths.Bedroom}>
          <RiHotelBedFill className="mb-2 h-6 w-6" />
          Chambre
        </Item>
        <Item to={RoutePaths.Ups}>
          <RiPlugFill className="mb-2 h-6 w-6" />
          UPS
        </Item>
      </div>
    </div>
  );
};

type ItemProps = {
  to: RoutePaths;
} & PropsWithChildren;

const Item = ({ to, children }: ItemProps) => (
  <button
    type="button"
    className={classNames("hover:bg-gray-50 hover:text-accent-primary", "dark:hover:bg-gray-800  ")}
  >
    <Link to={to} className="inline-flex flex-col items-center justify-center px-5 text-sm">
      {children}
    </Link>
  </button>
);
