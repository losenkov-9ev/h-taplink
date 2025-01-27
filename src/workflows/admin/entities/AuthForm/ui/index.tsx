import React from 'react';
import cls from './AuthForm.module.scss';
import clsx from 'clsx';
import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router';
import { createLinkPath } from '@/workflows/admin/shared/lib/utils/createLinkPath';
import { AdminRoutePath } from '@/workflows/admin/app/config/routes';
import { Input } from '@/workflows/admin/shared/ui/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { fetchAuthData } from '../model/slice/thunk';
import { AuthParams } from '../model/types/thunkTypes';
import { useSelector } from 'react-redux';
import { selectAuthError } from '../model/selectors/selectError';
import { ToastType, useToast } from '@/workflows/admin/shared/lib/hooks/useToast';

export const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthParams>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useToast();
  const authError = useSelector(selectAuthError);

  const onSubmit: SubmitHandler<AuthParams> = async (data) => {
    try {
      // Отправка логина через Redux action
      const result = await dispatch(fetchAuthData(data)).unwrap();
      if (result.ok) {
        navigate(createLinkPath(AdminRoutePath.settings)); // Перенаправление при успешном логине
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  };

  React.useEffect(() => {
    if (authError) {
      notify(authError, ToastType.Error);
    }
  }, [authError, notify]);

  return (
    <form className={cls.authForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(cls.authForm_title, 's-1')}>Вход в аккаунт</div>
      <div className={cls.authForm_box}>
        {/* Поле логина */}
        <div className={cls.authForm_field}>
          <Input
            placeholder="Логин"
            isError={Boolean(errors.username?.message)}
            {...register('username', { required: 'Логин обязателен' })}
          />
          {errors.username && <div className={cls.authForm_error}>{errors.username.message}</div>}
        </div>

        {/* Поле пароля */}
        <div className={cls.authForm_field}>
          <Input
            isError={Boolean(errors.password?.message)}
            placeholder="Пароль"
            type="password"
            {...register('password', { required: 'Пароль обязателен' })}
          />
          {errors.password && <div className={cls.authForm_error}>{errors.password.message}</div>}
        </div>
      </div>

      <Button className={cls.authForm_button} type="submit">
        Войти
      </Button>
    </form>
  );
};
