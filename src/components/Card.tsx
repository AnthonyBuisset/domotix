import classNames from "classnames";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const Card = ({ title, className, children }: Props) => (
  <div className={classNames("h-fit w-fit rounded-lg bg-white/5 p-4 shadow backdrop-blur-lg", className)}>
    {title && <div className="text-lg font-medium text-slate-200">{title}</div>}
    {children}
  </div>
);
