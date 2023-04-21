import React from 'react';
import { useAppSelector } from '../../../../shared/hooks/redux.hooks';
import { Product } from '../../../../shared/interfaces/Product.interface';
import { RootState } from '../../../../state';

const ProductsView = () => {
  const products = useAppSelector((state: RootState) => state.products);
  return (
    <div>
      {products.map((product: Product) => (
        <div>{product.header}</div>
      ))}
    </div>
  );
};

export default ProductsView;
