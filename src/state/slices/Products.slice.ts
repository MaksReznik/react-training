import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ProductStatus } from '../../pages/products/enums/ProductStatus.enum';
import { Product } from '../../shared/interfaces/Product.interface';
import { ProductState } from '../../shared/interfaces/ProductState.interface';

const initialState: ProductState = {
  isAddModalOpened: false,
  products: [
    {
      id: 'string',
      text: 'string',
      header: 'string',
      type: 'Other',
      status: ProductStatus.notInStock,
    },
    {
      id: 'str',
      text: 'str',
      header: 'str',
      type: 'Other',
      status: ProductStatus.withSale,
    },
    {
      id: 's',
      text: 's',
      header: 's ',
      type: 'Other',
      status: ProductStatus.withoutSale,
    },
  ],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeModalState: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpened = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products.splice(
        state.products.findIndex((el) => el.id === action.payload),
        1
      );
    },
  },
});

export const { changeModalState, addProduct, deleteProduct } =
  productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.products;

export default productsSlice.reducer;
