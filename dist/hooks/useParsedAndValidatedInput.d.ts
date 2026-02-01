import { InputParser, InputValidator, HtmlInputType } from "../types";
interface UseParsedAndValidatedInputArgs<T> {
    rawValue: string;
    inputType?: HtmlInputType;
    parser: InputParser<T> | undefined;
    validator: InputValidator<T> | undefined;
    onParsedAndValidatedChange: ((value: T | undefined) => void) | undefined;
}
export declare const useParsedAndValidatedInput: <T>({ rawValue, inputType, parser, validator, onParsedAndValidatedChange, }: UseParsedAndValidatedInputArgs<T>) => {
    parsedValue: T | undefined;
    isValid: boolean;
    validationMessage: string | undefined;
};
export {};
