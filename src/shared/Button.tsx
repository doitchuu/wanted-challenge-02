import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ type, disabled, children }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "w-full h-12 mt-4 text-white rounded-md text-sm font-medium",
        {
          "bg-blue-500": !disabled,
          "bg-slate-400": disabled,
        }
      )}
    >
      {children}
    </button>
  );
}

export default Button;
