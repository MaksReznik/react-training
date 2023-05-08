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
import { AuthProvider } from './pages/authentification/components/AuthentificationContext/AuthentificationContext';
import { Roles } from './pages/authentification/enums/Roles.enum';
import AxiosInterceptor from './pages/authentification/interceptors/Authentification.intercepror';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AxiosInterceptor>
          <Routes>
            <Route element={<GeneralLayout />}>
              <Route
                element={<LoginContainer></LoginContainer>}
                path="/"
              ></Route>
              <Route
                path="/products"
                element={
                  <AuthGuard canBeAccessedBy={[Roles.manager, Roles.user]} />
                }
              >
                <Route path="/products" element={<ProductsPage />} />
              </Route>
              <Route
                path="/info"
                element={<AuthGuard canBeAccessedBy={[Roles.user]} />}
              >
                <Route path="/info" element={<InformationComponent />} />
              </Route>
              <Route element={<Navigate to="/" />} path="*"></Route>
            </Route>
          </Routes>
        </AxiosInterceptor>
      </AuthProvider>
    </Provider>
  );
}

export default App;
