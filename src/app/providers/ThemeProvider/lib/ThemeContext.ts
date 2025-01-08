import { createContext } from 'react';

export enum ETheme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
}

export interface IThemeContextProps {
  theme?: ETheme;
  setTheme?: (theme: ETheme) => void;
}

export const ThemeContext = createContext<IThemeContextProps>({});
export const LOCAL_STORAGE_THEME_KEY = 'theme';
