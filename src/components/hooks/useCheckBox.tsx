import { useState } from "react";

export default function useCheckBox(initial: boolean = false) {
  const [checked, setChecked] = useState(initial);

  const toggleCheck = () => setChecked((prev) => !prev);
  const resetCheck = () => setChecked(false);
  const setCheck = (value: boolean) => setChecked(value);

  return {
    checked,
    toggleCheck,
    resetCheck,
    setCheck,
    bind: {
      checked,
      onChange: () => toggleCheck(),
    },
  };
}
