import React, { ReactNode } from "react";
interface HelperTextDisplayProps {
    helperTextNode: ReactNode;
    className?: string;
    positioning?: "reserved" | "absolute";
}
export declare const HelperTextDisplay: React.FC<HelperTextDisplayProps>;
export {};
