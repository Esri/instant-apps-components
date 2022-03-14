declare type StringValue = string | StringBundle;
interface StringBundle {
  [key: string]: StringValue;
}
export declare function getLocaleComponentStrings<T extends StringBundle = StringBundle>(element: HTMLElement): Promise<[T, string]>;
export {};
