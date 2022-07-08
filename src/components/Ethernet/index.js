import React, {memo, useRef} from 'react';
import {Animated, TouchableOpacity, Text} from 'react-native';
//lib
import PropTypes from 'prop-types';
import {ScaledSheet} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// utils
import {fadeAnimation} from 'utils/Animations';
import {colors} from 'utils/Colors';
import {shallowEqual, useSelector} from 'react-redux';

const Internet = ({refresh}) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {isNetwork} = useSelector(
    ({app}) => ({
      isNetwork: app.networkConnect,
    }),
    shallowEqual,
  );

  if (isNetwork) {
    fadeAnimation(fadeAnim, 0, 1000);
  } else {
    fadeAnimation(fadeAnim, 100, 1000);
  }

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        {
          transform: [{translateY: fadeAnim}],
          paddingTop: insets.top,
          backgroundColor: isNetwork ? colors.green : colors.setupRed,
        },
      ]}>
      <TouchableOpacity style={styles.container} onPress={refresh}>
        <Text style={styles.text}>No internet connections</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '6@ms0.2',
  },
  mainContainer: {
    left: 0,
    marginTop: '-100@ms',
    position: 'absolute',
    right: 0,
    zIndex: 0,
  },
  text: {
    color: colors.gray,
    fontSize: '14@ms0.2',
    marginHorizontal: '10@ms',
    marginVertical: '10@ms',
  },
});

Internet.propTypes = {
  isNetwork: PropTypes.bool,
};

export default memo(Internet);
