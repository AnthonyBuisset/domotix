import { RiMenuFill, RiPlugFill } from "react-icons/ri";
import { MonitoringRoutePaths } from "../../App";
import { Sidebar as Base } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import classNames from "classnames";
import { FaRaspberryPi } from "react-icons/fa";

export const Sidebar = () => {
  const location = useLocation();
  const { sm } = useScreen();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(false), [location.pathname]);

  return (
    <>
      {visible || sm ? (
        <Base className={classNames({ fixed: !sm }, "w-full shrink-0 sm:w-60")}>
          <Button onClick={() => setVisible(!visible)} />
          <Base.Items>
            <Base.ItemGroup>
              <Item name="Raspberry Pi" icon={FaRaspberryPi} to={MonitoringRoutePaths.RaspberryPi} />
              <Item name="Ups" icon={RiPlugFill} to={MonitoringRoutePaths.Ups} />
            </Base.ItemGroup>
          </Base.Items>
        </Base>
      ) : (
        <Button className="ml-3 mt-4 w-fit self-start" onClick={() => setVisible(!visible)} />
      )}
    </>
  );
};

type ButtonProps = {
  onClick: () => void;
  className?: string;
};

const Button = ({ onClick, className }: ButtonProps) => (
  <button
    type="button"
    className={classNames(
      className,
      "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
    )}
    onClick={onClick}
  >
    <span className="sr-only">Open sidebar</span>
    <RiMenuFill className="h-6 w-6" />
  </button>
);

type ItemProps = {
  name: string;
  icon: IconType;
  to: string;
};

const Item = ({ name, icon, to }: ItemProps) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Base.Item as="div" icon={icon} active={isActive}>
        <p>{name}</p>
      </Base.Item>
    )}
  </NavLink>
);
