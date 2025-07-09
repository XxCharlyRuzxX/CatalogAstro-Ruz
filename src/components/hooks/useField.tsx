import { useState } from "react";

interface UseFieldOptions {
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function useField(initialValue = "", options: UseFieldOptions = {}) {
  const [value, setValue] = useState(initialValue);

  const { type = "text", placeholder = "", className = "", required = false } = options;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const finalClassName = `${className} text-[12px] md:text-[16px]`;

  const reset = () => setValue(initialValue);

  return {
    type,
    value,
    placeholder,
    className: finalClassName,
    required,
    onChange,
    reset,
    bind: {
      value,
      className: finalClassName,
      onChange,
      placeholder,
      required,
    },
  };
}
