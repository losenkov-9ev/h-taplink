import React, { useCallback } from 'react';
import { DesignItemColorPicker } from '../../shared/ui/DesignItem';

import cls from './Colors.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectColors } from '../../widgets/Appearance/model/selectors/selectColors';
import { debounce } from '@/shared/lib/debounce';
import { useFormData } from '../../shared/lib';

const colorNames = ['Фон', 'Текст', 'Кнопки', 'Иконки'];

export const Colors: React.FC = () => {
  const formData = useFormData();
  const preloadedColors = useSelector(selectColors);

  const [colors, setColors] = React.useState({
    light: { ...preloadedColors.lightColors },
    dark: { ...preloadedColors.darkColors },
  });

  // Обновление цвета
  const updateColor = useCallback((theme: 'light' | 'dark', index: number, color: string) => {
    setColors((prev) => ({
      ...prev,
      [theme]: {
        ...prev[theme],
        [Object.keys(prev[theme])[index]]: color,
      },
    }));
  }, []);

  const debouncedUpdateColor = React.useMemo(
    () => debounce(updateColor, 200), // Обновление цвета раз в 200мс
    [updateColor],
  );

  React.useEffect(() => {
    setColors({
      light: { ...preloadedColors.lightColors },
      dark: { ...preloadedColors.darkColors },
    });
  }, [preloadedColors]);

  React.useEffect(() => {
    formData.set('light_theme_colors', JSON.stringify(colors.light));
    formData.set('dark_theme_colors', JSON.stringify(colors.dark));
  }, [colors, formData]);

  return (
    <>
      <div className={cls.colors}>
        <div className={clsx(cls.colors_title, 's-1')}>Цвета светлой темы</div>
        <div className={cls.colors_inner}>
          {Object.values(colors.light).map((color, idx) => (
            <DesignItemColorPicker
              name={colorNames[idx]}
              startColor={color}
              key={`${color}_${idx}`}
              onChangeColor={(newColor) => debouncedUpdateColor('light', idx, newColor.hex)}
            />
          ))}
        </div>
      </div>
      <div className={cls.colors}>
        <div className={clsx(cls.colors_title, 's-1')}>Цвета темной темы</div>
        <div className={cls.colors_inner}>
          {Object.values(colors.dark).map((color, idx) => (
            <DesignItemColorPicker
              name={colorNames[idx]}
              startColor={color}
              key={`${color}_${idx}`}
              onChangeColor={(newColor) => debouncedUpdateColor('dark', idx, newColor.hex)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
