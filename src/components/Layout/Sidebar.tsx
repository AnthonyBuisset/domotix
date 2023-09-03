import { RiMenuFill } from "react-icons/ri";
import { Sidebar as View } from "flowbite-react";
import { NavLink, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import classNames from "classnames";

type Props = {
  header?: ReactElement;
  items: Omit<ItemProps, "onSelect">[];
};

export const Sidebar = ({ header, items }: Props) => {
  const location = useLocation();
  const { sm } = useScreen();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(false), [location.pathname]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <>
      {visible || sm ? (
        <View className={classNames({ fixed: !sm }, "z-50 w-full shrink-0 sm:w-72")}>
          <Button onClick={() => setVisible(!visible)} />
          {header}
          <View.Items>
            <View.ItemGroup>
              {items.map(i => (
                <Item key={i.name} onSelect={() => setSelectedItem(i)} {...i} />
              ))}
            </View.ItemGroup>
          </View.Items>
        </View>
      ) : (
        <div className="flex items-center gap-2 p-2 text-2xl font-medium">
          <Button className="w-fit" onClick={() => setVisible(!visible)} />
          {selectedItem.icon}
          <h1>{selectedItem.name}</h1>
        </div>
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
  icon: ReactElement;
  to: string;
  onSelect: () => void;
};

const Item = ({ name, icon, onSelect, to }: ItemProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname });

  useEffect(() => {
    if (match) onSelect();
  }, [match]);

  return (
    <NavLink to={to}>
      <View.Item as="div" icon={() => icon} active={match}>
        <p>{name}</p>
      </View.Item>
    </NavLink>
  );
};
