import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cls from './PageLoader.module.scss';

export const PageLoader: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#F2F2F2" highlightColor="#FFFFFF">
      <div className={cls.wrapper}>
        {/* Заголовок страницы */}
        <div className={cls.header}>
          <Skeleton height={40} width="30%" style={{ borderRadius: 8 }} />
        </div>

        {/* Фильтры/Категории */}
        <div className={cls.filters}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} width={100} height={32} style={{ borderRadius: 20 }} />
          ))}
        </div>

        {/* Основные карточки */}
        <div className={cls.cardsContainer}>
          {Array.from({ length: 2 }).map((_, idx) => (
            <div className={cls.card} key={idx}>
              <Skeleton height={180} style={{ borderRadius: 16 }} />
              <div className={cls.cardContent}>
                <Skeleton width="70%" height={20} style={{ borderRadius: 4 }} />
                <Skeleton width="50%" height={16} style={{ borderRadius: 4 }} />
                <div className={cls.rating}>
                  <Skeleton width={100} height={16} style={{ borderRadius: 4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Баннер/Промо-блок */}
        <div className={cls.banner}>
          <Skeleton height={160} style={{ borderRadius: 16 }} />
        </div>

        {/* Дополнительная информация */}
        <div className={cls.infoSection}>
          <Skeleton width="40%" height={24} style={{ borderRadius: 4, marginBottom: 16 }} />
          <div className={cls.infoGrid}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} height={80} style={{ borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
