import { RiHotelBedFill } from "react-icons/ri";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";
import { useNow } from "../../hooks/useNow";
import { SmartHomeRoutePaths } from "../../App";
import { Sidebar as Base } from "../../components/Layout/Sidebar";
import { PiOfficeChairFill } from "react-icons/pi";
import { GiMeal, GiSofa } from "react-icons/gi";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";

export const Sidebar = () => (
  <Base
    header={<Clock />}
    items={[
      { name: "Chambre parentale", icon: <RiHotelBedFill />, to: SmartHomeRoutePaths.ParentalBedroom },
      { name: "Chambre de Christophe", icon: <TbMoodBoy />, to: SmartHomeRoutePaths.ChristopheBedroom },
      { name: "Chambre de Marie", icon: <CgGirl />, to: SmartHomeRoutePaths.MarieBedroom },
      { name: "Salon", icon: <GiSofa />, to: SmartHomeRoutePaths.LivingRoom },
      { name: "Salle a manger", icon: <GiMeal />, to: SmartHomeRoutePaths.DiningRoom },
      { name: "Bureau", icon: <PiOfficeChairFill />, to: SmartHomeRoutePaths.Office },
    ]}
  />
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
