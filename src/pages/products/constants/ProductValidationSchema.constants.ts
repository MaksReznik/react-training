import { TFunction } from 'i18next';
import * as yup from 'yup';

export const getProductValidationSchema = (t: TFunction) =>
  yup.object().shape({
    header: yup.string().required(t('global.validation.notEntered') ?? ''),
    text: yup.string().required(t('global.validation.notEntered') ?? ''),
    type: yup.string().required(t('global.validation.notEntered') ?? ''),
    status: yup.string().required(t('global.validation.notEntered') ?? ''),
  });
