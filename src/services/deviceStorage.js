import AsyncStorage from '@react-native-async-storage/async-storage';
import {logError} from 'utils/Loger';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      logError('AsyncStorage Error: ' + error.message);
    }
  },
  async getItem(key) {
    let item = null;

    try {
      item = await AsyncStorage.getItem(key);
    } catch (error) {
      logError('AsyncStorage Error: ' + error.message);
      item = null;
    }

    return item;
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      logError('AsyncStorage Error: ' + error.message);
    }
  },
};

export default deviceStorage;
