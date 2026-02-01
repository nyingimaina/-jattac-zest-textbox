import React from "react";
interface CharacterCounterProps {
    showCounter: boolean;
    currentLength: number;
    maxLength: number | undefined;
    counterColorClass: string;
}
export declare const CharacterCounter: React.FC<CharacterCounterProps>;
export {};
