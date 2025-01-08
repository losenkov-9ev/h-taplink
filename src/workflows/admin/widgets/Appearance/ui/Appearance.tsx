import { useSaveContext } from '@/app/providers/SaveContentProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { Background } from '@/workflows/admin/features/Background';
import { Colors } from '@/workflows/admin/features/Colors';
import { Design } from '@/workflows/admin/features/Design';
import { Fonts } from '@/workflows/admin/features/Fonts';
import { Logo } from '@/workflows/admin/features/Logo';
import { XmasMode } from '@/workflows/admin/features/XmasMode';
import { useFormData } from '@/workflows/admin/shared/lib';
import { updateAppearance } from '../model/slice/thunks';
import React, { useCallback } from 'react';

export const Appearance: React.FC = () => {
  const formData = useFormData();
  const dispatch = useAppDispatch();
  const { addNotifyHandler, removeNotifyHandler } = useSaveContext();

  const handleSave = useCallback(() => {
    dispatch(updateAppearance(formData));
  }, [formData, dispatch]);

  React.useEffect(() => {
    addNotifyHandler(handleSave);

    return () => {
      removeNotifyHandler(handleSave);
    };
  }, [addNotifyHandler, removeNotifyHandler, handleSave]);

  return (
    <div className="admin-block">
      <h2 className="admin-block_title h-1">Внешний вид</h2>
      <XmasMode />
      <Design />
      <Logo />
      <Background />
      <Colors />
      <Fonts />
    </div>
  );
};
