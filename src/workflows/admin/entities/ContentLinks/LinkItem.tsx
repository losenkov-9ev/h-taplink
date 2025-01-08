import React from 'react';
import cls from './ContentLinks.module.scss';
import { Input } from '../../shared/ui/Input';
import type { LinkItem as LinkItemType } from '../../widgets/Filling/index';

export const LinkItem: React.FC<LinkItemType> = ({ name, url }) => {
  const [nameValue, setNameValue] = React.useState<string>(name);
  const [urlValue, setUrlValue] = React.useState<string>(url);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  return (
    <div className={cls.contentLinks_item}>
      <Input onChange={handleNameChange} value={nameValue} placeholder="Название" />
      <Input onChange={handleUrlChange} value={urlValue} placeholder="Ссылка" />
    </div>
  );
};
