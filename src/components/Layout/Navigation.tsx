import { RiHotelBedFill, RiPlugFill, RiSunFill } from "react-icons/ri";
import { SiHomeassistant } from "react-icons/si";
import { MonitoringRoutePaths, RoutePaths, SmartHomeRoutePaths } from "../../App.tsx";
import { BsGraphUp } from "react-icons/bs";
import config from "../../config.ts";
import { GiCctvCamera, GiMeal, GiSofa } from "react-icons/gi";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";
import { PiOfficeChairFill } from "react-icons/pi";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaNetworkWired, FaRaspberryPi } from "react-icons/fa";
import classNames from "classnames";

export type Item = {
  to: string;
  icon: ReactElement;
  name: string;
};

export type MenuItem = {
  icon: ReactElement;
  name: string;
  items: Item[];
};

export const Navigation = () => {
  const items: (Item | MenuItem)[] =
    config.PROFILE === "Antho"
      ? [
          {
            to: RoutePaths.Weather,
            icon: <RiSunFill className="h-6 w-6" />,
            name: "Météo",
          },
          {
            icon: <SiHomeassistant className="h-6 w-6" />,
            name: "Maison",
            items: [
              { name: "Chambre parentale", icon: <RiHotelBedFill />, to: SmartHomeRoutePaths.ParentalBedroom },
              { name: "Chambre de Christophe", icon: <TbMoodBoy />, to: SmartHomeRoutePaths.ChristopheBedroom },
              { name: "Chambre de Marie", icon: <CgGirl />, to: SmartHomeRoutePaths.MarieBedroom },
              { name: "Salon", icon: <GiSofa />, to: SmartHomeRoutePaths.LivingRoom },
              { name: "Salle a manger", icon: <GiMeal />, to: SmartHomeRoutePaths.DiningRoom },
              { name: "Bureau", icon: <PiOfficeChairFill />, to: SmartHomeRoutePaths.Office },
            ],
          },
          {
            to: RoutePaths.Cameras,
            icon: <GiCctvCamera className="h-6 w-6" />,
            name: "Cameras",
          },
          {
            icon: <BsGraphUp className="h-6 w-6" />,
            name: "Monitoring",
            items: [
              { name: "Network", icon: <FaNetworkWired />, to: MonitoringRoutePaths.Network },
              { name: "Raspberry Pi", icon: <FaRaspberryPi />, to: MonitoringRoutePaths.RaspberryPi },
              { name: "Ups", icon: <RiPlugFill />, to: MonitoringRoutePaths.Ups },
            ],
          },
        ]
      : [
          {
            to: RoutePaths.Weather,
            icon: <RiSunFill className="h-6 w-6" />,
            name: "Météo",
          },
          {
            to: RoutePaths.Cameras,
            icon: <GiCctvCamera className="h-6 w-6" />,
            name: "Cameras",
          },
          {
            icon: <BsGraphUp className="h-6 w-6" />,
            name: "Monitoring",
            items: [
              { name: "Network", icon: <FaNetworkWired />, to: MonitoringRoutePaths.Network },
              { name: "Ups", icon: <RiPlugFill />, to: MonitoringRoutePaths.Ups },
            ],
          },
        ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      classNames={{
        wrapper: "justify-center",
        content: "gap-8",
        item: ["flex items-center gap-2", "data-[active]:text-primary"],
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="center" className="hidden sm:flex">
        {items.map(i =>
          "items" in i ? (
            <Dropdown key={i.name} className="bg-background text-foreground drop-shadow-2xl">
              <NavbarItem>
                <NavButton {...i} />
              </NavbarItem>
              <DropdownMenu>
                {i.items?.map(sub => (
                  <DropdownItem key={sub.to} startContent={sub.icon} href={sub.to} title={sub.name} />
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={i.name}>
              <NavButton key={i.name} {...i} />
            </NavbarItem>
          )
        )}
      </NavbarContent>

      <NavbarMenu className="bg-background text-foreground drop-shadow-2xl">
        {items.map(i =>
          "items" in i ? (
            <NavbarMenuItem key={i.name}>
              <NavigationMenuItemWithAccordion key={i.name} {...i} />
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={i.name}>
              <NavButton {...i} />
            </NavbarMenuItem>
          )
        )}
      </NavbarMenu>
    </Navbar>
  );
};

const NavButton = ({ to, name, icon, items }: Partial<Item & MenuItem>) => {
  const { pathname } = useLocation();
  const isActive = items?.some(i => i.to === pathname) || pathname === to;

  const button = (
    <Button
      size="lg"
      className={classNames("w-full justify-start px-2", { "text-primary": isActive })}
      variant="light"
      startContent={icon}
      as={items?.length ? Button : Link}
      href={to}
    >
      {name}
    </Button>
  );

  return items?.length ? <DropdownTrigger>{button}</DropdownTrigger> : button;
};

const NavigationMenuItemWithAccordion = ({ icon, name, items }: MenuItem) => (
  <Accordion isCompact>
    <AccordionItem startContent={icon} title={name}>
      {items.map(i => (
        <NavButton key={i.to} {...i} />
      ))}
    </AccordionItem>
  </Accordion>
);
