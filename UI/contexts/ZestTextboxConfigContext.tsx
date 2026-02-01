import React, { createContext, useContext, ReactNode } from "react";
import { ZestProps } from "../types";

// Define the shape of the context value
interface ZestTextboxConfigContextType<T = string> { // Made generic
  defaultZestProps: ZestProps<T>; // Uses generic T
}

// Create the context with a default empty object
const ZestTextboxConfigContext = createContext<
  ZestTextboxConfigContextType<any> | undefined // Use any for context default to avoid circular dependency issues
>(undefined);

// Create a provider component
interface ZestTextboxConfigProviderProps<T = string> { // Made generic
  children: ReactNode;
  value?: ZestProps<T>; // Uses generic T
}

export const ZestTextboxConfigProvider: React.FC<
  ZestTextboxConfigProviderProps<any> // Use any for provider to allow flexibility
> = ({ children, value = {} }) => {
  return (
    <ZestTextboxConfigContext.Provider value={{ defaultZestProps: value as ZestProps<any> }}>
      {children}
    </ZestTextboxConfigContext.Provider>
  );
};

// Custom hook to use the ZestTextboxConfigContext
export const useZestTextboxConfig = <T = string>() => { // Made generic
  const context = useContext(ZestTextboxConfigContext);
  if (context === undefined) {
    // This error will be caught by the useZestTextboxConfig hook in ZestTextbox.tsx
    // if the component is used outside of a provider.
    return { defaultZestProps: {} as ZestProps<T> }; // Cast to generic T
  }
  return context as ZestTextboxConfigContextType<T>; // Cast to generic T
};