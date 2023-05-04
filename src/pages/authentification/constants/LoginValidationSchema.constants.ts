import * as yup from 'yup';
import { passwordRegex } from '../../../shared/constants/Regex.constants';

export const loginValidationSchema = yup.object({
  username: yup.string(),
  password: yup
    .string()
    .matches(passwordRegex, 'login.validation.notInCorrectFormat'),
});
