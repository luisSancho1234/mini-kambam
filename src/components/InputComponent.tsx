function InputComponent({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
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
