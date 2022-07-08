import React, {createRef} from 'react';
import {
  NavigationContainer as NavContainer,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import PropTypes from 'prop-types';

const navigationRef = createRef();
let isReady = false;

const NavigationContainer = ({
  onStateChange,
  initialState,
  theme,
  children,
}) => {
  React.useEffect(() => {
    return () => {
      isReady = false;
    };
  }, []);

  return (
    <NavContainer
      theme={theme}
      initialState={initialState}
      onStateChange={onStateChange}
      ref={navigationRef}
      onReady={() => {
        isReady = true;
      }}>
      {children}
    </NavContainer>
  );
};

export function navigate(name, params = {}) {
  if (isReady && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

export function push(name, params = {}) {
  if (isReady && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
}

export function goBack() {
  if (isReady && navigationRef.current) {
    navigationRef.current.goBack();
  }
}

export function resetStackCacheAndNavigate(routesProps, stateIndex = 0) {
  if (isReady && navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        routes: routesProps,
        index: stateIndex,
      }),
    );
  }
}

NavigationContainer.propTypes = {
  onStateChange: PropTypes.func,
  initialState: PropTypes.object,
  theme: PropTypes.object,
  children: PropTypes.node,
};

export default NavigationContainer;
