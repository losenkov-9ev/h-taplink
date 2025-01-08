import React from 'react';
import { loadFont, removeFont } from '@/workflows/admin/shared/lib';
import FontFaceObserver from 'fontfaceobserver';

export interface FontItemProps {
  fontId: string;
  fontFamily: string;
  onVisible: boolean;
}

export const FontItem: React.FC<FontItemProps> = ({ fontId, fontFamily }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const unicodeRange = fontFamily; // Replace with a proper unicode range if needed

    loadFont(fontId, fontFamily, unicodeRange);

    const font = new FontFaceObserver(fontFamily);
    font
      .load()
      .then(() => {
        setIsLoading(false);
        setHasError(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });

    return () => removeFont(fontId);
  }, [fontId, fontFamily]);

  if (isLoading) return <div>Загрузка {fontFamily}...</div>;
  if (hasError) return null;

  return <div style={{ fontFamily }}>{fontFamily}</div>;
};
