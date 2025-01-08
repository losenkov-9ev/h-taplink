import React from 'react';
import cls from './Filling.module.scss';
import { Button } from '@/shared/ui/Button';
import { ContentBlock } from '@/workflows/admin/entities/ContentBlock';
import { ContentLinks } from '@/workflows/admin/entities/ContentLinks';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getContent } from '../model/slice/thunk';
import { useSelector } from 'react-redux';
import { selectContent } from '../model/selectors/selectContent';
import { useSaveContext } from '@/app/providers/SaveContentProvider';
import { selectContentStatus } from '../model/selectors/selectContentStatus';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';

export const Filling: React.FC = () => {
  const dispatch = useAppDispatch();
  const content = useSelector(selectContent);
  const contentStatus = useSelector(selectContentStatus);

  const { onButtonClick } = useSaveContext();

  const handleClick = () => {
    onButtonClick();
  };

  React.useEffect(() => {
    dispatch(getContent());
  }, [dispatch]);

  return (
    <div className={cls.filling}>
      {contentStatus === LoadingStatus.LOADING ? (
        <div>Loading...</div>
      ) : (
        <>
          <ContentBlock title={content.title_1} content={content.text_1} index={0} />
          <ContentLinks />
          <ContentBlock title={content.title_2} content={content.text_2} index={1} />
          <ContentBlock title={content.title_3} content={content.text_3} index={2} />
          <ContentBlock title={content.title_4} content={content.text_4} index={3} />

          <Button className={cls.filling_saveButton} onClick={handleClick}>
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
};
