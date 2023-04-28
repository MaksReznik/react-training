import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  changeModalState,
} from '../../../../state/slices/Products.slice';
import css from './AddProductModal.module.css';
import { Modal, Radio, Select } from 'antd';
import { RootState } from '../../../../state';
import { useAppSelector } from '../../../../shared/hooks/Redux.hooks';
import { Input, Form } from 'antd';
import { ProductStatus } from '../../enums/ProductStatus.enum';
import { productsTypes } from '../constants/ProductTypes.constant';

const AddProductModal = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAddModalOpened = useAppSelector(
    (state: RootState) => state.products.isAddModalOpened
  );
  const onSubmit = () => {
    const data = form.getFieldsValue();
    data.id = new Date().getTime().toString();
    dispatch(addProduct(data));
    form.resetFields();
    dispatch(changeModalState(false));
  };

  return (
    <Modal
      title="Basic Modal"
      open={isAddModalOpened}
      onCancel={() => dispatch(changeModalState(false))}
      onOk={onSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t('products.inputProductHeader')}
          rules={[{ required: true, message: 'Please input product header!' }]}
          name="header"
        >
          <Input className={css.modal__content__header} />
        </Form.Item>
        <Form.Item
          label={t('products.inputProductText')}
          rules={[{ required: true, message: 'Please input product text!' }]}
          name="text"
        >
          <Input className={css.modal__content__text} />
        </Form.Item>
        <Form.Item
          name="type"
          label={t('products.inputProductTypeSelect')}
          rules={[{ required: true, message: 'Please select product type!' }]}
        >
          <Select options={productsTypes} />
        </Form.Item>
        <Form.Item name="status">
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
