import React from 'react';
import { Header } from '../../entities/Header';

import cls from './Home.module.scss';
import { TextBlock } from '../../entities/TextBlock';
import { LinksBlock } from '../../entities/LinksBlock';
import { Footer } from '../../entities/Footer';
import { useSelector } from 'react-redux';
import { selectContent } from '@/workflows/admin/widgets/Filling/model/selectors/selectContent';
import { useAppearance } from '../../shared/lib/hooks/useAppearance';
import { useSnowflakes } from '../../shared/lib/hooks/useSnowflakes';
import { selectCurrentDesign } from '@/workflows/admin/widgets/Appearance';
import clsx from 'clsx';

export const Home: React.FC = () => {
  useSnowflakes();
  useAppearance();

  const currentDesign = useSelector(selectCurrentDesign);
  const content = useSelector(selectContent);

  return (
    <div className={clsx(cls.home, currentDesign, 'home-page')}>
      <div className={clsx(cls.home_shadow, 'public-container')} />
      <div className={cls.home_inner}>
        <Header />
        <TextBlock isFirstBlock title={content.title_1} content={content.text_1} />
        <LinksBlock />
        <TextBlock title={content.title_2} content={content.text_2} />
        <TextBlock title={content.title_3} content={content.text_3} />
        <TextBlock title={content.title_4} content={content.text_4} />
        <Footer />
      </div>
    </div>
  );
};
