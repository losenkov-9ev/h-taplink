import { ETheme, useTheme } from '@/app/providers/ThemeProvider';
import {
  selectAllBackgrounds,
  selectBackgroundFile,
  selectCurrentBg,
} from '@/workflows/admin/widgets/Appearance/model/selectors/selectBackground';
import { selectColors } from '@/workflows/admin/widgets/Appearance/model/selectors/selectColors';
import { selectFont } from '@/workflows/admin/widgets/Appearance/model/selectors/selectFonts';
import React from 'react';
import { useSelector } from 'react-redux';

export const useAppearance = () => {
  const { theme } = useTheme();

  const colors = useSelector(selectColors);
  const font = useSelector(selectFont);

  const backgroundId = useSelector(selectCurrentBg);
  const allBackgrounds = useSelector(selectAllBackgrounds);
  const backgroundFile = useSelector(selectBackgroundFile);

  React.useEffect(() => {
    const root = document.documentElement;

    // Общие стили
    root.style.setProperty('--loaded-font-name', font);

    if (backgroundId !== 'file') {
      const bg = allBackgrounds.find((background) => background.name_id === backgroundId);

      if (bg)
        root.style.setProperty(
          '--background-image',
          `url(${theme === ETheme.DARK ? bg.image.dark_theme_image : bg.image.light_theme_image})`,
        );
    } else {
      root.style.setProperty('--loaded-background-image', `url(${backgroundFile})`);
    }

    // Темы
    const currentColors = theme === ETheme.DARK ? colors.darkColors : colors.lightColors;
    root.style.setProperty('--loaded-icon-color', currentColors.icons);
    root.style.setProperty('--loaded-text-color', currentColors.text);
    root.style.setProperty('--loaded-button-color', currentColors.buttons);
    root.style.setProperty('--loaded-button-color-transparent', currentColors.buttons + 'A3');
    root.style.setProperty('--loaded-button-color-transparent-32', currentColors.buttons + 'B3');
    root.style.setProperty('--loaded-bg-color', currentColors.background);
    root.style.setProperty('--loaded-bg-color-transparent', currentColors.background + '8F');
  }, [theme, colors, font, backgroundId, allBackgrounds, backgroundFile]);
};
