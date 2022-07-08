import React, {memo} from 'react';
//nav
import {createStackNavigator} from '@react-navigation/stack';
// utils
import {screenConfig} from 'utils/Constants';
// routes
import {Routes} from 'navigation/Routes';
//screens
import HomeScreen from 'screens/Home';
import ModalScreen from 'screens/Modal';

const Stack = createStackNavigator();

const options = {
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  transitionSpec: {
    open: screenConfig,
    close: screenConfig,
  },
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'clamp',
        }),
      },
    };
  },
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen
        name={Routes.ModalScreen}
        component={ModalScreen}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default memo(AppNavigation);
