import React, { ReactNode } from "react";
import { ZestProps } from "../types";
interface ZestTextboxConfigContextType {
    defaultZestProps: ZestProps;
}
interface ZestTextboxConfigProviderProps {
    children: ReactNode;
    value?: ZestProps;
}
export declare const ZestTextboxConfigProvider: React.FC<ZestTextboxConfigProviderProps>;
export declare const useZestTextboxConfig: () => ZestTextboxConfigContextType;
export {};
