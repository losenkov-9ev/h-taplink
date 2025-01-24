import React, { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import cls from './ContentLinks.module.scss';
import { Input } from '../../../shared/ui/Input';
import DragNDropIcon from '@images/drag-link.svg';
import DeleteLinkIcon from '@images/delete-link.svg';

interface LinkItemProps {
  name: string;
  url: string;
  onChangeLink: (type: 'name' | 'url', value: string) => void;
  onDeleteLink: () => void;
  // Пропы, которые нужно повесить на корневой элемент (div)
  draggableProps?: DraggableProvidedDraggableProps;
  // Пропы, которые нужно повесить на «ручку» перетаскивания (button)
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

export const LinkItem = forwardRef<HTMLDivElement, LinkItemProps>(
  ({ name, url, onChangeLink, draggableProps, dragHandleProps, onDeleteLink }, ref) => {
    const [nameValue, setNameValue] = React.useState(name);
    const [urlValue, setUrlValue] = React.useState(url);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onChangeLink('name', value);
      setNameValue(value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onChangeLink('url', value);
      setUrlValue(value);
    };

    React.useEffect(() => {
      setNameValue(name);
      setUrlValue(url);
    }, [name, url]);

    return (
      <div ref={ref} {...(draggableProps ?? {})} className={cls.contentLinks_item}>
        <button className={cls.contentLinks_item_drag} {...(dragHandleProps ?? {})}>
          <DragNDropIcon />
        </button>

        <Input onChange={handleNameChange} value={nameValue} placeholder="Название" />
        <Input onChange={handleUrlChange} value={urlValue} placeholder="Ссылка" />

        <button onClick={onDeleteLink} className={cls.contentLinks_item_delete}>
          <DeleteLinkIcon />
        </button>
      </div>
    );
  },
);
