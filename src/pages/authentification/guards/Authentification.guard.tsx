import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../components/AuthentificationContext/AuthentificationContext';
import { AuthGuardProps } from '../interfaces/AuthGuardProps.interface';

export function AuthGuard({ canBeAccessedBy }: AuthGuardProps) {
  const { userStatus } = useAuth();
  return !!userStatus.username && canBeAccessedBy.includes(userStatus.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
