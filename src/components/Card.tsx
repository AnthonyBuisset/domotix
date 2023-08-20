import { PropsWithChildren } from "react";
import { Card as View } from "flowbite-react";

interface Props extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const Card = ({ title, className, children }: Props) => (
  <View className={className}>
    {title && <h1 className="mb-2 self-start text-xl font-medium text-black dark:text-gray-200">{title}</h1>}
    <div className="h-full">{children}</div>
  </View>
);
