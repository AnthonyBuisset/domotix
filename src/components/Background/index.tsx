import { PropsWithChildren } from "react";

export const Background = ({ children }: PropsWithChildren) => (
  <div className="h-full min-h-screen w-full bg-gradient-to-br from-slate-800 to-slate-900">{children}</div>
);
