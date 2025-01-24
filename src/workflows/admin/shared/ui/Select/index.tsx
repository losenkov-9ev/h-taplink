import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import clsx from 'clsx';

import type { OptionProps, SelectContextProps, SelectType } from './types';
import cls from './Select.module.scss';
import { Mods } from '@/app/types';

import { useShowElementWithTransition } from '../../lib';
import { Input } from '../Input';

import DropdownHiderIcon from '@images/dropdown-hider.svg';
import SelectTogglerIcon from '@images/select-toggler-icon.svg';
import { useClickOutside } from '../../lib/hooks/useClickOutside';

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

  // Храним именно *то, что показывается* в интерфейсе, по умолчанию это либо placeholder, либо defaultValue
  const [selectedValue, setSelectedValue] = useState<ReactNode>(defaultValue);

  // Состояние для поиска
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    isVisible: isDropdownOpen,
    showElement: animateDropdown,
    onShowElement: openDropdown,
    onCloseElement: closeDropdown,
  } = useShowElementWithTransition();

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Клик вне компонента
  useClickOutside(
    dropdownRef,
    useCallback(() => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    }, [isDropdownOpen, closeDropdown]),
  );

  // При выборе опции сохраняем ReactNode для UI и «вызываем» колбэк, передавая *сырое значение* вторым параметром
  const selectOption = useCallback(
    (displayValue: ReactNode, rawValue: string) => {
      setSelectedValue(displayValue);

      // Сообщаем об изменении сразу двух значений
      onChange?.(displayValue, rawValue);

      closeDropdown();
    },
    [onChange, closeDropdown],
  );

  // Открытие / закрытие дропдауна
  const toggleDropdown = useCallback(() => {
    if (isDropdownOpen) closeDropdown();
    else openDropdown();
  }, [isDropdownOpen, openDropdown, closeDropdown]);

  // Хэндлер поиска
  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      withSearch?.onSearch(value);
    },
    [withSearch],
  );

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
    [cls.withShadow]: !!withShadow,
    [cls.themeReverse]: !!themeReverse,
  };

  return (
    <SelectContext.Provider value={{ selectedValue, selectOption }}>
      <div className={clsx(cls.select, mods, className)} ref={dropdownRef}>
        {withSearch ? (
          <div
            className={clsx(cls.select_withSearch_filedWrapper, {
              [cls.select_field_active]: isDropdownOpen,
            })}>
            {!isSearchFocused && (
              <div className={cls.select_value}>{selectedValue || placeholder}</div>
            )}
            <Input
              placeholder={
                !selectedValue ? (typeof placeholder === 'string' ? placeholder : '') : ''
              }
              value={isSearchFocused ? searchValue : ''}
              onChange={handleSearchChange}
              onClick={toggleDropdown}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <SelectTogglerIcon />
          </div>
        ) : (
          <div
            className={clsx(cls.select_field, 'select_field', {
              [cls.select_field_active]: isDropdownOpen,
            })}
            onClick={toggleDropdown}>
            {selectedValue || placeholder}
            <SelectTogglerIcon />
          </div>
        )}

        {isDropdownOpen && (
          <div
            className={clsx(cls.select_dropdown, {
              [cls.dropdown_fullWidth]: isDropdownFullWidth,
              [cls.dropdown_showed]: animateDropdown,
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
  // value = "сырое" значение
  // children = то, что рендерим (ReactNode)
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('Option must be used within a Select component');
  }

  const { selectOption } = context;

  const handleClick = () => {
    // В selectOption передаем то, что увидит пользователь (children),
    // и сырое значение (value), которое пойдёт в onChange вторым аргументом.
    selectOption(children, value);
    onSelect?.(children, value);
  };

  return (
    <div onClick={handleClick} className={cls.select_option}>
      {children}
    </div>
  );
};

Select.Option = Option;

export default Select;
