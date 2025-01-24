import { selectFont } from '@/workflows/admin/widgets/Appearance/model/selectors/selectFonts';
import React from 'react';
import { useSelector } from 'react-redux';

export const usePublicFont = () => {
  const fontFamily = useSelector(selectFont);

  React.useEffect(() => {
    if (fontFamily) {
      const linkId = `public-font-link`;

      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.media = 'print';
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`;
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);

      return () => {
        const linkToRemove = document.getElementById(linkId);
        if (linkToRemove) {
          document.head.removeChild(linkToRemove);
        }
      };
    }
  }, [fontFamily]);
};
