import { PropsWithChildren } from "react";

export const Background = ({ children }: PropsWithChildren) => (
  <div className="mx-auto grid h-full min-h-screen w-full grid-cols-1 gap-4 bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {children}
  </div>
);
