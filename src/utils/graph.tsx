import { PropsWithChildren } from "react";

export const Colors = [
  "#0ea5e9", // sky-500
  "#a855f7", // purple-500
  "#10b981", // emerald-500
  "#ef4444", // red-500
  "#fde047", // yellow-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
  "#64748b", // slate-500
];

export const Tooltip = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-2 rounded-lg bg-white/5 p-4 backdrop-blur-xl">{children}</div>
);
