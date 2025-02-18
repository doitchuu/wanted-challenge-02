import clsx from "clsx";

interface InputProps {
  id: string;
  type: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
}

function Input({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  errorMessage,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-slate-900 after:content-['*'] after:ml-1 after:text-red-500"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "w-full h-12 px-4 py-2 rounded-md border text-sm focus:outline-none",
          {
            "border-red-500 focus:ring-red-500 focus:border-red-500":
              errorMessage,
            "border-slate-300 focus:ring-blue-500 focus:border-blue-500":
              !errorMessage,
          }
        )}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;
