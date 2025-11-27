import { ChangeEvent } from "react";

//contrato do argumentos do componente
interface Props {
  id?: string;
  label?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputComponent({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold w-full text-start">
        
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}

export default InputComponent;
