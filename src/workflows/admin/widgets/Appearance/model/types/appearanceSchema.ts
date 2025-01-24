import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export interface ConfigItem {
  light_theme_colors: ColorTheme;
  dark_theme_colors: ColorTheme;
  background: string;
}

export interface ColorTheme {
  text: string;
  icons: string;
  buttons: string;
  background: string;
}

export interface DesignItem {
  image: string;
  name: string;
  name_id: string;
}

export interface BackgroundItem {
  image: {
    preview: string;
    dark_theme_image: string;
    light_theme_image: string;
  };
  name: string;
  name_id: string;
}

export interface AppearanceData {
  new_year_mode: boolean;
  design: string;
  background: string;
  logo_1: string;
  logo_2: string;
  background_image: string;
  light_theme_colors: ColorTheme;
  dark_theme_colors: ColorTheme;
  font: string;
}

export interface AppearanceSchema {
  status: LoadingStatus;
  configs: {
    status: LoadingStatus;
    data: Record<string, ConfigItem>;
  };
  designs: {
    status: LoadingStatus;
    data: DesignItem[];
  };
  backgrounds: {
    status: LoadingStatus;
    data: BackgroundItem[];
  };
  data: AppearanceData;
}
