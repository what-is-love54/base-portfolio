import 'react-native-gesture-handler';
import React, {memo, useEffect} from 'react';
//navigation
import {RootNavigator} from 'navigation/root-navigation';
import {enableScreens} from 'react-native-screens';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
//store
import store from './src/store';
import {Provider} from 'react-redux';
//libs
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import RNBootSplash from 'react-native-bootsplash';
// utils
import {log} from './src/utils/Loger';

enableScreens();

const App = () => {
  useEffect(() => {
    log('App splash screen');
    // RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default memo(App);
