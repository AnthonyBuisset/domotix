import { RiHotelBedFill, RiMenuFill } from "react-icons/ri";
import { useWeatherForecast } from "../../hooks/useWeatherForecast";
import { useNow } from "../../hooks/useNow";
import { Link } from "react-router-dom";
import { ControlsRoutePaths } from "../../App";

export const Sidebar = () => (
  <>
    <Button />
    <aside
      id="controls-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <Clock />
        <ul className="space-y-2 font-medium">
          <li>
            <Link to={ControlsRoutePaths.Bedrooms}>
              <div className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <RiHotelBedFill />
                <span className="ml-3">Chambres</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  </>
);

const Button = () => (
  <button
    data-drawer-target="controls-sidebar"
    data-drawer-toggle="controls-sidebar"
    aria-controls="controls-sidebar"
    type="button"
    className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
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
      {forecast && <img src={forecast?.current.weather[0].icon} className="w-20" />}
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
