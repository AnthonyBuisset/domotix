import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const Card = ({ title, children }: Props) => (
  <div className="flex h-fit w-fit flex-col gap-8 rounded-lg bg-white/5 p-4 shadow backdrop-blur-lg">
    <div className="text-lg font-medium text-slate-200">{title}</div>
    {children}
  </div>
);
