import { ReactNode } from "react";
import { HelperTextConfig, ZestTextboxProps } from "../types";
export declare const useHelperText: <T>(value: string, parsedValue: T | undefined, props: ZestTextboxProps<T>, helperTextConfig: HelperTextConfig | undefined) => ReactNode;
