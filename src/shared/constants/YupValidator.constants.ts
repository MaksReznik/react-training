import i18next from 'i18next';
import { useCallback } from 'react';
import { Schema } from 'yup';

export const useYupValidationResolver = (validationSchema: Schema<any>) =>
  useCallback(
    (data: any) => {
      console.log(data);

      try {
        const values = validationSchema.validateSync(data, {
          abortEarly: false,
        });
        console.log('values', values);

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        console.log('errors', {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        });
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
