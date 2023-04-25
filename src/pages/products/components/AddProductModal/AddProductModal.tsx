import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Product } from '../../../../shared/interfaces/Product.interface';
import { addProduct } from '../../../../state/slices/Products.slice';
import { ModalProps } from '../../interfaces/ModalProps';
import css from './AddProductModal.module.css';

const AddProductModal = ({ close }: ModalProps) => {
  const { register, handleSubmit } = useForm<Product>();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const onSubmit = (data: Product) => {
    data.id = new Date().getTime().toString();
    dispatch(addProduct(data));
    close();
  };

  return (
    <div>
      <div className={css.modal}>
        <div className={css.modal__content}>
          <span className={css.modal__close} onClick={close}>
            &times;
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className={css.modal__content__heading}>
              {t('products.inputProductHeader')}
            </h4>
            <input
              className={css.modal__content__header}
              {...register('header', { required: true })}
            />
            <h4 className={css.modal__content__heading}>
              {t('products.inputProductText')}
            </h4>
            <input
              className={css.modal__content__text}
              {...register('text', {
                required: true,
              })}
            />
            <button className={css.modal__content__submit} type="submit">
              {' '}
              {t('global.submitText')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
