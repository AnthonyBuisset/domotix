import { RiHome3Fill, RiMenuFill } from "react-icons/ri";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";
import { useNow } from "../../hooks/useNow";
import { SmartHomeRoutePaths } from "../../App";
import { Sidebar as Base } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import classNames from "classnames";
import { FaTree, FaVideo } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

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
          <Clock />
          <Base.Items>
            <Base.ItemGroup>
              <Item name="Interieur" icon={RiHome3Fill} to={SmartHomeRoutePaths.Indoor} />
              <Item name="Exterieur" icon={FaTree} to={SmartHomeRoutePaths.Outdoor} />
              <Item name="Cameras" icon={FaVideo} to={SmartHomeRoutePaths.Cameras} />
              <Item name="Famille" icon={BsPeopleFill} to={SmartHomeRoutePaths.People} />
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

const Clock = () => {
  const { weekday, date, hours, minutes, seconds } = useNow();
  const forecast = useWeatherForecast();

  return (
    <div className="mb-12 mt-2 flex flex-col items-center gap-1">
      {forecast ? <img src={forecast?.current.weather[0].icon} className="w-20" /> : <div className="h-20" />}
      <div>
        {weekday} {date}
      </div>
      <div className="flex items-end gap-1">
        <div className="text-4xl font-semibold">{hours}</div>
        <div className="text-2xl">{minutes}</div>
        <div className="text-2xl text-secondary">{seconds}</div>
      </div>
    </div>
  );
};

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
