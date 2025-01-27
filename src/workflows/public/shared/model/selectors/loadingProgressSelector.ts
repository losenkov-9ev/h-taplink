import { selectLinksStatus } from '@/workflows/admin/entities/ContentLinks/model/selectors/selectStatus';
import { selectTabStatus } from '@/workflows/admin/features/Tab';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { selectIsAppearanceLoading } from '@/workflows/admin/widgets/Appearance';
import { selectAllBackgroundsStatus } from '@/workflows/admin/widgets/Appearance/model/selectors/selectBackground';
import { selectContentStatus } from '@/workflows/admin/widgets/Filling/model/selectors/selectContentStatus';
import { createSelector } from '@reduxjs/toolkit';

export const selectLoadingProgress = createSelector(
  [
    selectTabStatus,
    selectIsAppearanceLoading,
    selectAllBackgroundsStatus,
    selectLinksStatus,
    selectContentStatus,
  ],
  (tabStatus, appearanceStatus, backgroundStatus, linksStatus, contentStatus) => {
    const statuses = [tabStatus, appearanceStatus, backgroundStatus, linksStatus, contentStatus];
    const completedCount = statuses.filter((status) => status === LoadingStatus.FULFILLED).length;
    return Math.round((completedCount / statuses.length) * 100);
  },
);
