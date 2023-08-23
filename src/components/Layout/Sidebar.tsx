import { RiMenuFill } from "react-icons/ri";
import { Sidebar as View } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import classNames from "classnames";

type Props = {
  header?: ReactElement;
} & PropsWithChildren;

export const Sidebar = ({ header, children }: Props) => {
  const location = useLocation();
  const { sm } = useScreen();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(false), [location.pathname]);

  return (
    <>
      {visible || sm ? (
        <View className={classNames({ fixed: !sm }, "w-full shrink-0 sm:w-60")}>
          <Button onClick={() => setVisible(!visible)} />
          {header}
          <View.Items>
            <View.ItemGroup>{children}</View.ItemGroup>
          </View.Items>
        </View>
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

export const Item = ({ name, icon, to }: ItemProps) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <View.Item as="div" icon={icon} active={isActive}>
        <p>{name}</p>
      </View.Item>
    )}
  </NavLink>
);
