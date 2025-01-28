export { getTab, updateTab } from './model/slice/thunk';

export type { TabSchema } from './model/types/tabSchema';
export { tabReducer } from './model/slice/tabSlice';
export { Tab } from './ui';

export { selectTabStatus } from './model/selectors/tabStatus';
export { selectTabData } from './model/selectors/tabData';
