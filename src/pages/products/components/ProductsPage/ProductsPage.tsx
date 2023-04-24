import React, { useState } from 'react';
import AddProductModal from '../AddProductModal/AddProductModal';
import ProductsView from '../ProductsView/ProductsView';
import css from './ProductsPage.module.css';

const ProductsPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const changeModalState = (newState: boolean) => {
    setModalOpened(newState);
  };
  return (
    <div className={css.products}>
      {modalOpened && (
        <AddProductModal
          close={() => changeModalState(false)}
        ></AddProductModal>
      )}
      <div className={css.products__header}>
        <h3>Products</h3>
        <button
          onClick={() => setModalOpened(true)}
          className={css.products__header__button}
        >
          New Product
        </button>
      </div>
      <ProductsView></ProductsView>
    </div>
  );
};

export default ProductsPage;
