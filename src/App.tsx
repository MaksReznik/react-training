import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginContainer from './pages/authentification/components/LoginContainer/LoginContainer';
import GeneralLayout from './shared/layouts/GeneralLayout/GeneralLayout';
import { store } from './state';
import { Provider } from 'react-redux';
import ProductsPage from './pages/products/components/ProductsPage/ProductsPage';
import { AuthGuard } from './pages/authentification/guards/Authentification.guard';
import InformationComponent from './shared/components/InformationComponent/InformationComponent';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<GeneralLayout />}>
          <Route element={<LoginContainer></LoginContainer>} path="/"></Route>
          <Route path="/products" element={<AuthGuard />}>
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route path="/info" element={<InformationComponent />} />
          <Route element={<Navigate to="/" />} path="*"></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
