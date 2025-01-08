import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface DesignItemSkeletonProps {
  isSmall?: boolean;
}

export const DesignItemSkeleton: React.FC<DesignItemSkeletonProps> = ({ isSmall = false }) => {
  return (
    <div
      style={{
        width: '100%',
        height: !isSmall ? '480px' : '226px',
        padding: '8px',
        paddingBottom: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}>
      {/* "Изображение" в верхней части */}
      <Skeleton height={!isSmall ? 350 : 160} style={{ width: '100%' }} />

      {/* Отступ от картинки до названия 16px */}
      <div style={{ marginTop: '16px' }}>
        {/* "Название" */}
        <Skeleton height={24} width="60%" style={{ marginBottom: '8px' }} />

        {/* Пара строк «подзаголовка» или описания */}
        {!isSmall && (
          <>
            <Skeleton height={16} width="80%" style={{ marginBottom: '8px' }} />
            <Skeleton height={16} width="70%" style={{ marginBottom: '8px' }} />
          </>
        )}
      </div>
    </div>
  );
};
