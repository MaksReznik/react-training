import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, store } from '../../../../state';
import {
  setCredentials,
  removeCredentials,
} from '../../../../state/slices/Authentification.slice';
import {
  loginManagerCredentials,
  loginUserCredentials,
} from '../../constants/LoginCredentials.constants';
import { LocalStorageLoginKeys } from '../../enums/LocalStorageLoginKeys.enum';
import { Roles } from '../../enums/Roles.enum';

import { LoginForm } from '../../interfaces/LoginForm.interface';

export const AuthContext = createContext({
  userStatus: { username: '', password: '', role: Roles.user },
  login: async (credentials: LoginForm): Promise<boolean> => {
    let role;
    if (
      JSON.stringify(credentials) === JSON.stringify(loginManagerCredentials)
    ) {
      role = Roles.manager;
    } else if (
      JSON.stringify(credentials) === JSON.stringify(loginUserCredentials)
    ) {
      role = Roles.user;
    } else {
      alert('Incorrect credentials');
      return false;
    }

    const authState = { ...credentials, role };
    store.dispatch(setCredentials(authState));
    localStorage.setItem(
      LocalStorageLoginKeys.authCredentials,
      JSON.stringify(authState)
    );
    return true;
  },

  logout: async () => {
    store.dispatch(removeCredentials());
    localStorage.setItem(LocalStorageLoginKeys.authCredentials, '');
  },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  let userStatus = useSelector((state: RootState) => state.authentificaiton);
  if (!userStatus.username) {
    const authState = localStorage.getItem(
      LocalStorageLoginKeys.authCredentials
    );
    if (authState) {
      userStatus = JSON.parse(authState);
      store.dispatch(setCredentials(userStatus));
    }
  }
  const { login, logout } = useAuth();
  const values = { login, logout, userStatus };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
