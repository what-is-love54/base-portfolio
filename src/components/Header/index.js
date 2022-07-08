import React, {memo, useCallback, useRef} from 'react';
import {View, BackHandler} from 'react-native';
//lib
import {ScaledSheet} from 'react-native-size-matters';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//nav
import {useFocusEffect} from '@react-navigation/native';
import {colors} from 'utils/Colors';

const HeadPanel = ({
  leftContent,
  androidBackButtonClickHandler,
  rightContent,
  centerContent,
  panelStyle = {},
  leftSideContainerStyle = {},
  rightSideContainerStyle = {},
  centerContainerStyle = {},
  doubleClickCloseAppAndroid = false,
  topInsets = 0,
}) => {
  const timeoutId = useRef(null);
  const timeoutCounter = useRef(0);
  const insets = useSafeAreaInsets();

  const androidBackHandler = useCallback(() => {
    if (doubleClickCloseAppAndroid) {
      if (!timeoutId.current) {
        timeoutId.current = setTimeout(() => {
          timeoutCounter.current++;
          if (typeof androidBackButtonClickHandler === 'function') {
            const result = androidBackButtonClickHandler();

            if (result?.then) {
              result.then(() => {
                timeoutId.current = null;
                timeoutCounter.current--;
              });
              return;
            }
            timeoutCounter.current--;
            timeoutId.current = null;
          }
        }, 300);
        return true;
      }
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      if (timeoutCounter.current === 0) {
        BackHandler.exitApp();
      }
      return true;
    }
    if (typeof androidBackButtonClickHandler === 'function') {
      androidBackButtonClickHandler();
    }
    return true;
  }, [androidBackButtonClickHandler, doubleClickCloseAppAndroid]);

  useFocusEffect(
    useCallback(
      () => () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
          timeoutId.current = null;
        }
      },
      [],
    ),
  );

  return (
    <AndroidBackHandler onBackPress={androidBackHandler}>
      <View
        style={[
          styles.headerContainer,
          {paddingTop: insets.top + topInsets},
          panelStyle,
        ]}>
        <View style={[styles.leftSide, leftSideContainerStyle]}>
          {leftContent || null}
        </View>
        <View style={[styles.centralSide, centerContainerStyle]}>
          {centerContent || null}
        </View>
        <View style={[styles.rightSide, rightSideContainerStyle]}>
          {rightContent || null}
        </View>
      </View>
    </AndroidBackHandler>
  );
};

const styles = ScaledSheet.create({
  centralSide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

HeadPanel.propTypes = {
  leftSideContent: PropTypes.node,
  rightContent: PropTypes.node,
  centerContent: PropTypes.node,
  androidBackButtonClickHandler: PropTypes.func,
  panelStyle: PropTypes.object,
  leftSideContainerStyle: PropTypes.object,
  rightSideContainerStyle: PropTypes.object,
  centerContainerStyle: PropTypes.object,
  dubleClickCloseAppAndroid: PropTypes.bool,
  topSafeInset: PropTypes.number,
  topPaddingAdj: PropTypes.number,
};

export default memo(HeadPanel);
