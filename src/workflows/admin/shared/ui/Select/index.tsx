import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import type { OptionProps, SelectContextProps, SelectType } from './types';

import cls from './Select.module.scss';
import clsx from 'clsx';
import { Mods } from '@/app/types';

import DropdownHiderIcon from '@images/dropdown-hider.svg';
import SelectTogglerIcon from '@images/select-toggler-icon.svg';
import { useShowElementWithTransition } from '../../lib';
import { Input } from '../Input';

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const Select: SelectType = (props) => {
  const {
    children,
    placeholder = 'Drop Down',
    fullWidth = false,
    onChange,
    className,
    withShadow,
    themeReverse,
    isDropdownFullWidth,
    withSearch,
    defaultValue = '',
  } = props;

  const [selectedValue, setSelectedValue] = useState<string | ReactNode>(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const { isVisible, showElement, onShowElement, onCloseElement } = useShowElementWithTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    if (isVisible) onCloseElement();
    else onShowElement();
  };

  const handleOptionClick = (value: string | ReactNode) => {
    setSelectedValue(value);
    onCloseElement();
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onCloseElement();
      }
    },
    [onCloseElement],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);
    withSearch?.onSearch(value);
  };

  useEffect(() => {
    if (onChange) onChange(selectedValue);
  }, [selectedValue, onChange]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.withShadow]: Boolean(withShadow),
    [cls.themeReverse]: Boolean(themeReverse),
  };

  return (
    <SelectContext.Provider value={{ selectedValue, handleOptionClick }}>
      <div className={clsx(cls.select, mods, className)} ref={dropdownRef}>
        {withSearch ? (
          <div
            className={clsx(cls.select_withSearch_filedWrapper, {
              [cls.select_field_active]: isVisible,
            })}>
            {!isFocused && <div className={cls.select_value}>{selectedValue}</div>}
            <Input
              onChange={handleSearchChange}
              placeholder={!selectedValue ? String(placeholder) : ''}
              value={isFocused ? searchValue : ''}
              onClick={toggleSelect}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <SelectTogglerIcon />
          </div>
        ) : (
          <div
            className={clsx(cls.select_field, 'select_field', {
              [cls.select_field_active]: isVisible,
            })}
            onClick={toggleSelect}>
            {selectedValue || placeholder}
            <SelectTogglerIcon />
          </div>
        )}

        {isVisible && (
          <div
            className={clsx(cls.select_dropdown, {
              [cls.dropdown_fullWidth]: isDropdownFullWidth,
              [cls.dropdown_showed]: showElement,
            })}>
            {children}
            {withSearch && <DropdownHiderIcon className={cls.select_dropdown_hider} />}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

const Option: React.FC<OptionProps> = ({ value, onSelect, children }) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('Option must be used within a Select component');
  }

  const { handleOptionClick } = context;

  const handleClick = () => {
    handleOptionClick(children);
    if (onSelect) onSelect(value);
  };

  return (
    <div onClick={handleClick} className={cls.select_option}>
      {children}
    </div>
  );
};

Select.Option = Option;

export default Select;
