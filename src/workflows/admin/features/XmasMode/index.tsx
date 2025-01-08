import React from 'react';
import cls from './XmasMode.module.scss';
import clsx from 'clsx';
import { Checkbox } from '../../shared/ui/Checkbox';
import { useSelector } from 'react-redux';
import { selectIsAppearanceLoading, selectXmasMode } from '../../widgets/Appearance';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { useFormData } from '../../shared/lib';

export const XmasMode: React.FC = () => {
  const isXmasModeEnabled = useSelector(selectXmasMode);
  const isLoading = useSelector(selectIsAppearanceLoading);
  const [isChecked, setIsChecked] = React.useState<boolean>(isXmasModeEnabled || false);

  const formData = useFormData();

  const onChangeCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  React.useEffect(() => {
    setIsChecked(isXmasModeEnabled);
  }, [isXmasModeEnabled]);

  React.useEffect(() => {
    formData.set('new_year_mode', isChecked.toString());
  }, [formData, isChecked]);

  return (
    <div className={cls.xmasMode}>
      <div className={cls.xmasMode_box}>
        <div className={clsx(cls.xmasMode_title, 's-1')}>Новогодний режим</div>
        <Checkbox
          disabled={isLoading !== LoadingStatus.FULFILLED}
          checked={isChecked}
          onChange={onChangeCheckbox}
        />
      </div>
      <p className={cls.xmasMode_description}>Добавляет эффект падающего снега на вашу страницу</p>
    </div>
  );
};
