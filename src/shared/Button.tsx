import clsx from "clsx";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function Button({ type, disabled, onClick, children, className }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "h-12 mt-4 text-white rounded-md text-sm font-medium",
        {
          "bg-blue-500": !disabled,
          "bg-slate-400": disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
