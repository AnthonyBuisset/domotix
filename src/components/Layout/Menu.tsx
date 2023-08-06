import { Link, useLocation } from "react-router-dom";
import { RiHome4Line, RiPlugLine } from "react-icons/ri";
import { RoutePaths } from "../../App";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { useNow } from "../../hooks/useNow";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";

export const Menu = () => {
  const { weekday, date, hours, minutes, seconds } = useNow();
  const forecast = useWeatherForecast();

  return (
    <div className="sticky top-0 flex h-screen w-1/6 flex-col gap-8 bg-white/5 backdrop-blur-xl">
      <div className="my-2 flex flex-col items-center gap-1">
        {forecast && <img src={forecast?.current.weather[0].icon} className="w-20" />}
        <div>
          {weekday} {date}
        </div>
        <div className="flex items-end gap-1">
          <div className="text-4xl font-semibold">{hours}</div>
          <div className="text-2xl">{minutes}</div>
          <div className="text-xl text-slate-500">{seconds}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <Item to={RoutePaths.Home}>
          <RiHome4Line />
          Accueil
        </Item>
        <Item to={RoutePaths.Ups}>
          <RiPlugLine />
          UPS
        </Item>
      </div>
    </div>
  );
};

type ItemProps = {
  to: RoutePaths;
} & PropsWithChildren;

const Item = ({ to, children }: ItemProps) => {
  const location = useLocation();

  return (
    <Link to={to}>
      <div
        className={classNames("flex flex-row items-center gap-2 p-4 text-lg font-medium hover:bg-white/10", {
          "bg-white/10": location.pathname === to,
        })}
      >
        {children}
      </div>
    </Link>
  );
};
