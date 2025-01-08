import React from 'react';
import clsx from 'clsx';
import cls from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  disabled = false,
  onChange,
  className,
  ...otherProps
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked);
    }
    onChange?.(event);
  };

  return (
    <label
      className={clsx(
        cls.checkbox,
        {
          [cls.checked]: isChecked,
          [cls.disabled]: disabled,
        },
        className,
      )}>
      <input
        type="checkbox"
        className={cls.input}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...otherProps}
      />
      <span className={cls.switch} />
    </label>
  );
};
