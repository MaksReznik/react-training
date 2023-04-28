import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PWD_REGEX } from '../../../../shared/constants/Regex.constants';
import { LoginCredentials } from '../../constants/LoginCredentials.constants';
import { LocalStorageLoginKeys } from '../../enums/LocalStorageLoginKeys.enum';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import css from './LoginContainer.module.css';
import { Button, Input, Form } from 'antd';

const LoginContainer = () => {
  const { register } = useForm<LoginForm>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onSubmit = (data: LoginForm) => {
    if (JSON.stringify(data) !== JSON.stringify(LoginCredentials)) {
      alert('Incorrect credentials');
      return;
    }
    localStorage.setItem(
      LocalStorageLoginKeys.authCredentials,
      JSON.stringify(data)
    );
    navigate('/products');
  };
  return (
    <div className={css.login}>
      <h2>{t('login.title')}</h2>
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className={css.login__username}
            {...register('username', { required: true })}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            className={css.login__password}
            {...register('password', {
              required: true,
              pattern: {
                value: PWD_REGEX,
                message: 'invalid email address',
              },
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button className={css.login__submit} htmlType="submit">
            {t('global.submitText')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginContainer;
