import { PropsWithChildren } from "react";

export const Background = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
    {children}
  </div>
);
