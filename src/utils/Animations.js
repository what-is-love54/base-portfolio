import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';

export const fadeAnimation = (fadeAnim, value, time) => {
  Animated.timing(fadeAnim, {
    toValue: value,
    easing: Easing.ease,
    duration: time,
    useNativeDriver: true,
  }).start();
};

fadeAnimation.propTypes = {
  fadeAnim: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  value: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
