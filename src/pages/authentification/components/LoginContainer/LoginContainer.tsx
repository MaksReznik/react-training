import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PWD_REGEX } from '../../../../shared/constants/regex.constants';
import { LoginCredentials } from '../../constants/LoginCredentials.constants';
import { LoginForm } from '../../interfaces/login-form.interface';
import css from './LoginContainer.module.css';

const LoginContainer = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
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
      <h2>Login</h2>
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
        <input className={css.login__submit} type="submit" />
      </form>
    </div>
  );
};

export default LoginContainer;
