import { useContext } from 'react';
import { ETheme, LOCAL_STORAGE_THEME_KEY, ThemeContext } from './ThemeContext';

interface IUseThemeResult {
  theme: ETheme;
  toggleTheme: () => void;
}

export function useTheme(): IUseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const curtrentTheme = theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;

    setTheme?.(curtrentTheme);
    document.body.className = curtrentTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, curtrentTheme);
  };

  return {
    theme: theme || ETheme.LIGHT,
    toggleTheme,
  };
}
