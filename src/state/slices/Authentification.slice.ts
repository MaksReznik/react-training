import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Roles } from '../../pages/authentification/enums/Roles.enum';
import { AuthentificationState } from '../../shared/interfaces/AuthentificationState.interface';

const initialState: AuthentificationState = {
  username: '',
  password: '',
  role: Roles.user,
};

export const authentificationSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthentificationState>) => {
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.username = action.payload.username;
      //for some reason state = action.payload  doesn't work even though I've read that in react toolkit it should
    },
    removeCredentials: (state) => initialState,
  },
});

export const { setCredentials, removeCredentials } =
  authentificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuthentificationState = (state: RootState) => state.products;

export default authentificationSlice.reducer;
