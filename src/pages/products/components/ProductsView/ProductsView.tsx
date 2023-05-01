import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../shared/hooks/Redux.hooks';
import { Product } from '../../../../shared/interfaces/Product.interface';
import { RootState } from '../../../../state';
import { deleteProduct } from '../../../../state/slices/Products.slice';
import { ProductStatus } from '../../enums/ProductStatus.enum';
import css from './ProductsView.module.css';

const ProductsView = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const dispatch = useDispatch();
  return (
    <div className={css.products}>
      {products.map((product: Product) => (
        <div
          className={`${css.products__item} 
          ${
            product.status === ProductStatus.withSale && css.products__item_sale
          }
          ${
            product.status === ProductStatus.notInStock &&
            css.products__item_disabled
          }
              
          `}
          key={product.id}
        >
          <span
            className={css.products__item__delete}
            onClick={() => dispatch(deleteProduct(product.id))}
          >
            &times;
          </span>
          <h3 className={css.products__item__header}>{product.header}</h3>
          <p className={css.products__item__text}>{product.text}</p>
          <sub>{product.type}</sub>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;
