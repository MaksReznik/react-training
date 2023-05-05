import axios from 'axios';

export const runInterceptor = () => {
  axios.interceptors.request.use(
    (request) => {
      request.headers.Authorization = 'Bearer 123456';
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
