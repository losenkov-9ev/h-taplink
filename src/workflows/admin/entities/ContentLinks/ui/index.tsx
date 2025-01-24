import React, { useCallback, useEffect } from 'react';
import cls from './ContentLinks.module.scss';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

import { LinkItem } from './LinkItem';
import { selectActiveLinks } from '../model/selectors/selectData';
import { selectLinksStatus } from '../model/selectors/selectStatus';
import { LoadingStatus } from '@/workflows/admin/shared/lib/types/loading';
import { LinksSkeleton } from './LinksSkeleton';
import { useSaveContext } from '@/app/providers/SaveContentProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { updateLinks } from '../model/slice/thunks';
import type { LinkItem as LinkItemType } from '../model/types/LinksSchema';
import { WithRequired } from '@/app/types';

export const ContentLinks: React.FC = () => {
  const dispatch = useAppDispatch();

  const linksData = useSelector(selectActiveLinks);
  const linksStatus = useSelector(selectLinksStatus);

  // Локальный стейт для редактируемых ссылок
  const [links, setLinks] = React.useState<WithRequired<LinkItemType, 'name' | 'url'>[]>(linksData);

  const { addNotifyHandler, removeNotifyHandler } = useSaveContext();

  useEffect(() => {
    setLinks(linksData);
  }, [linksData]);

  // Добавление новой ссылки
  const onCreateNewLink = () => {
    setLinks((prev) => (prev.length < 40 ? [...prev, { name: '', url: '' }] : prev));
  };

  // Изменение конкретного поля (name/url) в ссылке
  const handleChangeLink = (type: 'name' | 'url', value: string, idx: number) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [type]: value };
      return updated;
    });
  };

  const handleSave = useCallback(() => {
    dispatch(updateLinks(links));
  }, [dispatch, links]);

  useEffect(() => {
    addNotifyHandler(handleSave);
    return () => {
      removeNotifyHandler(handleSave);
    };
  }, [addNotifyHandler, removeNotifyHandler, handleSave]);

  // Функция для перестановки элементов в массиве
  const reorder = (
    list: WithRequired<LinkItemType, 'name' | 'url'>[],
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Вызывается, когда пользователь отпускает перетаскиваемый элемент
  const onDragEnd = (result: DropResult) => {
    // Если пользователь "уронил" элемент вне списка или не сдвинул позицию — ничего не делаем
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }
    const newOrder = reorder(links, result.source.index, result.destination.index);
    setLinks(newOrder);
  };

  const handleDeleteLink = (idx: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== idx));
  };

  return linksStatus === LoadingStatus.FULFILLED ? (
    <div className={cls.contentLinks}>
      <div className={clsx(cls.contentLinks_title, 's-1')}>Ссылки (до 40)</div>
      <div className={cls.contentLinks_box}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-links">
            {(droppableProvided) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={cls.contentLinks_inner}>
                {links.map((item, idx) => (
                  <Draggable key={`link-${idx}`} draggableId={`link-${idx}`} index={idx}>
                    {(draggableProvided) => (
                      // Вместо отдельного <div> мы рендерим сразу LinkItem
                      <LinkItem
                        ref={draggableProvided.innerRef}
                        // сюда прокидываем пропсы для Draggable
                        draggableProps={draggableProvided.draggableProps}
                        dragHandleProps={
                          draggableProvided.dragHandleProps as DraggableProvidedDragHandleProps
                        }
                        onDeleteLink={() => handleDeleteLink(idx)}
                        name={item.name}
                        url={item.url}
                        onChangeLink={(type, value) => handleChangeLink(type, value, idx)}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button onClick={onCreateNewLink}>Добавить ссылку</Button>
      </div>
    </div>
  ) : (
    <LinksSkeleton />
  );
};
