export const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

export type PropsWithClassName = { className?: string };
