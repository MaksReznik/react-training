import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import css from './LoginContainer.module.css';
import { Button, Input, Form } from 'antd';
import { loginValidationSchema } from '../../constants/LoginValidationSchema.constants';
import { yupValidator } from '../../../../shared/constants/YupValidator.constants';
import { useAuth } from '../AuthentificationContext/AuthentificationContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { register } = useForm<LoginForm>();
  const { t } = useTranslation();
  const { login } = useAuth();
  const validator = yupValidator(loginValidationSchema);
  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    login(data).then((isLoggedIn) => {
      if (isLoggedIn) {
        navigate('/products');
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <div className={css.login}>
      <h2>{t('login.title')}</h2>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          className={css.login__username}
          label={t('login.username')}
          name="username"
          rules={[
            {
              validator: (field: any, value: any) => {
                // console.log(schema, field, value);
                // console.log({ [field.fullField]: value });
                //console.log(loginValidationSchema.validateSyncAt('username', '1234'));

                try {
                  loginValidationSchema.validateSyncAt(field.field, value);
                  //loginValidationSchema.validateSync({ [field.fullField]: value });
                } catch (error: any) {
                  console.log(error.message);
                  const translatedErrorMessage = t(error.message);
                  return Promise.reject(new Error(translatedErrorMessage));
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={css.login__password}
          label={t('login.password')}
          name="password"
          rules={[{ validator }]}
        >
          <Input />
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
