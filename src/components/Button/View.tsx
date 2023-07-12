import classNames from "classnames";

type Props = {
  label: string;
  onClick: () => void;
};

export const View = ({ label, onClick }: Props) => {
  return (
    <button
      className={classNames(
        "flex w-full cursor-pointer justify-center rounded-lg bg-slate-600 p-4",
        "hover:bg-slate-500",
        "active:bg-slate-400"
      )}
      type="button"
      onClick={onClick}
    >
      <div>{label}</div>
    </button>
  );
};
