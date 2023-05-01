import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../constants/LoginCredentials.constants';
import { LocalStorageLoginKeys } from '../../enums/LocalStorageLoginKeys.enum';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import css from './LoginContainer.module.css';
import { Button, Input, Form } from 'antd';
import { loginValidationSchema } from '../../constants/LoginValidationSchema.constants';
import { yupValidator } from '../../../../shared/constants/YupValidator.constants';

const LoginContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { register } = useForm<LoginForm>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const yupValidate = yupValidator(loginValidationSchema, form.getFieldsValue);
  const onSubmit = (data: LoginForm) => {
    setLoading(true);
    if (JSON.stringify(data) !== JSON.stringify(LoginCredentials)) {
      alert('Incorrect credentials');
      setLoading(false);
      return;
    }
    localStorage.setItem(
      LocalStorageLoginKeys.authCredentials,
      JSON.stringify(data)
    );
    setTimeout(() => {
      setLoading(false);
      navigate('/products');
    }, 1000);
  };
  return (
    <div className={css.login}>
      <h2>{t('login.title')}</h2>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          className={css.login__username}
          label="Username"
          name="username"
          rules={[yupValidate]}
        >
          <Input {...register('username', { required: true })} />
        </Form.Item>
        <Form.Item
          className={css.login__password}
          label="Password"
          name="password"
          rules={[yupValidate]}
        >
          <Input {...register('password')} />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            className={css.login__submit}
            htmlType="submit"
          >
            {t('global.submitText')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginContainer;
