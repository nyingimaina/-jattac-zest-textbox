import React, { ReactNode } from "react";
import { ZestProps } from "../types";
interface ZestTextboxConfigProviderProps<T = string> {
    children: ReactNode;
    value?: ZestProps<T>;
}
export declare const ZestTextboxConfigProvider: React.FC<ZestTextboxConfigProviderProps<any>>;
export declare const useZestTextboxConfig: <T = string>() => {
    defaultZestProps: ZestProps<T>;
};
export {};
