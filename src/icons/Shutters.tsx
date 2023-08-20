type Props = {
  className?: string;
  size?: number;
};

export const Open = ({ className, size = 24 }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 4h18v4h-2v12h-2V8H7v12H5V8H3V4m5 5h8v2H8V9Z" />
  </svg>
);

export const Closed = ({ className, size = 24 }: Props) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3 4h18v4h-2v12h-2V8H7v12H5V8H3V4m5 5h8v2H8V9m0 3h8v2H8v-2m0 3h8v2H8v-2m0 3h8v2H8v-2Z"
    />
  </svg>
);
