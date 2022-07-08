// store
import store from 'store';
import {setNetworkConnect} from 'store/app/Slices';
import {setIsSignedIn} from 'store/auth/Slices';
// lib
import axios from 'axios';
// utils
import deviceStorage from 'services/deviceStorage';
import {urlAPI as baseURL} from 'utils/Constants';
import {log} from 'utils/Loger';

const axiosClient = axios.create();

axiosClient.interceptors.request.use(request => {
  log('STARTING REQUEST', request);
  return request;
});

axiosClient.interceptors.response.use(
  response => response?.data,
  err => {
    const error = err?.response;

    !!error && log('INTERCEPTORS ERROR RESPONSE: ', error);

    if (error?.status === 401) {
      log('ERROR 401');
      deviceStorage.removeItem('token');
      store.dispatch(setIsSignedIn(false));
    }
    return Promise.reject(err);
  },
);

const options = (method, url, data, headers = {}, token = '') => {
  return {
    url,
    data,
    method,
    baseURL,
    timeout: 30000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...headers,
    },
  };
};

export const api = (method, url, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    deviceStorage.getItem('token').then(token => {
      axiosClient(options(method, url, data, headers, token))
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          if (error.toJSON().message === 'Network Error') {
            store.dispatch(setNetworkConnect(false));
          }
          return reject(error);
        });
    });
  });
};
