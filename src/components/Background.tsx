import classNames from "classnames";
import { PropsWithChildren } from "react";

export const Background = ({ children }: PropsWithChildren) => (
  <div
    className={classNames(
      "h-full min-h-screen w-full  border-gray-200 bg-gradient-to-br from-slate-100 to-slate-200 text-gray-500",
      "dark:border-gray-600 dark:from-slate-800 dark:to-slate-900 dark:text-gray-400"
    )}
  >
    {children}
  </div>
);
