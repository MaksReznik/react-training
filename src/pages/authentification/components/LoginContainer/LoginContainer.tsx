import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../interfaces/LoginForm.interface';
import css from './LoginContainer.module.css';
import { Button, Input, Form } from 'antd';
import { getLoginValidationSchema } from '../../constants/LoginValidationSchema.constants';
import { useAuth } from '../AuthentificationContext/AuthentificationContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../../../shared/constants/YupValidator.constants';
import FormItem from '../../../../shared/components/FormItem/FormItem';

const LoginContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();
  const validationSchema = useMemo(() => getLoginValidationSchema(t), [t]);
  const onSubmit = async (data: LoginForm) => {
    console.log(getValues());
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
  const { getValues, control, handleSubmit } = useForm<LoginForm>({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  useEffect(() => {
    (async () => {
      const options = {
        method: 'GET',
        url: 'https://gutendex.com/books/',
      };
      const resultBooks = await axios.request(options);
      console.log(resultBooks);
    })();
  }, []); //just to test interceptors
  return (
    <div className={css.login}>
      <h2>{t('login.title')}</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <FormItem
          className={css.login__username}
          label={t('login.username')}
          control={control}
          name="username"
          hint=""
          render={({ field }: any) => <Input {...field} />}
        ></FormItem>
        <FormItem
          className={css.login__password}
          label={t('login.password')}
          control={control}
          name="password"
          hint=""
          render={({ field }: any) => <Input {...field} />}
        ></FormItem>
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
      <Link className={css.login__contacts} to={'/contacts'}>
        {t('contacts.contactUsLink')}
      </Link>
    </div>
  );
};
export default LoginContainer;
