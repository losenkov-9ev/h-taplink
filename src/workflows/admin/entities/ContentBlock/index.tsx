import React from 'react';
import cls from './ContentBlock.module.scss';
import { Input } from '../../shared/ui/Input';
import { Textarea } from '../../shared/ui/Input/Textarea';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { InputSkeleton } from '../../shared/ui/Input/InputSkeleton';

interface ContentBlockProps {
  index: number;
  title: string;
  content: string;
  status: LoadingStatus;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { index, title, content, status, onTitleChange, onContentChange } = props;

  const [titleValue, setTitleValue] = React.useState<string>(title);
  const [contentValue, setContentValue] = React.useState<string>(content);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitleValue(value);
    onTitleChange(value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setContentValue(value);
    onContentChange(value);
  };

  React.useEffect(() => {
    setTitleValue(title);
    setContentValue(content);
  }, [title, content]);

  return (
    <div className={cls.contentBlock}>
      {status === LoadingStatus.FULFILLED ? (
        <>
          <div className={cls.contentBlock_box}>
            <Input
              placeholder="Ваше название"
              onChange={handleTitleChange}
              value={titleValue}
              title={`Заголовок ${index ? index + 1 : ''}`}
            />
          </div>
          <Textarea
            placeholder="Начните писать текст..."
            onChange={handleContentChange}
            value={contentValue}
            title={`Поле с текстом ${index ? index + 1 : ''}`}></Textarea>
        </>
      ) : (
        <>
          <div className={cls.contentBlock_box}>
            <InputSkeleton />
          </div>
          <InputSkeleton isTextArea={true} />
        </>
      )}
    </div>
  );
};
