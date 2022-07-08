import {api} from 'services/api';

export const getUser = async () => {
  return await api('get', 'user');
};
