import i18next from 'i18next';
import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  header: yup
    .string()
    .required(i18next.t('global.validation.notEntered') ?? ''),
  text: yup.string().required(i18next.t('global.validation.notEntered') ?? ''),
  type: yup.string().required(i18next.t('global.validation.notEntered') ?? ''),
  status: yup
    .string()
    .required(i18next.t('global.validation.notEntered') ?? ''),
});
