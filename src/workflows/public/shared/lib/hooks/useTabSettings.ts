import React from 'react';

import { useSelector } from 'react-redux';
import { selectTabData } from '@/workflows/admin/features/Tab';

export const useTabSettings = () => {
  const tabData = useSelector(selectTabData);

  React.useEffect(() => {
    document.title = tabData.name;
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = tabData.favicon;
    }
  }, [tabData]);
};
