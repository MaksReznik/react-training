import { TFunction } from 'i18next';
import * as yup from 'yup';
import { passwordRegex } from '../../../shared/constants/Regex.constants';

export const getLoginValidationSchema = (t: TFunction) =>
  yup.object().shape({
    username: yup.string().required(t('global.validation.notEntered') ?? ''),
    password: yup
      .string()
      .matches(passwordRegex, t('login.validation.notInCorrectFormat') ?? '')
      .required(t('global.validation.notEntered') ?? ''),
  });
