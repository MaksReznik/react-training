import i18next from 'i18next';

export const yupValidator = (schema: any) => (field: any, value: any) => {
  //console.log(schema, field, value);
  //console.log({ [field.fullField]: value });

  try {
    schema.validateSyncAt(field.field, { value });
  } catch (error: any) {
    const translatedErrorMessage = i18next.t(error.message);
    return Promise.reject(new Error(translatedErrorMessage));
  }
  return Promise.resolve();
};
