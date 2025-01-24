import { ReactNode } from 'react';

export interface SelectProps {
  children: ReactNode;
  placeholder?: string | ReactNode;
  fullWidth?: boolean;
  withShadow?: boolean;
  // onChange теперь принимает два аргумента: то, что видит пользователь (ReactNode), и "сырое" значение (string).
  onChange?: (displayValue: ReactNode, rawValue: string) => void;
  className?: string;
  themeReverse?: boolean;
  isDropdownFullWidth?: boolean;
  defaultValue?: string;
  withSearch?: {
    onSearch: (value: string) => void;
  };
}

export interface OptionProps {
  value: string; // "сырое" значение
  onSelect?: (displayValue: ReactNode, rawValue: string) => void;
  children: ReactNode; // то, что показываем пользователю
}

export interface SelectContextProps {
  selectedValue: ReactNode;
  selectOption: (displayValue: ReactNode, rawValue: string) => void;
}

export type SelectType = React.FC<SelectProps> & {
  Option: React.FC<OptionProps>;
};
