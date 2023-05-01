import i18next from 'i18next';
import * as yup from 'yup';
import { passwordRegex } from '../../../shared/constants/Regex.constants';

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required(i18next.t('global.validation.notEntered') ?? ''),
  password: yup
    .string()
    .matches(
      passwordRegex,
      i18next.t('login.validation.notInCorrectFormat') ?? ''
    )
    .required(i18next.t('global.validation.notEntered') ?? ''),
});
