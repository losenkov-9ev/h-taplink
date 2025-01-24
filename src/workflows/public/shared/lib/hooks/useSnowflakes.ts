import React, { useMemo } from 'react';
import Snowflakes, { SnowflakesParams } from 'magic-snowflakes';
import { useSelector } from 'react-redux';
import { selectXmasMode } from '@/workflows/admin/widgets/Appearance';

export const useSnowflakes = () => {
  const isSnowModeEnabled = useSelector(selectXmasMode);

  const config: SnowflakesParams = useMemo(
    () => ({
      speed: 1,
      count: 40,
      size: 3,
      color: '#FFFFFF',
    }),
    [],
  );

  React.useEffect(() => {
    if (isSnowModeEnabled) {
      const snow = new Snowflakes(config);
      snow.start();

      return () => {
        snow.destroy();
      };
    }
  }, [isSnowModeEnabled, config]);
};
