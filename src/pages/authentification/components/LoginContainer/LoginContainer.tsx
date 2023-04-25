import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PWD_REGEX } from '../../../../shared/constants/regex.constants';
import { LoginCredentials } from '../../constants/LoginCredentials.constants';
import { LoginForm } from '../../interfaces/login-form.interface';
import css from './LoginContainer.module.css';

const LoginContainer = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const onSubmit = (data: LoginForm) => {
    if (JSON.stringify(data) !== JSON.stringify(LoginCredentials)) {
      alert('Incorrect credentials');
      return;
    }
    navigate('/products');
  };
  return (
    <div className={css.login}>
      <h2>{t('login.title')}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.login__username}
          {...register('username', { required: true })}
        />
        <input
          className={css.login__password}
          {...register('password', {
            required: true,
            pattern: {
              value: PWD_REGEX,
              message: 'invalid email address',
            },
          })}
        />
        <button className={css.login__submit} type="submit">
          {t('global.submitText')}
        </button>
      </form>
    </div>
  );
};

export default LoginContainer;
