import { Product } from './Product.interface';

export interface ProductState {
  isAddModalOpened: boolean;
  products: Product[];
}
