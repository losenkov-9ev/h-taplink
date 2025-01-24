import React, { useCallback } from 'react';
import cls from './Filling.module.scss';
import { Button } from '@/shared/ui/Button';
import { ContentBlock } from '@/workflows/admin/entities/ContentBlock';
import { ContentLinks, getLinks } from '@/workflows/admin/entities/ContentLinks';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getContent, updateContent } from '../model/slice/thunk';
import { useSelector } from 'react-redux';
import { selectContent } from '../model/selectors/selectContent';
import { useSaveContext } from '@/app/providers/SaveContentProvider';
import { selectContentStatus } from '../model/selectors/selectContentStatus';
import { FillingData } from '../model/types/fillingSchema';

export const Filling: React.FC = () => {
  const dispatch = useAppDispatch();
  const content = useSelector(selectContent);
  const contentStatus = useSelector(selectContentStatus);

  const { onButtonClick } = useSaveContext();

  // Локальное состояние для хранения измененных данных
  const [updatedFields, setUpdatedFields] = React.useState<Partial<FillingData>>({});

  const handleInputChange = (key: keyof FillingData, value: string) => {
    setUpdatedFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onButtonClick();

    const finalData = { ...content, ...updatedFields };
    dispatch(updateContent(finalData));
  };

  React.useEffect(() => {
    dispatch(getContent());
    dispatch(getLinks());
  }, [dispatch]);

  const fieldName = useCallback((name: 'title' | 'text', id: number) => {
    return `${name}_${id + 1}` as keyof FillingData;
  }, []);

  return (
    <div className={cls.filling}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <ContentBlock
            status={contentStatus}
            title={updatedFields[fieldName('title', idx)] || content[fieldName('title', idx)]}
            content={updatedFields[fieldName('text', idx)] || content[fieldName('text', idx)]}
            onTitleChange={(value) => handleInputChange(fieldName('title', idx), value)}
            onContentChange={(value: string) => handleInputChange(fieldName('text', idx), value)}
            index={idx}
          />
          {idx === 0 && <ContentLinks />}
        </React.Fragment>
      ))}

      <Button className={cls.filling_saveButton} onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
};
