import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import clsx from 'clsx';
import cls from './Fonts.module.scss';
import Select from '../../../shared/ui/Select';
import axios, { AxiosResponse } from 'axios';
import { FontItem, FontItemProps } from './FontItem';
import { loadFont, removeFont, useFormData } from '@/workflows/admin/shared/lib';
import { debounce } from '@/shared/lib/debounce';
import { useSelector } from 'react-redux';
import { selectFont } from '@/workflows/admin/widgets/Appearance/model/selectors/selectFonts';

export interface FontResponceItem {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
  menu: string;
}

interface FontResponce {
  kind: string;
  items: FontResponceItem[];
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

interface FontElement {
  props: FontItemProps;
}

export const Fonts: React.FC = () => {
  const fromData = useFormData();

  const [initialLoadedFonts, setInitialLoadedFonts] = useState<string[]>([]);
  const [fontsData, setFontData] = useState<FontResponceItem[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<FontResponceItem[]>(fontsData);

  const startFont = useSelector(selectFont);

  const [currentFont, setCurrentFont] = useState<string>(startFont || '');

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${
          import.meta.env.VITE_FONTS_API_KEY
        }&sort=popularity&capability=WOFF2`,
      )
      .then((response: AxiosResponse<FontResponce>) => {
        setFontData(response.data.items);
        setFilteredFonts(response.data.items); // Изначально показываем весь список
      });
  }, []);

  useEffect(() => {
    if (fontsData.length) {
      const preloadFonts = fontsData.slice(0, 6);
      preloadFonts.forEach(({ menu: id, family }) => loadFont(id, family, family));
      setInitialLoadedFonts(preloadFonts.map(({ menu: id }) => id));
    }
  }, [fontsData]);

  const Row: React.FC<RowProps> = ({ index, style }) => {
    const font = filteredFonts[index]; // Используем отфильтрованные данные
    const isInitiallyLoaded = initialLoadedFonts.includes(font.menu);

    return (
      <div style={style}>
        <Select.Option value={font.family}>
          <FontItem fontId={font.menu} fontFamily={font.family} onVisible={isInitiallyLoaded} />
        </Select.Option>
      </div>
    );
  };

  const handleChangeFont = (font: FontElement) => {
    if (font) {
      const fontId = 'dynamic-font';

      removeFont(fontId);
      const { fontFamily } = font.props;

      loadFont(fontId, fontFamily, fontFamily);
      setCurrentFont(fontFamily);
    }
  };

  const debouncedSearch = React.useMemo(
    () =>
      debounce((searchValue: string) => {
        const lowercasedValue = searchValue.toLowerCase();
        const filtered = fontsData.filter((font) =>
          font.family.toLowerCase().includes(lowercasedValue),
        );
        setFilteredFonts(filtered);
      }, 300),
    [fontsData],
  );

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    setCurrentFont(startFont);
  }, [startFont]);

  useEffect(() => {
    fromData.set('font', currentFont);
  }, [currentFont, fromData]);

  return (
    <div className={cls.fonts}>
      <h2 className={clsx(cls.fonts_title, 's-1')}>Шрифт</h2>
      <div className={cls.fonts_box}>
        <Select
          onChange={(font) => handleChangeFont(font as FontElement)}
          withSearch={{ onSearch: handleSearch }}
          placeholder={startFont || 'Введите название шрифта'}
          isDropdownFullWidth>
          {filteredFonts.length ? (
            <List
              className={cls.fonts_list}
              height={136}
              itemCount={filteredFonts.length}
              itemSize={36}
              width="100%">
              {Row}
            </List>
          ) : (
            <div className={cls.fonts_noItems}>Таких шрифтов нет...</div>
          )}
        </Select>
      </div>
      <div className={cls.fonts_description}>
        Вы можете найти любой шрифт из fonts.google.com <br /> написав его название в поиске
      </div>
    </div>
  );
};
