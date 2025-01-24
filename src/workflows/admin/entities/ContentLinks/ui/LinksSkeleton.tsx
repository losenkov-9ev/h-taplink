import React from 'react';
import Skeleton from 'react-loading-skeleton';
import cls from './ContentLinks.module.scss';

export const LinksSkeleton: React.FC = () => {
  return (
    <div className={cls.skeleton}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className={cls.skeleton_box}>
          <Skeleton height={42} style={{ maxWidth: '100%', width: '100%' }} />
          <Skeleton height={42} style={{ maxWidth: '100%', width: '100%' }} />
        </div>
      ))}

      <Skeleton height={42} className={cls.skeleton_button} />
    </div>
  );
};
