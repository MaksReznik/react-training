import { useAuth } from '../components/AuthentificationContext/AuthentificationContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AxiosInterceptor = ({ children }: any) => {
  const { userStatus } = useAuth();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (request) => {
        request.headers.Authorization = `Bearer ${userStatus.username}`;
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    setIsSet(true);
    return () => axios.interceptors.request.eject(interceptor);
  }, [userStatus.username]);

  return isSet && children;
};

export default AxiosInterceptor;
