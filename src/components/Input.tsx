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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Input;
