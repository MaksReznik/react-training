import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  changeModalState,
} from '../../../../state/slices/Products.slice';
import css from './AddProductModal.module.css';
import { Button, Modal, Radio, Select } from 'antd';
import { RootState } from '../../../../state';
import { useAppSelector } from '../../../../shared/hooks/Redux.hooks';
import { Input, Form } from 'antd';
import { ProductStatus } from '../../enums/ProductStatus.enum';
import { productsTypes } from '../../constants/ProductTypes.constant';
import { useYupValidationResolver } from '../../../../shared/constants/YupValidator.constants';
import { useForm } from 'react-hook-form';
import FormItem from '../../../../shared/components/FormItem/FormItem';
import { getProductValidationSchema } from '../../constants/ProductValidationSchema.constants';
import { Product } from '../../../../shared/interfaces/Product.interface';

const AddProductModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const validationSchema = useMemo(() => getProductValidationSchema(t), [t]);
  const { control, getValues, reset, trigger } = useForm<Product>({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      text: '',
      header: '',
      type: undefined,
      status: ProductStatus.withoutSale,
    },
  });

  const dispatch = useDispatch();
  const isAddModalOpened = useAppSelector(
    (state: RootState) => state.products.isAddModalOpened
  );
  const onSubmit = () => {
    setLoading(true);
    trigger().then((isFormValid) => {
      if (!isFormValid) {
        setLoading(false);
        return;
      }
      const data = getValues();
      console.log(data);
      data.id = new Date().getTime().toString();
      dispatch(addProduct(data));
      reset();
      setTimeout(() => {
        setLoading(false);
        dispatch(changeModalState(false));
      }, 1000);
    });
  };

  return (
    <Modal
      title={t('products.newButton')}
      open={isAddModalOpened}
      onCancel={() => dispatch(changeModalState(false))}
      footer={[
        <Button key="back" onClick={() => dispatch(changeModalState(false))}>
          {t('global.backLink')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          {t('global.submitText')}
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <FormItem
          className=""
          label={t('products.inputProductHeader')}
          control={control}
          hint=""
          render={({ field }: any) => (
            <Input className={css.modal__content__header} {...field} />
          )}
          name="header"
        />
        <FormItem
          label={t('products.inputProductText')}
          name="text"
          className=""
          control={control}
          hint=""
          render={({ field }: any) => (
            <Input className={css.modal__content__text} {...field} />
          )}
        />

        <FormItem
          name="type"
          label={t('products.inputProductTypeSelect')}
          className=""
          control={control}
          hint=""
          render={({ field }: any) => (
            <Select
              {...field}
              options={productsTypes.map((type) => {
                return { value: type.value, label: t(type.label) };
              })}
            />
          )}
        />
        <FormItem
          name="status"
          label={t('products.productStatus.label')}
          className=""
          control={control}
          hint=""
          render={({ field }: any) => (
            <Radio.Group {...field}>
              <Radio value={ProductStatus.withoutSale}>
                {t('products.productStatus.withoutSale')}
              </Radio>
              <Radio value={ProductStatus.withSale}>
                {t('products.productStatus.sale')}
              </Radio>
              <Radio value={ProductStatus.notInStock}>
                {t('products.productStatus.notInStock')}
              </Radio>
            </Radio.Group>
          )}
        />
      </Form>
    </Modal>
  );
};

export default AddProductModal;
