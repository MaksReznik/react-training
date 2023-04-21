import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContainer from './pages/authentification/components/LoginContainer/LoginContainer';
import GeneralLayout from './shared/layouts/GeneralLayout/GeneralLayout';
import { store } from './state';
import { Provider } from 'react-redux';
import ProductsView from './pages/products/components/ProductsView/ProductsView';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route element={<LoginContainer></LoginContainer>} path="/"></Route>
          <Route
            element={<ProductsView></ProductsView>}
            path="/products"
          ></Route>
          <Route element={<Navigate to="/" />} path="*"></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
