import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorageLoginKeys } from '../enums/LocalStorageLoginKeys.enum';

export function AuthGuard() {
  const isAuthenticated = !!localStorage.getItem(
    LocalStorageLoginKeys.authCredentials
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
