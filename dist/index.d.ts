import React from 'react';

type ZestTextboxSize = "sm" | "md" | "lg";
type SharedProps = {
    zSize?: ZestTextboxSize;
    stretch?: boolean;
    className?: string;
    maxLength?: number;
    showProgressBar?: boolean;
    animatedCounter?: boolean;
    theme?: "light" | "dark" | "system";
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "color" | "date" | "datetime-local" | "month" | "time" | "week";
};
type InputOnlyProps = SharedProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
    isMultiline?: false;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
type TextareaOnlyProps = SharedProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    isMultiline: true;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};
type ZestTextboxProps = InputOnlyProps | TextareaOnlyProps;
declare const ZestTextbox: React.FC<ZestTextboxProps>;

export { ZestTextbox as default };
