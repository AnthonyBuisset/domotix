import { PropsWithChildren, ReactElement } from "react";
import { Card as View } from "flowbite-react";

interface Props extends PropsWithChildren {
  title?: string;
  icon?: ReactElement;
  className?: string;
}

export const Card = ({ title, icon, className, children }: Props) => (
  <View className={className}>
    {(title || icon) && (
      <div className="flex items-center gap-2 text-xl text-black dark:text-gray-200">
        {icon}
        <h1>{title}</h1>
      </div>
    )}
    <div className="h-full">{children}</div>
  </View>
);
