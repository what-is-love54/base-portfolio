import DeviceInfo from 'react-native-device-info';

export const urlAPI = __DEV__ ? 'https://google.com' : 'https://google.com';

export const urlSocket = __DEV__ ? 'ws://111.1111.1111' : 'ws://111.1111.111';

export const instaBugApiKey = __DEV__ ? '1234567890' : '1234567890';

export const segmentApiKey = __DEV__ ? '1234567890' : '1234567890';

export const appVersion = () => {
  const version = DeviceInfo.getVersion();

  return __DEV__
    ? `Version ${version} (Develop)`
    : `Version ${version} (Production)`;
};

export const screenConfig = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 50,
    mass: 2,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
