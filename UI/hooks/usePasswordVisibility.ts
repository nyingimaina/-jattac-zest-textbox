import { useState } from "react";

export const usePasswordVisibility = (isPasswordType: boolean) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    if (isPasswordType) {
      setIsPasswordVisible((prev) => !prev);
    }
  };

  return { isPasswordVisible, togglePasswordVisibility };
};
