import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../shared/hooks/redux.hooks';
import { Product } from '../../../../shared/interfaces/Product.interface';
import { RootState } from '../../../../state';
import { deleteProduct } from '../../../../state/slices/Products.slice';
import css from './ProductsView.module.css';

const ProductsView = () => {
  const products = useAppSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  return (
    <div className={css.products}>
      {products.map((product: Product) => (
        <div className={css.products__item} key={product.id}>
          <span
            className={css.products__item__delete}
            onClick={() => dispatch(deleteProduct(product.id))}
          >
            &times;
          </span>
          <h3 className={css.products__item__header}>{product.header}</h3>
          <p className={css.products__item__text}>{product.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;
