import { type } from 'os';
import { ProductStatus } from '../../pages/products/enums/ProductStatus.enum';

export interface Product {
  id: string;
  text: string;
  header: string;
  type: string;
  status: ProductStatus;
}
