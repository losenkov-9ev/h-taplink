import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';

import cls from './LoadingScreen.module.scss';

import { selectLoadingProgress } from '../../model/selectors/loadingProgressSelector';

interface LoadingScreenProps {
  isLoaded: (status: boolean) => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoaded }) => {
  const progress = useSelector(selectLoadingProgress);

  useEffect(() => {
    const status = progress === 100;
    if (status) isLoaded(status);
  }, [progress, isLoaded]);

  return (
    <div className={cls.loadingScreen}>
      {/* Чёрная полоса, высота которой соответствует прогрессу */}
      <div className={cls.loadingBar} style={{ height: `${progress}%` }} />

      {/* Анимированный набор процентов (CountUp) */}
      <div className={cls.loadingText}>
        <CountUp
          start={0} // анимация от 0
          end={progress}
          duration={1} // длительность анимации, сек
          suffix="%"
        />
      </div>
    </div>
  );
};
