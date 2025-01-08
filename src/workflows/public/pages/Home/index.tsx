import React from 'react';
import { Header } from '../../entities/Header';

import cls from './Home.module.scss';
import { TextBlock } from '../../entities/TextBlock';
import { LinksBlock } from '../../entities/LinksBlock';
import { Footer } from '../../entities/Footer';

export const Home: React.FC = () => {
  return (
    <div className={cls.home}>
      <Header />
      <TextBlock
        isFirstBlock
        title="Заголовок"
        content="Lorem ipsum dolor sit amet consectetur. Tristique viverra scelerisque proin consectetur bibendum. Rhoncus dignissim arcu tortor enim sociis. Egestas adipiscing natoque vestibulum"
      />
      <LinksBlock />
      <TextBlock
        title="Заголовок 2"
        content="Lorem ipsum dolor sit amet consectetur. Tristique viverra scelerisque proin consectetur bibendum. Rhoncus dignissim arcu tortor enim sociis. Egestas adipiscing natoque vestibulum"
      />
      <TextBlock
        title="Заголовок 3"
        content="Lorem ipsum dolor sit amet consectetur. Tristique viverra scelerisque proin consectetur bibendum. Rhoncus dignissim arcu tortor enim sociis. Egestas adipiscing natoque vestibulum"
      />
      <TextBlock
        title="Заголовок 4"
        content="Lorem ipsum dolor sit amet consectetur. Tristique viverra scelerisque proin consectetur bibendum. Rhoncus dignissim arcu tortor enim sociis. Egestas adipiscing natoque vestibulum"
      />
      <Footer />
    </div>
  );
};
