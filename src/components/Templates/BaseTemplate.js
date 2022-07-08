import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View, KeyboardAvoidingView, StatusBar, ScrollView} from 'react-native';
//libs
import {ScaledSheet} from 'react-native-size-matters';
//utils
import {colors} from 'utils/Colors';
import {isIOS} from 'utils/Helpers';

const TRANSITIONS = ['fade', 'slide', 'none'];

const BaseTemplate = ({
  bgColor = colors.white,
  statusBarBg = colors.white,
  statusBar = 'dark-content',
  scrollable,
  bounces = false,
  onScroll,
  offsetKeyboard,
  children,
  additionalHeader,
  scrollViewStyles,
  scrollEventThrottle = 16,
  refreshControl,
}) => {
  const renderFixedView = () => (
    <View style={[styles.baseContainer, {backgroundColor: bgColor}]}>
      {additionalHeader}
      {children}
    </View>
  );

  const renderScrollableView = () => (
    <>
      {additionalHeader}
      <ScrollView
        refreshControl={refreshControl}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        bounces={bounces}
        scrollEnabled={scrollable}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScroll}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        style={scrollViewStyles}
        contentContainerStyle={styles.baseContainerScrollView}>
        {children}
      </ScrollView>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={isIOS ? 'padding' : null}
      keyboardVerticalOffset={offsetKeyboard}>
      <StatusBar
        animated={true}
        backgroundColor={statusBarBg}
        barStyle={statusBar}
        showHideTransition={TRANSITIONS[0]}
        networkActivityIndicatorVisible={true}
        hidden={false}
      />
      {scrollable ? renderScrollableView() : renderFixedView()}
    </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  baseContainer: {
    flex: 1,
  },
  baseContainerScrollView: {
    backgroundColor: colors.white,
    minHeight: '100%',
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default memo(BaseTemplate);

BaseTemplate.propTypes = {
  bgColor: PropTypes.oneOf(Object.values(colors)),
  statusBarBg: PropTypes.oneOf(Object.values(colors)),
  statusBar: PropTypes.oneOf(['light-content', 'dark-content']),
  hasTopHeader: PropTypes.bool,
  scrollable: PropTypes.bool,
  onScroll: PropTypes.func,
  offsetKeyboard: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  children: PropTypes.node,
  additionalHeader: PropTypes.node,
  footer: PropTypes.node,
  bounces: PropTypes.bool,
  scrollEventThrottle: PropTypes.number,
};
