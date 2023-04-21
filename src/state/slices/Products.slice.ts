import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Product } from '../../shared/interfaces/Product.interface';

const initialState: Product[] = [
  { id: 'string', text: 'string', header: 'string' },
];

export const productsSlice = createSlice({
  name: 'products',

  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.splice(
        initialState.findIndex((el) => el.id === action.payload),
        1
      );
    },
  },
});

export const { addProduct, deleteProduct } = productsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.products;

export default productsSlice.reducer;
