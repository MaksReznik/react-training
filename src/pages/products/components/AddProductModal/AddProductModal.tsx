import React, { useState } from 'react';
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
import { productValidationSchema } from '../../constants/ProductValidationSchema.constants';
import { yupValidator } from '../../../../shared/constants/YupValidator.constants';

const AddProductModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const yupSync = yupValidator(productValidationSchema, form.getFieldsValue);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAddModalOpened = useAppSelector(
    (state: RootState) => state.products.isAddModalOpened
  );
  //TODO add translation for validation messages
  const onSubmit = () => {
    setLoading(true);
    const data = form.getFieldsValue();
    form
      .validateFields()
      .then(() => {
        console.log(data);
        data.id = new Date().getTime().toString();
        dispatch(addProduct(data));
        form.resetFields();
        setTimeout(() => {
          setLoading(false);
          dispatch(changeModalState(false));
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title={t('products.newButton')}
      open={isAddModalOpened}
      onCancel={() => dispatch(changeModalState(false))}
      footer={[
        <Button key="back" onClick={() => dispatch(changeModalState(false))}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t('products.inputProductHeader')}
          rules={[yupSync]}
          name="header"
        >
          <Input className={css.modal__content__header} />
        </Form.Item>
        <Form.Item
          label={t('products.inputProductText')}
          rules={[yupSync]}
          name="text"
        >
          <Input className={css.modal__content__text} />
        </Form.Item>
        <Form.Item
          name="type"
          label={t('products.inputProductTypeSelect')}
          rules={[yupSync]}
        >
          <Select options={productsTypes} />
        </Form.Item>
        <Form.Item rules={[yupSync]} name="status">
          <Radio.Group>
            <Radio value={ProductStatus.withoutSale}>Without sale</Radio>
            <Radio value={ProductStatus.withSale}>Sale</Radio>
            <Radio value={ProductStatus.notInStock}>Not in stock</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
