import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('screen');

export const NativeWidth = width;
export const NativeHeight = height;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const asyncWait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const checkPrefixes = item => {
  let prefixes;

  switch (item.day) {
    case '1':
      prefixes = 'st';
      break;
    case '2':
      prefixes = 'nd';
      break;
    case '3':
      prefixes = 'rd';
      break;
    case '22':
      prefixes = 'nd';
      break;
    case '21':
      prefixes = 'st';
      break;
    case '23':
      prefixes = 'rd';
      break;
    default:
      prefixes = 'th';
      break;
  }
  return prefixes;
};
