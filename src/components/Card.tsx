import { PropsWithChildren } from "react";
import { Card as View } from "flowbite-react";

interface Props extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const Card = ({ title, className, children }: Props) => (
  <View>
    <div className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  </View>
);
