import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface InputSkeletonProps {
  isTextArea?: boolean;
}

export const InputSkeleton: React.FC<InputSkeletonProps> = ({ isTextArea = false }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '8px',
    }}>
    <Skeleton width={80} height={16} />
    <Skeleton height={isTextArea ? 98 : 42} style={{ width: '100%' }} />
  </div>
);
