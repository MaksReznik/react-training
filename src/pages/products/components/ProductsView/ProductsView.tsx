import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../shared/hooks/Redux.hooks';
import { Product } from '../../../../shared/interfaces/Product.interface';
import { RootState } from '../../../../state';
import { deleteProduct } from '../../../../state/slices/Products.slice';
import { useAuth } from '../../../authentification/components/AuthentificationContext/AuthentificationContext';
import { Roles } from '../../../authentification/enums/Roles.enum';
import { productsTypes } from '../../constants/ProductTypes.constant';
import { ProductStatus } from '../../enums/ProductStatus.enum';
import css from './ProductsView.module.css';

const ProductsView = () => {
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const { userStatus } = useAuth();

  const { t } = useTranslation();
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
          {userStatus.role === Roles.manager && (
            <span
              className={css.products__item__delete}
              onClick={() => dispatch(deleteProduct(product.id))}
            >
              &times;
            </span>
          )}
          <h3 className={css.products__item__header}>{product.header}</h3>
          <p className={css.products__item__text}>{product.text}</p>
          <sub>
            {t(
              productsTypes.find((type) => product.type === type.value)
                ?.label ?? 'products.productsTypes.other'
            )}
          </sub>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;
