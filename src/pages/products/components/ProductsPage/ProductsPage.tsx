import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AddProductModal from '../AddProductModal/AddProductModal';
import ProductsView from '../ProductsView/ProductsView';
import css from './ProductsPage.module.css';
import { changeModalState } from '../../../../state/slices/Products.slice';

const ProductsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className={css.products}>
      <AddProductModal></AddProductModal>

      <div className={css.products__header}>
        <h3>{t('products.productTitle')}</h3>
        <button
          onClick={() => dispatch(changeModalState(true))}
          className={css.products__header__button}
        >
          {t('products.newButton')}
        </button>
      </div>
      <ProductsView></ProductsView>
    </div>
  );
};

export default ProductsPage;
