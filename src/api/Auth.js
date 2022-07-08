import {api} from 'services/api';

export const logIn = async user => {
  return await api('post', 'auth/login', user);
};

export const signUp = async newUser => {
  return api('patch', 'user/register', newUser);
};
