import React from 'react';
import cls from './ContentBlock.module.scss';
import { Input } from '../../shared/ui/Input';
import { Textarea } from '../../shared/ui/Input/Textarea';

interface ContentBlockProps {
  index: number;
  title: string;
  content: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ index, title, content }) => {
  const [titleValue, setTitleValue] = React.useState<string>(title);
  const [contentValue, setContentValue] = React.useState<string>(content);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  return (
    <div className={cls.contentBlock}>
      <div className={cls.contentBlock_box}>
        <Input
          placeholder="Ваше название"
          onChange={onTitleChange}
          value={titleValue}
          title={`Заголовок ${index ? index + 1 : ''}`}
        />
      </div>
      <Textarea
        placeholder="Начните писать текст..."
        onChange={onContentChange}
        value={contentValue}
        title={`Поле с текстом ${index ? index + 1 : ''}`}></Textarea>
    </div>
  );
};
