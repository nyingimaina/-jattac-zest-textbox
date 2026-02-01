import React, { createContext, useContext, ReactNode } from "react";
import { ZestProps } from "../types";

// Define the shape of the context value
interface ZestTextboxConfigContextType {
  defaultZestProps: ZestProps;
}

// Create the context with a default empty object
const ZestTextboxConfigContext = createContext<
  ZestTextboxConfigContextType | undefined
>(undefined);

// Create a provider component
interface ZestTextboxConfigProviderProps {
  children: ReactNode;
  value?: ZestProps; // The default ZestProps to provide
}

export const ZestTextboxConfigProvider: React.FC<
  ZestTextboxConfigProviderProps
> = ({ children, value = {} }) => {
  return (
    <ZestTextboxConfigContext.Provider value={{ defaultZestProps: value }}>
      {children}
    </ZestTextboxConfigContext.Provider>
  );
};

// Custom hook to use the ZestTextboxConfigContext
export const useZestTextboxConfig = () => {
  const context = useContext(ZestTextboxConfigContext);
  if (context === undefined) {
    // This error will be caught by the useZestTextboxConfig hook in ZestTextbox.tsx
    // if the component is used outside of a provider.
    return { defaultZestProps: {} };
  }
  return context;
};
