import React, {memo} from 'react';
// libs
import {createStackNavigator} from '@react-navigation/stack';
//routes
import {Routes} from 'navigation/Routes';
//screens
import Welcome from 'screens/Auth';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.AuthWelcome}>
      <Stack.Screen name={Routes.AuthWelcome} component={Welcome} />
    </Stack.Navigator>
  );
};

export default memo(AuthNavigation);
