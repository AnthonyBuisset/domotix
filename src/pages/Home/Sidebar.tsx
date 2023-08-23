import { RiHome3Fill } from "react-icons/ri";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";
import { useNow } from "../../hooks/useNow";
import { SmartHomeRoutePaths } from "../../App";
import { Sidebar as Base, Item } from "../../components/Layout/Sidebar";
import { FaTree, FaVideo } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

export const Sidebar = () => (
  <Base header={<Clock />}>
    <Item name="Interieur" icon={RiHome3Fill} to={SmartHomeRoutePaths.Indoor} />
    <Item name="Exterieur" icon={FaTree} to={SmartHomeRoutePaths.Outdoor} />
    <Item name="Cameras" icon={FaVideo} to={SmartHomeRoutePaths.Cameras} />
    <Item name="Famille" icon={BsPeopleFill} to={SmartHomeRoutePaths.People} />
  </Base>
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
