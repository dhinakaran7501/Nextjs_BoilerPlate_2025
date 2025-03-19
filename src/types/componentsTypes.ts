export type CustomInputBoxProps = {
  title?: string;
  placeholder?: string;
  hintText?: string;
  errText?: string;
  inputType?:
    | "text"
    | "textArea"
    | "email"
    | "number"
    | "password"
    | "tel"
    | "url";
  value: string;
  onPressChange: (value: string) => void;
  isSecure?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  icon?: React.ReactNode;
};

export type SearchDropdownBoxProps<T extends Record<string, any>> = {
  options: T[];
  fieldName?: keyof T;
  onSelect: (selected: string[]) => void;
  selectedItemList: string[];
  isMulti?: boolean;
};
