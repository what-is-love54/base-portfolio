import React, {useEffect, memo} from 'react';
import {AppState} from 'react-native';
//nav
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from 'navigation/AuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
//store
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {setNetworkConnect} from 'store/app/Slices';
//lib
import NetInfo from '@react-native-community/netinfo';
//utils
import {Routes} from 'navigation/Routes';
import {logInfo} from 'utils/Loger';

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(store => store.auth.isSignedIn, shallowEqual);

  useEffect(() => {
    const subState = AppState.addEventListener('change', async appState => {
      logInfo(`APP STATE - ${appState}`);
      if (appState === 'active') {
        NetInfo.fetch().then(status => {
          dispatch(setNetworkConnect(status.isConnected));
        });
      }
    });

    return () => subState.remove();
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName={Routes.MainAuth}
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}>
      {isSignedIn ? (
        <Stack.Screen name={Routes.MainApp} component={AppNavigation} />
      ) : (
        <Stack.Screen
          name={Routes.MainAuth}
          options={{
            animationTypeForReplace: 'pop',
          }}
          component={AuthNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default memo(RootStack);
