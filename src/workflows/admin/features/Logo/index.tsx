import React from 'react';
import cls from './Logo.module.scss';
import { FileUpload } from '../../shared/ui/FileUpload';
import { useSelector } from 'react-redux';
import { selectLogotypes } from '../../widgets/Appearance/model/selectors/selectLogos';
import { selectIsAppearanceLoading } from '../../widgets/Appearance';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { InputSkeleton } from '../../shared/ui/Input/InputSkeleton';
import { useFormData } from '../../shared/lib';

enum FieldNames {
  LOGO_1 = 'logo_1',
  LOGO_2 = 'logo_2',
}

// Набор полей, чтобы не писать один и тот же код для LOGO_1 и LOGO_2 вручную
const logosConfig = [
  { fieldName: FieldNames.LOGO_1, title: 'Логотип 1' },
  { fieldName: FieldNames.LOGO_2, title: 'Логотип 2' },
];

export const Logo: React.FC = () => {
  const formData = useFormData();

  const preloadedLogotypes = useSelector(selectLogotypes);
  const logoStatus = useSelector(selectIsAppearanceLoading);

  // Здесь мы используем объект, где ключ – это имя поля (FieldNames),
  // чтобы при надобности быстро обращаться к LOGO_1 или LOGO_2
  const [clearTrigger, setClearTrigger] = React.useState<Record<FieldNames, number>>({
    [FieldNames.LOGO_1]: 0,
    [FieldNames.LOGO_2]: 0,
  });

  const [logoFile, setLogoFile] = React.useState<Record<FieldNames, File | null>>({
    [FieldNames.LOGO_1]: null,
    [FieldNames.LOGO_2]: null,
  });

  const [logoLink, setLogoLink] = React.useState<Record<FieldNames, string>>({
    [FieldNames.LOGO_1]: '',
    [FieldNames.LOGO_2]: '',
  });

  // Универсальная функция загрузки
  const handleLogoUpload = (logoName: FieldNames, file: File) => {
    setLogoFile((prev) => ({ ...prev, [logoName]: file }));
    setLogoLink((prev) => ({ ...prev, [logoName]: file.name }));
  };

  // Универсальная функция очистки
  const handleLogoClear = (logoName: FieldNames) => {
    setLogoFile((prev) => ({ ...prev, [logoName]: null }));
    setLogoLink((prev) => ({ ...prev, [logoName]: '' }));
    setClearTrigger((prev) => ({
      ...prev,
      [logoName]: prev[logoName] + 1,
    }));
  };

  // При загрузке с бэка проставляем ссылки
  React.useEffect(() => {
    setLogoLink({
      [FieldNames.LOGO_1]: preloadedLogotypes.firstLogo,
      [FieldNames.LOGO_2]: preloadedLogotypes.secondLogo,
    });
  }, [preloadedLogotypes]);

  // Сохраняем данные в formData
  React.useEffect(() => {
    Object.entries(logoFile).forEach(([field, file]) => {
      formData.set(field as FieldNames, file || '');
    });
  }, [logoFile, formData]);

  return (
    <div className={cls.logo}>
      {logoStatus === LoadingStatus.FULFILLED ? (
        logosConfig.map(({ fieldName, title }) => (
          <FileUpload
            key={fieldName}
            title={title}
            onUploadFile={(file) => handleLogoUpload(fieldName, file)}
            onClearFile={() => handleLogoClear(fieldName)}
            clearTrigger={clearTrigger[fieldName]}
            placeholder="Загрузить файл"
            preloaded={logoLink[fieldName] ? { url: logoLink[fieldName] } : undefined}
          />
        ))
      ) : (
        <>
          <InputSkeleton />
          <InputSkeleton />
        </>
      )}
    </div>
  );
};
