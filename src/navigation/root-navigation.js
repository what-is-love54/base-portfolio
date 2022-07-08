import React, {useCallback, useState, useLayoutEffect} from 'react';
//components
import Internet from 'components/Ethernet';
//store
import {useDispatch} from 'react-redux';
import {setIsSignedIn} from 'store/auth/Slices';
import {setFirstInApp} from 'store/auth/Slices';
//nav
import RootStack from 'navigation/RootStack';
import NavigationContainer from 'navigation/NavContainer';
//utils
import deviceStorage from 'services/deviceStorage';
import {log} from 'utils/Loger';

export const RootNavigator = () => {
  const dispatch = useDispatch();
  const [routeName, setRouteName] = useState('Unknown');

  const refreshInternetConnection = useCallback(async () => {
    log('Can get user or something else');
  }, []);

  const getActiveRouteName = state => {
    if (!state || typeof state.index !== 'number') {
      return 'Unknown';
    }

    const route = state.routes[state.index];

    if (route.state) {
      return getActiveRouteName(route.state);
    }

    return route.name;
  };

  const checkToken = useCallback(() => {
    deviceStorage
      .getItem('token')
      .then(jwtToken => {
        jwtToken
          ? dispatch(setIsSignedIn(true))
          : dispatch(setIsSignedIn(false));
      })
      .catch(() => dispatch(setIsSignedIn(false)));
  }, [dispatch]);

  useLayoutEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <NavigationContainer
      onStateChange={state => {
        const newRouteName = getActiveRouteName(state);

        if (routeName !== newRouteName) {
          // use analytics or crash of screens
          setRouteName(newRouteName);
        }
      }}>
      <RootStack />
      <Internet refresh={refreshInternetConnection} />
    </NavigationContainer>
  );
};
